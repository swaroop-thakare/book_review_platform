import type { Book } from "./book"
import type { User } from "./user"

export interface Review {
  id: string
  bookId: string
  userId: string
  rating: number
  content: string
  createdAt: string
  updatedAt: string
  book: Book
  user: User
}
