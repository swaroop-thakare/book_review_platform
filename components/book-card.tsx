import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Book } from "@/types/book"

interface BookCardProps {
  book: Book
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Link href={`/books/${book.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
        <CardContent className="p-4">
          <div className="aspect-[3/4] relative mb-4">
            <Image
              src={book.coverImage || "/placeholder.svg?height=300&width=200"}
              alt={book.title}
              fill
              className="object-cover rounded-md"
            />
          </div>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{book.title}</h3>
          <p className="text-gray-600 mb-2">{book.author}</p>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-sm">{book.averageRating?.toFixed(1) || "N/A"}</span>
            </div>
            <span className="text-sm text-gray-500">({book.reviewCount || 0} reviews)</span>
          </div>
          <Badge variant="secondary">{book.genre}</Badge>
        </CardContent>
      </Card>
    </Link>
  )
}
