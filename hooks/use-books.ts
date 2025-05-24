"use client"

import { useState, useCallback } from "react"
import type { Book } from "@/types/book"

interface UseBooksParams {
  search?: string
  genre?: string
  sortBy?: string
  page?: number
}

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchBooks = useCallback(async (params: UseBooksParams = {}) => {
    setLoading(true)
    setError(null)

    try {
      // TODO: Replace with actual API call
      const mockBooks: Book[] = [
        {
          id: "1",
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          isbn: "9780743273565",
          description:
            "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on prosperous Long Island and in New York City, the novel tells the story of Jay Gatsby and his obsession with Daisy Buchanan. A masterpiece of American literature that explores themes of wealth, love, idealism, and moral decay.",
          genre: "Fiction",
          tags: ["Classic", "American Literature", "Jazz Age"],
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
          description:
            "A gripping tale of racial injustice and childhood innocence in the American South. This Pulitzer Prize-winning novel follows Scout Finch as she grows up in a small Alabama town during the 1930s, witnessing her father's courageous defense of a Black man falsely accused of rape.",
          genre: "Fiction",
          tags: ["Classic", "Drama", "Social Justice"],
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
          description:
            "A dystopian social science fiction novel that explores themes of totalitarianism, surveillance, and individual freedom. Set in a world where Big Brother watches everything, this prophetic work remains startlingly relevant to modern discussions about privacy and government control.",
          genre: "Science Fiction",
          tags: ["Dystopian", "Political", "Classic"],
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
          description:
            "A romantic novel of manners that follows Elizabeth Bennet as she navigates issues of marriage, morality, and misconceptions in Georgian England. Austen's wit and social commentary make this a timeless exploration of love, class, and personal growth.",
          genre: "Romance",
          tags: ["Classic", "Romance", "British Literature"],
          coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=center",
          publishedDate: "1813-01-28",
          publisher: "T. Egerton",
          pages: 432,
          averageRating: 4.3,
          reviewCount: 1600,
          createdAt: "2024-01-01",
          updatedAt: "2024-01-01",
        },
        {
          id: "5",
          title: "The Lean Startup",
          author: "Eric Ries",
          isbn: "9780307887894",
          description:
            "A revolutionary approach to building and managing startups that emphasizes rapid iteration, validated learning, and customer feedback. This essential business book provides a scientific methodology for creating and managing successful startups in an age of uncertainty.",
          genre: "Business",
          tags: ["Entrepreneurship", "Innovation", "Strategy"],
          coverImage: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=300&h=400&fit=crop&crop=center",
          publishedDate: "2011-09-13",
          publisher: "Crown Business",
          pages: 336,
          averageRating: 4.1,
          reviewCount: 890,
          createdAt: "2024-01-01",
          updatedAt: "2024-01-01",
        },
        {
          id: "6",
          title: "Atomic Habits",
          author: "James Clear",
          isbn: "9780735211292",
          description:
            "A practical guide to building good habits and breaking bad ones. Clear reveals how tiny changes in behavior can lead to remarkable results, providing a proven framework for improving every day through the compound effect of small habits.",
          genre: "Self-Help",
          tags: ["Productivity", "Personal Development", "Psychology"],
          coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop&crop=center",
          publishedDate: "2018-10-16",
          publisher: "Avery",
          pages: 320,
          averageRating: 4.6,
          reviewCount: 2400,
          createdAt: "2024-01-01",
          updatedAt: "2024-01-01",
        },
        {
          id: "7",
          title: "Attack on Titan",
          author: "Hajime Isayama",
          isbn: "9781612620244",
          description:
            "In this post-apocalyptic sci-fi story, humanity has been devastated by the bizarre, giant humanoids known as the Titans. Little is known about where they came from or why they are bent on consuming mankind.",
          genre: "Manga",
          tags: ["Shonen", "Action", "Drama", "Post-Apocalyptic"],
          coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop&crop=center",
          publishedDate: "2009-09-09",
          publisher: "Kodansha",
          pages: 200,
          averageRating: 4.8,
          reviewCount: 3200,
          createdAt: "2024-01-01",
          updatedAt: "2024-01-01",
        },
        {
          id: "8",
          title: "Your Name",
          author: "Makoto Shinkai",
          isbn: "9780316471862",
          description:
            "A story of two teenagers who discover they are magically and intermittently swapping bodies. When a comet threatens their town, they must find a way to meet and save everyone they care about.",
          genre: "Manga",
          tags: ["Romance", "Supernatural", "Drama"],
          coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop&crop=center",
          publishedDate: "2016-08-26",
          publisher: "Yen Press",
          pages: 192,
          averageRating: 4.7,
          reviewCount: 1800,
          createdAt: "2024-01-01",
          updatedAt: "2024-01-01",
        },
      ]

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      let filteredBooks = [...mockBooks]

      // Apply search filter
      if (params.search) {
        const searchLower = params.search.toLowerCase()
        filteredBooks = filteredBooks.filter(
          (book) =>
            book.title.toLowerCase().includes(searchLower) ||
            book.author.toLowerCase().includes(searchLower) ||
            book.isbn.includes(params.search!) ||
            book.description.toLowerCase().includes(searchLower),
        )
      }

      // Apply genre filter
      if (params.genre && params.genre !== "all" && params.genre !== "") {
        filteredBooks = filteredBooks.filter((book) => book.genre === params.genre)
      }

      // Apply sorting
      if (params.sortBy) {
        filteredBooks.sort((a, b) => {
          switch (params.sortBy) {
            case "title":
              return a.title.localeCompare(b.title)
            case "author":
              return a.author.localeCompare(b.author)
            case "rating":
              return (b.averageRating || 0) - (a.averageRating || 0)
            case "newest":
              return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
            case "popular":
              return (b.reviewCount || 0) - (a.reviewCount || 0)
            default:
              return 0
          }
        })
      }

      setBooks(filteredBooks)
    } catch (err) {
      setError("Failed to fetch books. Please try again.")
      console.error("Error fetching books:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  return { books, loading, error, fetchBooks }
}
