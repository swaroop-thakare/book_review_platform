"use client"

import { useState, useEffect } from "react"
import { BookGrid } from "@/components/book-grid"
import { SearchBar } from "@/components/search-bar"
import { GenreFilter } from "@/components/genre-filter"
import { LoadingSpinner } from "@/components/loading-spinner"
import { AdvancedSearch } from "@/components/advanced-search"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Filter, SortAsc, Grid, List, Sparkles, X } from "lucide-react"
import { useBooks } from "@/hooks/use-books"

export default function BooksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("")
  const [sortBy, setSortBy] = useState("title")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [cardStyle, setCardStyle] = useState<"default" | "flip" | "glass" | "manga">("default")
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const { books, loading, error, fetchBooks } = useBooks()

  useEffect(() => {
    fetchBooks({ search: searchQuery, genre: selectedGenre, sortBy })
  }, [searchQuery, selectedGenre, sortBy, fetchBooks])

  const handleAdvancedSearch = (filters: any) => {
    // Apply advanced filters
    setActiveFilters(
      [
        ...filters.genres,
        ...filters.bookType,
        filters.status !== "all" ? filters.status : "",
        filters.rating[0] > 0 ? `${filters.rating[0]}+ stars` : "",
      ].filter(Boolean),
    )

    fetchBooks({
      search: filters.query,
      genre: filters.genres.join(","),
      sortBy: filters.sortBy,
      ...filters,
    })
  }

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))
  }

  if (loading) return <LoadingSpinner />
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 md:pt-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <Card className="p-8 text-center bg-white/10 backdrop-blur-lg border border-white/20">
          <CardContent>
            <h2 className="text-2xl font-bold text-red-400 mb-4">Error Loading Books</h2>
            <p className="text-gray-300 mb-4">{error}</p>
            <Button
              onClick={() => fetchBooks()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <Sparkles className="h-8 w-8 mr-3 text-cyan-400" />
            Enterprise Library
          </h1>
          <p className="text-gray-300">Discover books, manga, and light novels curated for professional development</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-gradient-to-r from-white/10 to-blue-500/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 mb-8 border border-white/20 hover:shadow-cyan-500/25 hover:shadow-2xl transition-all duration-300">
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-200 mb-3">Search Library</label>
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search books, manga, light novels..."
              />
            </div>
            <div className="flex gap-3 flex-wrap">
              <Button
                variant="outline"
                onClick={() => setShowAdvancedSearch(true)}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border-white/30 text-white hover:text-cyan-300 shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm"
              >
                <Filter className="h-4 w-4" />
                Advanced
              </Button>

              {/* Card Style Selector */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/30 shadow-lg">
                <Select value={cardStyle} onValueChange={(value: any) => setCardStyle(value)}>
                  <SelectTrigger className="w-32 border-0 bg-transparent text-white font-medium">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900/95 backdrop-blur-lg border-white/20">
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="flip">Flip Cards</SelectItem>
                    <SelectItem value="glass">Glass</SelectItem>
                    <SelectItem value="manga">Manga</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex border border-white/30 rounded-lg bg-white/10 backdrop-blur-sm shadow-lg overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={`rounded-none ${viewMode === "grid" ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white" : "text-gray-300 hover:bg-white/20 hover:text-white"}`}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`rounded-none ${viewMode === "list" ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white" : "text-gray-300 hover:bg-white/20 hover:text-white"}`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20">
              <span className="text-sm font-semibold text-cyan-300 mr-2">Active filters:</span>
              {activeFilters.map((filter) => (
                <Badge
                  key={filter}
                  variant="secondary"
                  className="flex items-center gap-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-200 border-cyan-400/30 hover:bg-cyan-500/30 transition-colors backdrop-blur-sm"
                >
                  {filter}
                  <X className="h-3 w-3 cursor-pointer hover:text-cyan-100" onClick={() => removeFilter(filter)} />
                </Badge>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveFilters([])}
                className="text-cyan-300 hover:text-cyan-100 hover:bg-white/10"
              >
                Clear all
              </Button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-200">Genre</label>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/30 shadow-lg">
                <GenreFilter selectedGenre={selectedGenre} onGenreChange={setSelectedGenre} />
              </div>
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-200">Sort By</label>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/30 shadow-lg">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="border-0 text-gray-200 bg-transparent">
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900/95 backdrop-blur-lg border-white/20">
                    <SelectItem value="title">Title A-Z</SelectItem>
                    <SelectItem value="author">Author A-Z</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="trending">Trending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-200">Type</label>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/30 shadow-lg">
                <Select
                  onValueChange={(value) => {
                    /* handle book type filter */
                  }}
                >
                  <SelectTrigger className="border-0 text-gray-200 bg-transparent">
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900/95 backdrop-blur-lg border-white/20">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="novel">Novels</SelectItem>
                    <SelectItem value="manga">Manga</SelectItem>
                    <SelectItem value="light-novel">Light Novels</SelectItem>
                    <SelectItem value="comic">Comics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-300">
            Showing {books.length} {books.length === 1 ? "book" : "books"}
            {searchQuery && ` for "${searchQuery}"`}
            {selectedGenre && ` in ${selectedGenre}`}
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <SortAsc className="h-4 w-4" />
            Sorted by {sortBy}
          </div>
        </div>

        {/* Books Grid/List */}
        <BookGrid books={books} viewMode={viewMode} cardStyle={cardStyle} />

        {/* Load More */}
        {books.length > 0 && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border-white/30 text-white hover:bg-gradient-to-r hover:from-cyan-500/30 hover:to-blue-500/30 hover:text-cyan-100 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Load More Books
            </Button>
          </div>
        )}

        {/* Advanced Search Modal */}
        <AdvancedSearch
          isOpen={showAdvancedSearch}
          onClose={() => setShowAdvancedSearch(false)}
          onSearch={handleAdvancedSearch}
        />
      </div>
    </div>
  )
}
