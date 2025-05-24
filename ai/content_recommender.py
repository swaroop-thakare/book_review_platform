import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import StandardScaler
import psycopg2
import json
from datetime import datetime, timedelta
import logging

class ContentBasedRecommender:
    def __init__(self, db_connection_string):
        """
        Initialize the content-based recommender system
        """
        self.db_connection = psycopg2.connect(db_connection_string)
        self.tfidf_vectorizer = TfidfVectorizer(
            max_features=5000,
            stop_words='english',
            ngram_range=(1, 2),
            min_df=2,
            max_df=0.8
        )
        self.scaler = StandardScaler()
        self.books_df = None
        self.content_matrix = None
        self.similarity_matrix = None
        
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)
    
    def load_books_data(self):
        """
        Load books data from database and prepare features
        """
        query = """
        SELECT 
            id, title, author, genre, subgenres, tags, description,
            pages, average_rating, review_count, popularity_score,
            published_date, language
        FROM books
        WHERE description IS NOT NULL AND description != ''
        """
        
        self.books_df = pd.read_sql(query, self.db_connection)
        self.logger.info(f"Loaded {len(self.books_df)} books")
        
        # Prepare text features
        self.books_df['combined_features'] = self.books_df.apply(
            self._combine_text_features, axis=1
        )
        
        return self.books_df
    
    def _combine_text_features(self, row):
        """
        Combine various text features into a single string for TF-IDF
        """
        features = []
        
        # Add description (main content)
        if pd.notna(row['description']):
            features.append(row['description'])
        
        # Add genre (weighted more heavily)
        if pd.notna(row['genre']):
            features.extend([row['genre']] * 3)
        
        # Add subgenres
        if pd.notna(row['subgenres']) and row['subgenres']:
            features.extend(row['subgenres'])
        
        # Add tags
        if pd.notna(row['tags']) and row['tags']:
            features.extend(row['tags'])
        
        # Add author (for author-based similarity)
        if pd.notna(row['author']):
            features.append(f"author_{row['author'].replace(' ', '_')}")
        
        return ' '.join(features)
    
    def build_content_features(self):
        """
        Build TF-IDF matrix and additional numerical features
        """
        if self.books_df is None:
            self.load_books_data()
        
        # TF-IDF on combined text features
        tfidf_matrix = self.tfidf_vectorizer.fit_transform(
            self.books_df['combined_features']
        )
        
        # Additional numerical features
        numerical_features = []
        
        # Normalize pages (book length preference)
        pages_normalized = self.scaler.fit_transform(
            self.books_df[['pages']].fillna(300)
        )
        numerical_features.append(pages_normalized)
        
        # Rating and popularity features
        rating_features = self.scaler.fit_transform(
            self.books_df[['average_rating', 'review_count', 'popularity_score']].fillna(0)
        )
        numerical_features.append(rating_features)
        
        # Combine TF-IDF with numerical features
        numerical_matrix = np.hstack(numerical_features)
        
        # Weight text features more heavily than numerical
        text_weight = 0.8
        numerical_weight = 0.2
        
        self.content_matrix = np.hstack([
            tfidf_matrix.toarray() * text_weight,
            numerical_matrix * numerical_weight
        ])
        
        self.logger.info(f"Built content matrix: {self.content_matrix.shape}")
        return self.content_matrix
    
    def compute_similarity_matrix(self):
        """
        Compute cosine similarity between all books
        """
        if self.content_matrix is None:
            self.build_content_features()
        
        self.similarity_matrix = cosine_similarity(self.content_matrix)
        self.logger.info("Computed similarity matrix")
        return self.similarity_matrix
    
    def get_user_profile(self, user_id):
        """
        Build user profile based on their reading history and ratings
        """
        query = """
        SELECT 
            b.id, b.genre, b.subgenres, b.tags, b.author,
            r.rating, rh.status
        FROM books b
        JOIN reviews r ON b.id = r.book_id
        LEFT JOIN reading_history rh ON b.id = rh.book_id AND rh.user_id = r.user_id
        WHERE r.user_id = %s AND r.rating >= 4
        ORDER BY r.rating DESC, r.created_at DESC
        """
        
        user_books = pd.read_sql(query, self.db_connection, params=[user_id])
        
        if user_books.empty:
            return None
        
        # Calculate genre preferences
        genre_weights = user_books.groupby('genre')['rating'].agg(['mean', 'count'])
        genre_weights['weight'] = (genre_weights['mean'] * np.log(genre_weights['count'] + 1))
        
        # Calculate author preferences
        author_weights = user_books.groupby('author')['rating'].agg(['mean', 'count'])
        author_weights['weight'] = (author_weights['mean'] * np.log(author_weights['count'] + 1))
        
        # Calculate tag preferences
        all_tags = []
        for tags in user_books['tags'].dropna():
            if isinstance(tags, list):
                all_tags.extend(tags)
        
        tag_counts = pd.Series(all_tags).value_counts()
        
        return {
            'genres': genre_weights['weight'].to_dict(),
            'authors': author_weights['weight'].to_dict(),
            'tags': tag_counts.to_dict(),
            'avg_rating': user_books['rating'].mean(),
            'total_books': len(user_books)
        }
    
    def recommend_for_user(self, user_id, num_recommendations=10):
        """
        Generate personalized recommendations for a user
        """
        user_profile = self.get_user_profile(user_id)
        
        if user_profile is None:
            # New user - recommend popular books
            return self._recommend_popular_books(num_recommendations)
        
        # Get books user has already read/rated
        read_books_query = """
        SELECT DISTINCT book_id FROM reviews WHERE user_id = %s
        UNION
        SELECT DISTINCT book_id FROM reading_history WHERE user_id = %s
        """
        
        read_books = pd.read_sql(read_books_query, self.db_connection, params=[user_id, user_id])
        read_book_ids = set(read_books['book_id'].tolist())
        
        # Calculate recommendation scores
        recommendations = []
        
        for idx, book in self.books_df.iterrows():
            if book['id'] in read_book_ids:
                continue
            
            score = self._calculate_book_score(book, user_profile)
            
            if score > 0.1:  # Minimum threshold
                recommendations.append({
                    'book_id': book['id'],
                    'title': book['title'],
                    'author': book['author'],
                    'genre': book['genre'],
                    'score': score,
                    'explanation': self._generate_explanation(book, user_profile)
                })
        
        # Sort by score and return top recommendations
        recommendations.sort(key=lambda x: x['score'], reverse=True)
        return recommendations[:num_recommendations]
    
    def _calculate_book_score(self, book, user_profile):
        """
        Calculate recommendation score for a book based on user profile
        """
        score = 0.0
        
        # Genre preference
        genre_weight = user_profile['genres'].get(book['genre'], 0)
        score += genre_weight * 0.4
        
        # Author preference
        author_weight = user_profile['authors'].get(book['author'], 0)
        score += author_weight * 0.2
        
        # Tag preferences
        if book['tags']:
            tag_score = sum(user_profile['tags'].get(tag, 0) for tag in book['tags'])
            score += (tag_score / len(book['tags'])) * 0.2
        
        # Quality indicators
        if book['average_rating'] >= 4.0:
            score += 0.1
        
        if book['review_count'] >= 50:
            score += 0.05
        
        # Popularity boost
        score += (book['popularity_score'] / 100) * 0.05
        
        return min(score, 1.0)  # Cap at 1.0
    
    def _generate_explanation(self, book, user_profile):
        """
        Generate human-readable explanation for recommendation
        """
        reasons = []
        
        if book['genre'] in user_profile['genres']:
            reasons.append(f"You enjoy {book['genre']} books")
        
        if book['author'] in user_profile['authors']:
            reasons.append(f"You've liked books by {book['author']}")
        
        if book['tags']:
            matching_tags = [tag for tag in book['tags'] if tag in user_profile['tags']]
            if matching_tags:
                reasons.append(f"Matches your interest in {', '.join(matching_tags[:2])}")
        
        if book['average_rating'] >= 4.5:
            reasons.append("Highly rated by other readers")
        
        return "; ".join(reasons) if reasons else "Recommended based on your reading preferences"
    
    def _recommend_popular_books(self, num_recommendations):
        """
        Recommend popular books for new users
        """
        popular_books = self.books_df.nlargest(num_recommendations, 'popularity_score')
        
        recommendations = []
        for _, book in popular_books.iterrows():
            recommendations.append({
                'book_id': book['id'],
                'title': book['title'],
                'author': book['author'],
                'genre': book['genre'],
                'score': 0.8,
                'explanation': "Popular among readers"
            })
        
        return recommendations
    
    def find_similar_books(self, book_id, num_similar=5):
        """
        Find books similar to a given book
        """
        if self.similarity_matrix is None:
            self.compute_similarity_matrix()
        
        try:
            book_idx = self.books_df[self.books_df['id'] == book_id].index[0]
        except IndexError:
            return []
        
        # Get similarity scores for this book
        sim_scores = list(enumerate(self.similarity_matrix[book_idx]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        
        # Get top similar books (excluding the book itself)
        similar_books = []
        for i, score in sim_scores[1:num_similar+1]:
            book = self.books_df.iloc[i]
            similar_books.append({
                'book_id': book['id'],
                'title': book['title'],
                'author': book['author'],
                'genre': book['genre'],
                'similarity_score': score,
                'explanation': f"Similar content and themes"
            })
        
        return similar_books
    
    def save_recommendations_to_db(self, user_id, recommendations):
        """
        Save recommendations to database for caching
        """
        cursor = self.db_connection.cursor()
        
        # Clear old recommendations
        cursor.execute(
            "DELETE FROM recommendations WHERE user_id = %s",
            [user_id]
        )
        
        # Insert new recommendations
        for rec in recommendations:
            cursor.execute("""
                INSERT INTO recommendations 
                (user_id, book_id, recommendation_score, recommendation_type, explanation)
                VALUES (%s, %s, %s, %s, %s)
            """, [
                user_id, rec['book_id'], rec['score'], 
                'content_based', rec['explanation']
            ])
        
        self.db_connection.commit()
        cursor.close()
        
        self.logger.info(f"Saved {len(recommendations)} recommendations for user {user_id}")

# Example usage
if __name__ == "__main__":
    # Database connection string
    DB_CONNECTION = "postgresql://username:password@localhost:5432/bookdb"
    
    # Initialize recommender
    recommender = ContentBasedRecommender(DB_CONNECTION)
    
    # Build the recommendation model
    recommender.load_books_data()
    recommender.build_content_features()
    recommender.compute_similarity_matrix()
    
    # Generate recommendations for a user
    user_id = 1
    recommendations = recommender.recommend_for_user(user_id, num_recommendations=10)
    
    print(f"Recommendations for User {user_id}:")
    for rec in recommendations:
        print(f"- {rec['title']} by {rec['author']} (Score: {rec['score']:.3f})")
        print(f"  Reason: {rec['explanation']}")
        print()
    
    # Find similar books
    book_id = 1
    similar_books = recommender.find_similar_books(book_id, num_similar=5)
    
    print(f"Books similar to Book ID {book_id}:")
    for book in similar_books:
        print(f"- {book['title']} by {book['author']} (Similarity: {book['similarity_score']:.3f})")
