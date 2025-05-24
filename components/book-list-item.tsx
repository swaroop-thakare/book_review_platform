import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, BookOpen, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Book } from "@/types/book"

interface BookListItemProps {
  book: Book
}

export function BookListItem({ book }: BookListItemProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex gap-6">
          <div className="flex-shrink-0">
            <div className="w-24 h-32 relative">
              <Image
                src={book.coverImage || "/placeholder.svg?height=128&width=96"}
                alt={book.title}
                fill
                className="object-cover rounded-md"
              />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <Link href={`/books/${book.id}`}>
                  <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
                    {book.title}
                  </h3>
                </Link>
                <p className="text-gray-600 mt-1">by {book.author}</p>
              </div>
              <Badge variant="secondary" className="ml-4">
                {book.genre}
              </Badge>
            </div>

            <p className="text-gray-700 text-sm line-clamp-3 mb-4">{book.description}</p>

            <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{book.averageRating?.toFixed(1) || "N/A"}</span>
                <span>({book.reviewCount || 0} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>{book.pages} pages</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{book.publishedDate}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {book.tags?.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button asChild>
                <Link href={`/books/${book.id}`}>View Details</Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
