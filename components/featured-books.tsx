"use client"
import { BookGrid } from "./book-grid"
import { LoadingSpinner } from "./loading-spinner"
import { useFeaturedBooks } from "@/hooks/use-featured-books"

export function FeaturedBooks() {
  const { books, loading, error } = useFeaturedBooks()

  if (loading) return <LoadingSpinner />
  if (error) return null

  return (
    <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4 lg:mb-6">
            Featured Books
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover our handpicked selection of trending books, curated by our AI and community experts
          </p>
        </div>
        <BookGrid books={books.slice(0, 8)} viewMode="grid" cardStyle="modern" />
      </div>
    </section>
  )
}
