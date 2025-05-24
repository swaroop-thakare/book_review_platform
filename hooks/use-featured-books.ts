"use client"

import { useState, useEffect } from "react"
import type { Book } from "@/types/book"

export function useFeaturedBooks() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        // TODO: Replace with actual API call
        const mockBooks: Book[] = [
          {
            id: "1",
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            isbn: "9780743273565",
            description: "A classic American novel set in the Jazz Age.",
            genre: "Fiction",
            coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop&crop=center",
            publishedDate: "1925-04-10",
            publisher: "Scribner",
            pages: 180,
            averageRating: 4.2,
            reviewCount: 1250,
            createdAt: "2024-01-01",
            updatedAt: "2024-01-01",
          },
          {
            id: "2",
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            isbn: "9780061120084",
            description: "A gripping tale of racial injustice and childhood innocence.",
            genre: "Fiction",
            coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&crop=center",
            publishedDate: "1960-07-11",
            publisher: "J.B. Lippincott & Co.",
            pages: 281,
            averageRating: 4.5,
            reviewCount: 2100,
            createdAt: "2024-01-01",
            updatedAt: "2024-01-01",
          },
          {
            id: "3",
            title: "1984",
            author: "George Orwell",
            isbn: "9780451524935",
            description: "A dystopian social science fiction novel.",
            genre: "Science Fiction",
            coverImage: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=300&h=400&fit=crop&crop=center",
            publishedDate: "1949-06-08",
            publisher: "Secker & Warburg",
            pages: 328,
            averageRating: 4.4,
            reviewCount: 1800,
            createdAt: "2024-01-01",
            updatedAt: "2024-01-01",
          },
          {
            id: "4",
            title: "Pride and Prejudice",
            author: "Jane Austen",
            isbn: "9780141439518",
            description: "A romantic novel of manners.",
            genre: "Romance",
            coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=center",
            publishedDate: "1813-01-28",
            publisher: "T. Egerton",
            pages: 432,
            averageRating: 4.3,
            reviewCount: 1600,
            createdAt: "2024-01-01",
            updatedAt: "2024-01-01",
          },
        ]

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        setBooks(mockBooks)
      } catch (err) {
        setError("Failed to fetch featured books")
        console.error("Error fetching featured books:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedBooks()
  }, [])

  return { books, loading, error }
}
