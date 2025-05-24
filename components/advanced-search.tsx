"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, X, Star } from "lucide-react"

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void
  isOpen: boolean
  onClose: () => void
}

interface SearchFilters {
  query: string
  genres: string[]
  rating: number[]
  yearRange: number[]
  status: string
  sortBy: string
  bookType: string[]
}

export function AdvancedSearch({ onSearch, isOpen, onClose }: AdvancedSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    genres: [],
    rating: [0],
    yearRange: [1900, 2024],
    status: "all",
    sortBy: "relevance",
    bookType: [],
  })

  const genres = [
    "Manga",
    "Fantasy",
    "Sci-Fi",
    "Romance",
    "Thriller",
    "Mystery",
    "Non-Fiction",
    "Biography",
    "Self-Help",
    "Business",
    "History",
    "Science",
    "Shonen",
    "Shojo",
    "Seinen",
    "Josei",
    "Isekai",
    "Yaoi",
    "Yuri",
  ]

  const bookTypes = ["Novel", "Manga", "Light Novel", "Graphic Novel", "Comic", "Webtoon"]

  const handleGenreToggle = (genre: string) => {
    setFilters((prev) => ({
      ...prev,
      genres: prev.genres.includes(genre) ? prev.genres.filter((g) => g !== genre) : [...prev.genres, genre],
    }))
  }

  const handleBookTypeToggle = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      bookType: prev.bookType.includes(type) ? prev.bookType.filter((t) => t !== type) : [...prev.bookType, type],
    }))
  }

  const handleSearch = () => {
    onSearch(filters)
    onClose()
  }

  const clearFilters = () => {
    setFilters({
      query: "",
      genres: [],
      rating: [0],
      yearRange: [1900, 2024],
      status: "all",
      sortBy: "relevance",
      bookType: [],
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Advanced Search
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search Query */}
          <div>
            <label className="block text-sm font-medium mb-2">Search Query</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by title, author, ISBN..."
                value={filters.query}
                onChange={(e) => setFilters({ ...filters, query: e.target.value })}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Genres */}
            <div>
              <label className="block text-sm font-medium mb-3">Genres</label>
              <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                {genres.map((genre) => (
                  <Badge
                    key={genre}
                    variant={filters.genres.includes(genre) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-blue-100"
                    onClick={() => handleGenreToggle(genre)}
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Book Types */}
            <div>
              <label className="block text-sm font-medium mb-3">Book Types</label>
              <div className="space-y-2">
                {bookTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={type}
                      checked={filters.bookType.includes(type)}
                      onCheckedChange={() => handleBookTypeToggle(type)}
                    />
                    <label htmlFor={type} className="text-sm">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Minimum Rating: {filters.rating[0]} <Star className="inline h-4 w-4 fill-yellow-400 text-yellow-400" />
            </label>
            <Slider
              value={filters.rating}
              onValueChange={(value) => setFilters({ ...filters, rating: value })}
              max={5}
              min={0}
              step={0.5}
              className="w-full"
            />
          </div>

          {/* Year Range */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Publication Year: {filters.yearRange[0]} - {filters.yearRange[1]}
            </label>
            <Slider
              value={filters.yearRange}
              onValueChange={(value) => setFilters({ ...filters, yearRange: value })}
              max={2024}
              min={1900}
              step={1}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="hiatus">On Hiatus</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium mb-2">Sort By</label>
              <Select value={filters.sortBy} onValueChange={(value) => setFilters({ ...filters, sortBy: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by relevance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="title">Title A-Z</SelectItem>
                  <SelectItem value="author">Author A-Z</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button onClick={handleSearch} className="flex-1">
              <Search className="h-4 w-4 mr-2" />
              Search Books
            </Button>
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
