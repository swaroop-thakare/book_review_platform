import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { bookId: string } }) {
  try {
    const bookId = Number.parseInt(params.bookId)
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "5")

    // Mock similar books response
    const mockSimilarBooks = [
      {
        book_id: 3,
        title: "Design Patterns",
        author: "Gang of Four",
        genre: "Technology",
        similarity_score: 0.87,
        explanation: "Similar programming concepts and software design principles",
        book: {
          id: "3",
          title: "Design Patterns",
          author: "Gang of Four",
          isbn: "9780201633610",
          description: "Elements of reusable object-oriented software",
          genre: "Technology",
          tags: ["Design Patterns", "Object-Oriented", "Software Architecture"],
          coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
          publishedDate: "1994-10-21",
          publisher: "Addison-Wesley",
          pages: 395,
          averageRating: 4.3,
          reviewCount: 750,
          createdAt: "2024-01-01",
          updatedAt: "2024-01-01",
        },
      },
    ]

    return NextResponse.json(mockSimilarBooks.slice(0, limit))
  } catch (error) {
    console.error("Error fetching similar books:", error)
    return NextResponse.json({ error: "Failed to fetch similar books" }, { status: 500 })
  }
}
