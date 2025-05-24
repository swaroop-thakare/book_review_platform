"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Heart, Eye, BookOpen, Sparkles, Zap, TrendingUp, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Book } from "@/types/book"

interface ModernBookCardProps {
  book: Book
  variant?: "default" | "glass" | "manga" | "premium" | "neo"
}

export function ModernBookCard({ book, variant = "neo" }: ModernBookCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const getGenreStyle = (genre: string) => {
    const genreMap: Record<string, { gradient: string; glow: string; class: string }> = {
      Manga: {
        gradient: "from-pink-500 via-rose-500 to-red-500",
        glow: "shadow-pink-500/25",
        class: "genre-manga",
      },
      Romance: {
        gradient: "from-rose-400 via-pink-500 to-fuchsia-500",
        glow: "shadow-rose-500/25",
        class: "genre-romance",
      },
      Fantasy: {
        gradient: "from-purple-500 via-violet-500 to-indigo-500",
        glow: "shadow-purple-500/25",
        class: "genre-fantasy",
      },
      "Science Fiction": {
        gradient: "from-cyan-400 via-blue-500 to-indigo-600",
        glow: "shadow-cyan-500/25",
        class: "genre-scifi",
      },
      Business: {
        gradient: "from-emerald-400 via-green-500 to-teal-600",
        glow: "shadow-emerald-500/25",
        class: "genre-business",
      },
      "Self-Help": {
        gradient: "from-amber-400 via-orange-500 to-red-500",
        glow: "shadow-orange-500/25",
        class: "genre-selfhelp",
      },
      Fiction: {
        gradient: "from-indigo-400 via-blue-500 to-cyan-600",
        glow: "shadow-indigo-500/25",
        class: "genre-fiction",
      },
      Horror: {
        gradient: "from-red-500 via-rose-600 to-pink-700",
        glow: "shadow-red-500/25",
        class: "genre-horror",
      },
    }
    return (
      genreMap[genre] || {
        gradient: "from-slate-500 to-gray-600",
        glow: "shadow-slate-500/25",
        class: "genre-fiction",
      }
    )
  }

  const genreStyle = getGenreStyle(book.genre)

  const getCardClasses = () => {
    const baseClasses = "group relative overflow-hidden border-0 h-[400px] transition-all duration-500"

    switch (variant) {
      case "glass":
        return `${baseClasses} glass hover:glass-strong`
      case "manga":
        return `${baseClasses} bg-gradient-to-br from-slate-900 via-indigo-900/50 to-purple-900/30`
      case "premium":
        return `${baseClasses} bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 shadow-2xl ${genreStyle.glow}`
      case "neo":
        return `${baseClasses} neu hover:shadow-2xl`
      default:
        return `${baseClasses} card-modern`
    }
  }

  return (
    <Card className={getCardClasses()} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <CardContent className="p-0 h-full relative">
        {/* Background Image with modern overlay */}
        <div className="absolute inset-0">
          <Image
            src={book.coverImage || "/placeholder.svg?height=400&width=300"}
            alt={book.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          {isHovered && (
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/30 to-transparent animate-scale-in" />
          )}
        </div>

        {/* Floating Elements */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
          {/* Genre Badge with modern styling */}
          <Badge
            className={`${genreStyle.class} text-white border-0 shadow-lg backdrop-blur-sm px-3 py-1 rounded-full`}
          >
            <Sparkles className="h-3 w-3 mr-1" />
            {book.genre}
          </Badge>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.preventDefault()
                setIsFavorited(!isFavorited)
              }}
              className={`p-2.5 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 ${
                isFavorited
                  ? "bg-red-500/30 text-red-300 shadow-lg shadow-red-500/25"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              <Heart className={`h-4 w-4 ${isFavorited ? "fill-current" : ""}`} />
            </button>

            <Link href={`/books/${book.id}`}>
              <button className="p-2.5 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-md transition-all duration-300 hover:scale-110">
                <Eye className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>

        {/* Modern Rating Badge */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex items-center glass rounded-full px-4 py-2 text-white hover:scale-105 transition-transform duration-300">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1.5" />
            <span className="text-sm font-semibold">{book.averageRating?.toFixed(1) || "N/A"}</span>
          </div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          {/* Tags with modern styling */}
          <div className="flex flex-wrap gap-2 mb-4">
            {book.tags?.slice(0, 2).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs bg-white/20 text-white border-white/30 backdrop-blur-sm rounded-full px-3 py-1"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title & Author */}
          <h3 className="font-display font-bold text-2xl text-white mb-2 line-clamp-2 group-hover:text-indigo-200 transition-colors">
            {book.title}
          </h3>
          <p className="text-white/90 text-base mb-4 font-medium">{book.author}</p>

          {/* Stats Row */}
          <div className="flex items-center gap-4 mb-4 text-sm text-white/70">
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>{book.pages}p</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{book.reviewCount || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              <span>{book.averageRating?.toFixed(1)}</span>
            </div>
          </div>

          {/* Description (appears on hover) */}
          <div
            className={`overflow-hidden transition-all duration-500 ${
              isHovered ? "max-h-20 opacity-100 mb-4" : "max-h-0 opacity-0"
            }`}
          >
            <p className="text-white/80 text-sm line-clamp-3 leading-relaxed">{book.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              asChild
              className={`flex-1 btn-primary hover:scale-105 transition-all duration-300 ${
                isHovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-80"
              }`}
            >
              <Link href={`/books/${book.id}`}>
                <BookOpen className="h-4 w-4 mr-2" />
                Explore
              </Link>
            </Button>

            {variant === "premium" && (
              <Button
                size="sm"
                className="btn-glass text-white border-white/30 hover:scale-105 transition-all duration-300"
              >
                <Zap className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Hover Glow Effect */}
        {isHovered && (
          <div
            className={`absolute inset-0 bg-gradient-to-t ${genreStyle.gradient} opacity-10 pointer-events-none animate-scale-in`}
          />
        )}

        {/* Modern corner accent */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/10 to-transparent" />
      </CardContent>
    </Card>
  )
}
