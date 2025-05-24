"use client"

import { useState, useEffect, useCallback } from "react"
import type { Review } from "@/types/review"

export function useReviews(bookId: string) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchReviews = useCallback(async () => {
    if (!bookId) return

    setLoading(true)
    setError(null)

    try {
      // TODO: Replace with actual API call
      const mockReviews: Review[] = [
        {
          id: "1",
          bookId: bookId,
          userId: "1",
          rating: 5,
          content: "An absolutely brilliant masterpiece! Fitzgerald's prose is beautiful and the story is captivating.",
          createdAt: "2024-01-15",
          updatedAt: "2024-01-15",
          book: {
            id: bookId,
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
            id: "1",
            name: "Alice Johnson",
            email: "alice@example.com",
            avatar: "/placeholder.svg?height=40&width=40",
            createdAt: "2024-01-01",
            updatedAt: "2024-01-01",
          },
        },
      ]

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300))

      setReviews(mockReviews)
    } catch (err) {
      setError("Failed to fetch reviews")
      console.error("Error fetching reviews:", err)
    } finally {
      setLoading(false)
    }
  }, [bookId])

  useEffect(() => {
    fetchReviews()
  }, [fetchReviews])

  const addReview = async (reviewData: { rating: number; content: string }) => {
    try {
      // TODO: Replace with actual API call
      const newReview: Review = {
        id: Date.now().toString(),
        bookId: bookId,
        userId: "1",
        rating: reviewData.rating,
        content: reviewData.content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        book: {
          id: bookId,
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
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          avatar: "/placeholder.svg?height=40&width=40",
          createdAt: "2024-01-01",
          updatedAt: "2024-01-01",
        },
      }

      setReviews((prev) => [newReview, ...prev])
    } catch (err) {
      console.error("Error adding review:", err)
      throw err
    }
  }

  return { reviews, loading, error, addReview, refetch: fetchReviews }
}
