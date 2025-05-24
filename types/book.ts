export interface Book {
  id: string
  title: string
  author: string
  isbn: string
  description: string
  genre: string
  tags?: string[]
  coverImage?: string
  publishedDate: string
  publisher: string
  pages: number
  averageRating?: number
  reviewCount?: number
  createdAt: string
  updatedAt: string
}
