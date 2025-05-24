import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Users, Star, TrendingUp } from "lucide-react"

export function StatsSection() {
  const stats = [
    {
      icon: BookOpen,
      value: "25,000+",
      label: "Books Available",
      description: "Curated collection of books, manga, and light novels",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      icon: Users,
      value: "50,000+",
      label: "Active Readers",
      description: "Growing community of passionate readers worldwide",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: Star,
      value: "4.9/5",
      label: "User Rating",
      description: "Consistently rated as the best reading platform",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: TrendingUp,
      value: "300%",
      label: "Growth Rate",
      description: "Year-over-year growth in user engagement",
      gradient: "from-indigo-500 to-purple-500",
    },
  ]

  return (
    <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4 lg:mb-6">
            Trusted by Thousands
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join a thriving community of readers and organizations transforming their learning culture
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="card-modern card-hover group">
              <CardContent className="p-6 lg:p-8 text-center">
                <div
                  className={`bg-gradient-to-r ${stat.gradient} w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}
                >
                  <stat.icon className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
                </div>
                <div className="text-3xl lg:text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-lg lg:text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  {stat.label}
                </div>
                <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
