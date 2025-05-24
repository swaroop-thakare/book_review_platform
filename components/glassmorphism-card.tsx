"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Heart, Eye, BookOpen, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Book } from "@/types/book"

interface GlassmorphismCardProps {
  book: Book
}

export function GlassmorphismCard({ book }: GlassmorphismCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {/* Background image */}
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <Image
          src={book.coverImage || "/placeholder.svg?height=400&width=300"}
          alt={book.title}
          fill
          className="object-cover scale-110 group-hover:scale-125 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Glassmorphism overlay */}
      <Card
        className={`relative h-96 border-0 bg-white/10 backdrop-blur-md transition-all duration-300 ${
          isHovered ? "bg-white/20 backdrop-blur-lg" : ""
        }`}
      >
        <CardContent className="p-6 h-full flex flex-col justify-between relative">
          {/* Top section */}
          <div>
            {/* Floating action buttons */}
            <div className="flex justify-between items-start mb-4">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                <Sparkles className="h-3 w-3 mr-1" />
                {book.genre}
              </Badge>
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    setIsFavorited(!isFavorited)
                  }}
                  className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                    isFavorited ? "bg-red-500/30 text-red-300" : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  <Heart className={`h-4 w-4 ${isFavorited ? "fill-current" : ""}`} />
                </button>
                <Link href={`/books/${book.id}`}>
                  <button className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-all duration-300">
                    <Eye className="h-4 w-4" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 text-white text-sm font-medium">{book.averageRating?.toFixed(1) || "N/A"}</span>
              </div>
              <span className="text-white/70 text-sm">({book.reviewCount || 0} reviews)</span>
            </div>
          </div>

          {/* Bottom section */}
          <div>
            <h3 className="font-bold text-xl text-white mb-2 line-clamp-2">{book.title}</h3>
            <p className="text-white/80 text-sm mb-4">{book.author}</p>

            {/* Animated description */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isHovered ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-white/70 text-sm line-clamp-3 mb-4">{book.description}</p>
            </div>

            {/* Action button */}
            <Button
              asChild
              className={`w-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 transition-all duration-300 ${
                isHovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-80"
              }`}
            >
              <Link href={`/books/${book.id}`}>
                <BookOpen className="h-4 w-4 mr-2" />
                Explore Book
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
