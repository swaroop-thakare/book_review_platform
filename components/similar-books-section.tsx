"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Zap, Eye, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { recommendationService, type SimilarBook } from "@/lib/recommendation-service"

interface SimilarBooksSectionProps {
  bookId: number
  title?: string
}

export function SimilarBooksSection({ bookId, title = "Similar Books" }: SimilarBooksSectionProps) {
  const [similarBooks, setSimilarBooks] = useState<SimilarBook[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSimilarBooks = async () => {
      try {
        setLoading(true)
        const books = await recommendationService.getSimilarBooks(bookId, 6)
        setSimilarBooks(books)
      } catch (error) {
        console.error("Error fetching similar books:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSimilarBooks()
  }, [bookId])

  if (loading) {
    return (
      <section className="py-8">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Zap className="h-6 w-6 mr-2 text-cyan-400" />
          {title}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="bg-white/10 backdrop-blur-lg border border-white/20 animate-pulse">
              <CardContent className="p-4">
                <div className="aspect-[3/4] bg-white/20 rounded-lg mb-4" />
                <div className="h-4 bg-white/20 rounded mb-2" />
                <div className="h-3 bg-white/20 rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    )
  }

  if (!similarBooks.length) {
    return null
  }

  return (
    <section className="py-8">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
        <Zap className="h-6 w-6 mr-2 text-cyan-400" />
        {title}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {similarBooks.map((book) => (
          <Card
            key={book.book_id}
            className="group bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
          >
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="relative w-20 h-28 flex-shrink-0">
                  <Image
                    src={book.book?.coverImage || "/placeholder.svg?height=112&width=80"}
                    alt={book.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-white mb-1 line-clamp-2 group-hover:text-cyan-200 transition-colors">
                    {book.title}
                  </h4>
                  <p className="text-gray-300 text-sm mb-2">{book.author}</p>

                  <Badge variant="secondary" className="mb-2 bg-white/20 text-white border-white/30 text-xs">
                    {book.genre}
                  </Badge>

                  {/* Similarity Score */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      <Zap className="h-3 w-3 text-cyan-400" />
                      <span className="ml-1 text-xs text-cyan-300">
                        {Math.round(book.similarity_score * 100)}% match
                      </span>
                    </div>
                  </div>

                  {/* Rating */}
                  {book.book?.averageRating && (
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-white">{book.book.averageRating.toFixed(1)}</span>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      asChild
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white border-0 text-xs"
                    >
                      <Link href={`/books/${book.book_id}`}>
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Link>
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                    >
                      <Heart className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
