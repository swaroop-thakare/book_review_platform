import { ModernBookCard } from "./modern-book-card"
import { BookListItem } from "./book-list-item"
import type { Book } from "@/types/book"

interface BookGridProps {
  books?: Book[]
  viewMode?: "grid" | "list"
  cardStyle?: "default" | "flip" | "glass" | "manga" | "modern"
}

export function BookGrid({ books = [], viewMode = "grid", cardStyle = "modern" }: BookGridProps) {
  if (books.length === 0) {
    return (
      <div className="text-center py-12 lg:py-16">
        <div className="bg-gradient-primary rounded-full w-20 h-20 lg:w-24 lg:h-24 flex items-center justify-center mx-auto mb-6 lg:mb-8 shadow-lg">
          <span className="text-3xl lg:text-4xl">📚</span>
        </div>
        <h3 className="text-xl lg:text-2xl font-display font-semibold text-gray-900 dark:text-white mb-3 lg:mb-4">
          No books found
        </h3>
        <p className="text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          Try adjusting your search criteria or browse our featured collections
        </p>
      </div>
    )
  }

  if (viewMode === "list") {
    return (
      <div className="space-y-4 lg:space-y-6">
        {books.map((book) => (
          <BookListItem key={book.id} book={book} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
      {books.map((book) => (
        <ModernBookCard key={book.id} book={book} variant="neo" />
      ))}
    </div>
  )
}
