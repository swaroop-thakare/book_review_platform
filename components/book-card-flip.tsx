"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Heart, Eye, BookOpen, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Book } from "@/types/book"

interface BookCardFlipProps {
  book: Book
}

export function BookCardFlip({ book }: BookCardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)

  return (
    <div
      className="group perspective-1000 h-96"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front of card */}
        <Card className="absolute inset-0 w-full h-full backface-hidden border-0 shadow-lg overflow-hidden">
          <CardContent className="p-0 h-full relative">
            <div className="relative h-full">
              <Image
                src={book.coverImage || "/placeholder.svg?height=400&width=300"}
                alt={book.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Genre ribbon */}
              <div className="absolute top-4 left-0">
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-r-full pl-4 pr-6">
                  {book.genre}
                </Badge>
              </div>

              {/* Favorite button */}
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setIsFavorited(!isFavorited)
                }}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
              >
                <Heart className={`h-5 w-5 ${isFavorited ? "fill-red-500 text-red-500" : "text-white"}`} />
              </button>

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="font-bold text-lg mb-1 line-clamp-2">{book.title}</h3>
                <p className="text-white/80 text-sm mb-2">{book.author}</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm">{book.averageRating?.toFixed(1) || "N/A"}</span>
                  </div>
                  <span className="text-white/60 text-sm">({book.reviewCount || 0} reviews)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back of card */}
        <Card className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 border-0 shadow-lg">
          <CardContent className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="secondary">{book.genre}</Badge>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                {book.publishedDate}
              </div>
            </div>

            <h3 className="font-bold text-lg mb-2 line-clamp-2">{book.title}</h3>
            <p className="text-gray-600 text-sm mb-3">by {book.author}</p>

            <p className="text-gray-700 text-sm line-clamp-4 mb-4 flex-1">{book.description}</p>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Pages:</span>
                <span className="font-medium">{book.pages}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Publisher:</span>
                <span className="font-medium">{book.publisher}</span>
              </div>

              <div className="flex gap-2 pt-2">
                <Button asChild size="sm" className="flex-1">
                  <Link href={`/books/${book.id}`}>
                    <Eye className="h-4 w-4 mr-1" />
                    Details
                  </Link>
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <BookOpen className="h-4 w-4 mr-1" />
                  Read
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
