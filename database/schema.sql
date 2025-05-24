-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(500),
    bio TEXT,
    reading_preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Books table with enhanced features for recommendations
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(20) UNIQUE,
    description TEXT,
    genre VARCHAR(100) NOT NULL,
    subgenres TEXT[], -- Array of subgenres
    tags TEXT[], -- Array of tags
    cover_image_url VARCHAR(500),
    published_date DATE,
    publisher VARCHAR(255),
    pages INTEGER,
    language VARCHAR(50) DEFAULT 'English',
    average_rating DECIMAL(3,2) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    popularity_score DECIMAL(5,2) DEFAULT 0,
    content_features JSONB DEFAULT '{}', -- Extracted features for ML
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews table
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, book_id)
);

-- User reading history
CREATE TABLE reading_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
    status VARCHAR(20) CHECK (status IN ('want_to_read', 'reading', 'completed', 'dropped')),
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Book similarities (precomputed for performance)
CREATE TABLE book_similarities (
    id SERIAL PRIMARY KEY,
    book_id_1 INTEGER REFERENCES books(id) ON DELETE CASCADE,
    book_id_2 INTEGER REFERENCES books(id) ON DELETE CASCADE,
    similarity_score DECIMAL(5,4),
    similarity_type VARCHAR(50), -- 'content', 'collaborative', 'hybrid'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(book_id_1, book_id_2)
);

-- User preferences learned from behavior
CREATE TABLE user_preferences (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    preference_type VARCHAR(50), -- 'genre', 'author', 'tag', 'length'
    preference_value VARCHAR(255),
    weight DECIMAL(3,2), -- How much this preference matters (0-1)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, preference_type, preference_value)
);

-- Recommendation cache
CREATE TABLE recommendations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
    recommendation_score DECIMAL(5,4),
    recommendation_type VARCHAR(50), -- 'content', 'collaborative', 'trending'
    explanation TEXT, -- Why this was recommended
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL '24 hours')
);

-- Indexes for performance
CREATE INDEX idx_books_genre ON books(genre);
CREATE INDEX idx_books_tags ON books USING GIN(tags);
CREATE INDEX idx_reviews_user_rating ON reviews(user_id, rating);
CREATE INDEX idx_reviews_book_rating ON reviews(book_id, rating);
CREATE INDEX idx_similarities_book1 ON book_similarities(book_id_1);
CREATE INDEX idx_similarities_book2 ON book_similarities(book_id_2);
CREATE INDEX idx_recommendations_user ON recommendations(user_id);
CREATE INDEX idx_recommendations_expires ON recommendations(expires_at);
