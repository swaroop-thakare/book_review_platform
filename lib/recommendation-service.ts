import type { Book } from "@/types/book"

export interface Recommendation {
  book_id: number
  title: string
  author: string
  genre: string
  score: number
  explanation: string
  book?: Book
}

export interface SimilarBook {
  book_id: number
  title: string
  author: string
  genre: string
  similarity_score: number
  explanation: string
  book?: Book
}

export class RecommendationService {
  private baseUrl: string

  constructor(baseUrl = "/api") {
    this.baseUrl = baseUrl
  }

  /**
   * Get personalized recommendations for a user
   */
  async getRecommendationsForUser(userId: number, limit = 10): Promise<Recommendation[]> {
    try {
      const response = await fetch(`${this.baseUrl}/recommendations/user/${userId}?limit=${limit}`)

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations")
      }

      return await response.json()
    } catch (error) {
      console.error("Error fetching recommendations:", error)
      return []
    }
  }

  /**
   * Get books similar to a specific book
   */
  async getSimilarBooks(bookId: number, limit = 5): Promise<SimilarBook[]> {
    try {
      const response = await fetch(`${this.baseUrl}/recommendations/similar/${bookId}?limit=${limit}`)

      if (!response.ok) {
        throw new Error("Failed to fetch similar books")
      }

      return await response.json()
    } catch (error) {
      console.error("Error fetching similar books:", error)
      return []
    }
  }

  /**
   * Get trending recommendations
   */
  async getTrendingRecommendations(limit = 10): Promise<Book[]> {
    try {
      const response = await fetch(`${this.baseUrl}/recommendations/trending?limit=${limit}`)

      if (!response.ok) {
        throw new Error("Failed to fetch trending recommendations")
      }

      return await response.json()
    } catch (error) {
      console.error("Error fetching trending recommendations:", error)
      return []
    }
  }

  /**
   * Update user preferences based on interaction
   */
  async updateUserPreferences(
    userId: number,
    bookId: number,
    interactionType: "like" | "dislike" | "view" | "add_to_list",
  ): Promise<void> {
    try {
      await fetch(`${this.baseUrl}/recommendations/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          bookId,
          interactionType,
        }),
      })
    } catch (error) {
      console.error("Error updating user preferences:", error)
    }
  }

  /**
   * Refresh recommendations for a user
   */
  async refreshRecommendations(userId: number): Promise<void> {
    try {
      await fetch(`${this.baseUrl}/recommendations/refresh/${userId}`, {
        method: "POST",
      })
    } catch (error) {
      console.error("Error refreshing recommendations:", error)
    }
  }
}

export const recommendationService = new RecommendationService()
