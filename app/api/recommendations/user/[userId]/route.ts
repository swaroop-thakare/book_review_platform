import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const userId = Number.parseInt(params.userId)
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    // In a real implementation, you would:
    // 1. Connect to your database
    // 2. Call your Python recommendation service
    // 3. Return cached recommendations or generate new ones

    // Mock response for demonstration
    const mockRecommendations = [
      {
        book_id: 1,
        title: "The Pragmatic Programmer",
        author: "David Thomas",
        genre: "Technology",
        score: 0.95,
        explanation: "Based on your interest in programming and software development",
        book: {
          id: "1",
          title: "The Pragmatic Programmer",
          author: "David Thomas",
          isbn: "9780201616224",
          description: "A comprehensive guide to software development best practices",
          genre: "Technology",
          tags: ["Programming", "Software Development", "Best Practices"],
          coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=400&fit=crop",
          publishedDate: "1999-10-20",
          publisher: "Addison-Wesley",
          pages: 352,
          averageRating: 4.6,
          reviewCount: 1250,
          createdAt: "2024-01-01",
          updatedAt: "2024-01-01",
        },
      },
      {
        book_id: 2,
        title: "Clean Code",
        author: "Robert C. Martin",
        genre: "Technology",
        score: 0.92,
        explanation: "You've enjoyed books about software craftsmanship",
        book: {
          id: "2",
          title: "Clean Code",
          author: "Robert C. Martin",
          isbn: "9780132350884",
          description: "A handbook of agile software craftsmanship",
          genre: "Technology",
          tags: ["Programming", "Clean Code", "Software Engineering"],
          coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=400&fit=crop",
          publishedDate: "2008-08-01",
          publisher: "Prentice Hall",
          pages: 464,
          averageRating: 4.4,
          reviewCount: 980,
          createdAt: "2024-01-01",
          updatedAt: "2024-01-01",
        },
      },
    ]

    return NextResponse.json(mockRecommendations.slice(0, limit))
  } catch (error) {
    console.error("Error fetching recommendations:", error)
    return NextResponse.json({ error: "Failed to fetch recommendations" }, { status: 500 })
  }
}
