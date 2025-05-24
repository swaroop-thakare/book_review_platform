"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const genres = [
  "Fantasy",
  "Non-Fiction",
  "Mystery",
  "Romance",
  "Science Fiction",
  "Manga",
  "Biography",
  "History",
  "Self-Help",
  "Business",
  "Technology",
  "Thriller",
  "Shonen",
  "Shojo",
  "Seinen",
  "Josei",
  "Isekai",
]

interface GenreFilterProps {
  selectedGenre: string
  onGenreChange: (genre: string) => void
}

export function GenreFilter({ selectedGenre, onGenreChange }: GenreFilterProps) {
  return (
    <Select value={selectedGenre || undefined} onValueChange={(value) => onGenreChange(value || "")}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="All Genres" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Genres</SelectItem>
        {genres.map((genre) => (
          <SelectItem key={genre} value={genre}>
            {genre}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
