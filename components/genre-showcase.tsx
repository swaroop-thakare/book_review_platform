"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Sparkles, Heart, Zap, Crown, Sword } from "lucide-react"
import Link from "next/link"

export function GenreShowcase() {
  const genres = [
    {
      name: "Manga",
      icon: Sparkles,
      color: "from-pink-500 to-purple-600",
      bgColor: "bg-gradient-to-br from-pink-100 to-purple-100",
      iconColor: "text-pink-600",
      count: "2,500+",
      description: "Japanese comics and graphic novels",
      subgenres: ["Shonen", "Shojo", "Seinen", "Josei", "Isekai"],
    },
    {
      name: "Fantasy",
      icon: Crown,
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-gradient-to-br from-purple-100 to-indigo-100",
      iconColor: "text-purple-600",
      count: "3,200+",
      description: "Epic adventures and magical worlds",
      subgenres: ["Epic Fantasy", "Urban Fantasy", "Dark Fantasy", "YA Fantasy"],
    },
    {
      name: "Sci-Fi",
      icon: Zap,
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-gradient-to-br from-blue-100 to-cyan-100",
      iconColor: "text-blue-600",
      count: "1,800+",
      description: "Future technology and space exploration",
      subgenres: ["Space Opera", "Cyberpunk", "Dystopian", "Hard Sci-Fi"],
    },
    {
      name: "Romance",
      icon: Heart,
      color: "from-red-500 to-pink-600",
      bgColor: "bg-gradient-to-br from-red-100 to-pink-100",
      iconColor: "text-red-600",
      count: "2,100+",
      description: "Love stories and relationships",
      subgenres: ["Contemporary", "Historical", "Paranormal", "YA Romance"],
    },
    {
      name: "Thriller",
      icon: Sword,
      color: "from-slate-600 to-indigo-700",
      bgColor: "bg-gradient-to-br from-slate-100 to-indigo-100",
      iconColor: "text-slate-700",
      count: "1,500+",
      description: "Suspense and mystery adventures",
      subgenres: ["Psychological", "Crime", "Legal", "Medical"],
    },
    {
      name: "Non-Fiction",
      icon: BookOpen,
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-gradient-to-br from-emerald-100 to-teal-100",
      iconColor: "text-emerald-600",
      count: "4,000+",
      description: "Real-world knowledge and insights",
      subgenres: ["Business", "Self-Help", "Biography", "Science"],
    },
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Explore Every Genre</h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            From manga and light novels to business books and thrillers - discover your next favorite read across all
            genres
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {genres.map((genre, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/20 overflow-hidden bg-white/10 backdrop-blur-md shadow-lg"
            >
              <div className={`h-2 bg-gradient-to-r ${genre.color}`} />
              <CardContent className="p-8 bg-white rounded-b-lg">
                <div
                  className={`${genre.bgColor} w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-md`}
                >
                  <genre.icon className={`h-8 w-8 ${genre.iconColor}`} />
                </div>

                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold text-gray-900">{genre.name}</h3>
                  <Badge variant="secondary" className="text-sm bg-gray-100 text-gray-700">
                    {genre.count}
                  </Badge>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">{genre.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {genre.subgenres.map((subgenre) => (
                    <Badge
                      key={subgenre}
                      variant="outline"
                      className="text-xs border-gray-300 text-gray-600 hover:bg-gray-50"
                    >
                      {subgenre}
                    </Badge>
                  ))}
                </div>

                <Button
                  asChild
                  className={`w-full group-hover:scale-105 transition-transform bg-gradient-to-r ${genre.color} hover:shadow-lg text-white border-0`}
                >
                  <Link href={`/books?genre=${genre.name}`}>
                    Explore {genre.name}
                    <BookOpen className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline">
            <Link href="/books">
              Browse All Books
              <BookOpen className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
