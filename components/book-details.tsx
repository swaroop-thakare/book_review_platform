import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Calendar, BookOpen } from "lucide-react"
import Image from "next/image"
import type { Book } from "@/types/book"

interface BookDetailsProps {
  book: Book
}

export function BookDetails({ book }: BookDetailsProps) {
  return (
    <Card>
      <CardContent className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="aspect-[3/4] relative">
              <Image
                src={book.coverImage || "/placeholder.svg?height=400&width=300"}
                alt={book.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
              <p className="text-xl text-gray-600 mb-4">by {book.author}</p>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-lg font-semibold">{book.averageRating?.toFixed(1) || "N/A"}</span>
                </div>
                <span className="text-gray-500">({book.reviewCount || 0} reviews)</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="secondary">{book.genre}</Badge>
                {book.tags?.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <span>Published: {book.publishedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-gray-500" />
                <span>{book.pages} pages</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">ISBN:</span>
                <span>{book.isbn}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Publisher:</span>
                <span>{book.publisher}</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{book.description}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
