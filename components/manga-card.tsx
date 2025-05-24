"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Heart, Bookmark, Play, Volume2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Book } from "@/types/book"

interface MangaCardProps {
  book: Book
}

export function MangaCard({ book }: MangaCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  // Manga-specific data (would come from API in real app)
  const mangaData = {
    status: "Ongoing",
    chapters: 156,
    volumes: 18,
    lastUpdated: "2 days ago",
    scanlator: "MangaPlus",
  }

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50">
      {/* Manga panel-style header */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={book.coverImage || "/placeholder.svg?height=200&width=300"}
          alt={book.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <Badge
            className={`${
              mangaData.status === "Ongoing"
                ? "bg-green-500"
                : mangaData.status === "Completed"
                  ? "bg-blue-500"
                  : "bg-yellow-500"
            } text-white`}
          >
            {mangaData.status}
          </Badge>
        </div>

        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsFavorited(!isFavorited)
            }}
            className="p-2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition-colors"
          >
            <Heart className={`h-4 w-4 ${isFavorited ? "fill-red-500 text-red-500" : "text-white"}`} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsBookmarked(!isBookmarked)
            }}
            className="p-2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition-colors"
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-blue-500 text-blue-500" : "text-white"}`} />
          </button>
        </div>

        {/* Genre tags */}
        <div className="absolute bottom-3 left-3 flex gap-1">
          {book.tags?.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs bg-white/20 text-white border-white/30">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <CardContent className="p-4">
        {/* Title and author */}
        <div className="mb-3">
          <h3 className="font-bold text-lg line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
            {book.title}
          </h3>
          <p className="text-gray-600 text-sm">{book.author}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm font-medium">{book.averageRating?.toFixed(1) || "N/A"}</span>
          </div>
          <span className="text-gray-500 text-sm">({book.reviewCount || 0})</span>
        </div>

        {/* Manga stats */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500">Chapters:</span>
            <span className="font-medium">{mangaData.chapters}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Volumes:</span>
            <span className="font-medium">{mangaData.volumes}</span>
          </div>
          <div className="flex justify-between col-span-2">
            <span className="text-gray-500">Updated:</span>
            <span className="font-medium text-green-600">{mangaData.lastUpdated}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <Button asChild size="sm" className="flex-1">
            <Link href={`/books/${book.id}`}>
              <Play className="h-4 w-4 mr-1" />
              Read
            </Link>
          </Button>
          <Button size="sm" variant="outline">
            <Volume2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Scanlator info */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Scanlated by <span className="font-medium text-blue-600">{mangaData.scanlator}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
