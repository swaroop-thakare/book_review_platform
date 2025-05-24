"use client"
import { useParams } from "next/navigation"
import { BookDetails } from "@/components/book-details"
import { ReviewsList } from "@/components/reviews-list"
import { ReviewForm } from "@/components/review-form"
import { LoadingSpinner } from "@/components/loading-spinner"
import { useBook } from "@/hooks/use-book"
import { useReviews } from "@/hooks/use-reviews"

export default function BookDetailsPage() {
  const { id } = useParams()
  const { book, loading: bookLoading, error: bookError } = useBook(id as string)
  const { reviews, loading: reviewsLoading, addReview } = useReviews(id as string)

  if (bookLoading) return <LoadingSpinner />

  if (bookError || !book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 pt-20 md:pt-24 flex items-center justify-center">
        <div className="text-center text-red-400 py-8">Book not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 pt-20 md:pt-24 py-8 px-4">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <BookDetails book={book} />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-white">Reviews</h2>
            {reviewsLoading ? <LoadingSpinner /> : <ReviewsList reviews={reviews} />}
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6 text-white">Write a Review</h2>
            <ReviewForm bookId={id as string} onSubmit={addReview} />
          </div>
        </div>
      </div>
    </div>
  )
}
