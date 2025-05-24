"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Star, TrendingUp, Sparkles, RefreshCw, Heart, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { recommendationService, type Recommendation } from "@/lib/recommendation-service"

interface RecommendationsSectionProps {
  userId?: number
  title?: string
  showRefresh?: boolean
}

export function RecommendationsSection({
  userId,
  title = "Recommended for You",
  showRefresh = true,
}: RecommendationsSectionProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchRecommendations = async () => {
    if (!userId) return

    try {
      setLoading(true)
      const recs = await recommendationService.getRecommendationsForUser(userId, 8)
      setRecommendations(recs)
    } catch (error) {
      console.error("Error fetching recommendations:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    if (!userId) return

    try {
      setRefreshing(true)
      await recommendationService.refreshRecommendations(userId)
      await fetchRecommendations()
    } catch (error) {
      console.error("Error refreshing recommendations:", error)
    } finally {
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchRecommendations()
  }, [userId])

  if (loading) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white flex items-center">
              <Sparkles className="h-8 w-8 mr-3 text-cyan-400" />
              {title}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="bg-white/10 backdrop-blur-lg border border-white/20 animate-pulse">
                <CardContent className="p-6">
                  <div className="aspect-[3/4] bg-white/20 rounded-lg mb-4" />
                  <div className="h-4 bg-white/20 rounded mb-2" />
                  <div className="h-3 bg-white/20 rounded mb-4" />
                  <div className="h-8 bg-white/20 rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!recommendations.length) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 text-center p-12">
            <CardContent>
              <BookOpen className="h-16 w-16 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Recommendations Yet</h3>
              <p className="text-gray-300 mb-6">Rate some books to get personalized recommendations!</p>
              <Button asChild className="bg-gradient-to-r from-cyan-600 to-blue-600">
                <Link href="/books">Browse Books</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white flex items-center">
            <Sparkles className="h-8 w-8 mr-3 text-cyan-400" />
            {title}
          </h2>
          {showRefresh && (
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={refreshing}
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map((rec) => (
            <Card
              key={rec.book_id}
              className="group bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
            >
              <CardContent className="p-0">
                <div className="relative">
                  <div className="aspect-[3/4] relative overflow-hidden rounded-t-lg">
                    <Image
                      src={rec.book?.coverImage || "/placeholder.svg?height=400&width=300"}
                      alt={rec.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* AI Score Badge */}
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0 shadow-lg">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {Math.round(rec.score * 100)}%
                      </Badge>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-110">
                        <Heart className="h-4 w-4" />
                      </button>
                      <Link href={`/books/${rec.book_id}`}>
                        <button className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-110">
                          <Eye className="h-4 w-4" />
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-white mb-1 line-clamp-2 group-hover:text-cyan-200 transition-colors">
                      {rec.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-3">{rec.author}</p>

                    {/* Genre Badge */}
                    <Badge variant="secondary" className="mb-3 bg-white/20 text-white border-white/30">
                      {rec.genre}
                    </Badge>

                    {/* AI Explanation */}
                    <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg p-3 mb-4 border border-cyan-500/20">
                      <p className="text-xs text-cyan-200 leading-relaxed">
                        <Sparkles className="h-3 w-3 inline mr-1" />
                        {rec.explanation}
                      </p>
                    </div>

                    {/* Rating */}
                    {rec.book?.averageRating && (
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1 text-sm text-white">{rec.book.averageRating.toFixed(1)}</span>
                        </div>
                        <span className="text-xs text-gray-400">({rec.book.reviewCount} reviews)</span>
                      </div>
                    )}

                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white border-0"
                    >
                      <Link href={`/books/${rec.book_id}`}>
                        <BookOpen className="h-4 w-4 mr-2" />
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {recommendations.length >= 8 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              View More Recommendations
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
