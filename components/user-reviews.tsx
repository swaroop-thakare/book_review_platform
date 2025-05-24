"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Trash2 } from "lucide-react"
import Link from "next/link"
import type { Review } from "@/types/review"

interface UserReviewsProps {
  reviews: Review[]
  onDelete: (reviewId: string) => void
}

export function UserReviews({ reviews, onDelete }: UserReviewsProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">You haven't written any reviews yet.</p>
        <Button asChild>
          <Link href="/books">Browse Books to Review</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <Link href={`/books/${review.book.id}`} className="text-lg font-semibold hover:text-blue-600">
                  {review.book.title}
                </Link>
                <p className="text-gray-600">by {review.book.author}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(review.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</span>
            </div>

            <p className="text-gray-700">{review.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
