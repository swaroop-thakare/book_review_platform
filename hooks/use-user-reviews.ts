"use client"

import { useState, useEffect, useCallback } from "react"
import type { Review } from "@/types/review"

export function useUserReviews(userId?: string) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUserReviews = useCallback(async () => {
    if (!userId) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      // TODO: Replace with actual API call
      const mockReviews: Review[] = [
        {
          id: "1",
          bookId: "1",
          userId: userId,
          rating: 5,
          content: "An absolutely brilliant masterpiece! Fitzgerald's prose is beautiful and the story is captivating.",
          createdAt: "2024-01-15",
          updatedAt: "2024-01-15",
          book: {
            id: "1",
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            isbn: "9780743273565",
            description: "",
            genre: "Fiction",
            publishedDate: "1925-04-10",
            publisher: "Scribner",
            pages: 180,
            createdAt: "2024-01-01",
            updatedAt: "2024-01-01",
          },
          user: {
            id: userId,
            name: "John Doe",
            email: "john@example.com",
            createdAt: "2024-01-01",
            updatedAt: "2024-01-01",
          },
        },
      ]

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300))

      setReviews(mockReviews)
    } catch (err) {
      setError("Failed to fetch user reviews")
      console.error("Error fetching user reviews:", err)
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    fetchUserReviews()
  }, [fetchUserReviews])

  const deleteReview = async (reviewId: string) => {
    try {
      // TODO: Replace with actual API call
      setReviews((prev) => prev.filter((review) => review.id !== reviewId))
    } catch (err) {
      console.error("Error deleting review:", err)
      throw err
    }
  }

  return { reviews, loading, error, deleteReview, refetch: fetchUserReviews }
}
