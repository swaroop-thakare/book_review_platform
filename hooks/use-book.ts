"use client"

import { useState, useEffect } from "react"
import type { Book } from "@/types/book"

export function useBook(id: string) {
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) return

      setLoading(true)
      setError(null)

      try {
        // TODO: Replace with actual API call
        const mockBook: Book = {
          id: "1",
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          isbn: "9780743273565",
          description:
            "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on prosperous Long Island and in New York City, the novel tells the story of Jay Gatsby and his obsession with Daisy Buchanan.",
          genre: "Fiction",
          tags: ["Classic", "American Literature", "Jazz Age"],
          publishedDate: "1925-04-10",
          publisher: "Scribner",
          pages: 180,
          averageRating: 4.2,
          reviewCount: 1250,
          createdAt: "2024-01-01",
          updatedAt: "2024-01-01",
        }

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        setBook(mockBook)
      } catch (err) {
        setError("Failed to fetch book")
        console.error("Error fetching book:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchBook()
  }, [id])

  return { book, loading, error }
}
