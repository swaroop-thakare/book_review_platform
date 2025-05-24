"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, TrendingUp, Target, Calendar, Star } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import Link from "next/link"

export default function DashboardPage() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 pt-20 md:pt-24 flex items-center justify-center">
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="text-center relative z-10">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
            <h1 className="text-2xl font-bold mb-4 text-white">Please sign in to access your dashboard</h1>
            <Button
              asChild
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
            >
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const stats = [
    { title: "Books Read", value: "12", icon: BookOpen, change: "+3 this month", color: "from-cyan-500 to-blue-500" },
    { title: "Team Members", value: "24", icon: Users, change: "+2 new", color: "from-emerald-500 to-teal-500" },
    {
      title: "Reading Goal",
      value: "75%",
      icon: Target,
      change: "15 of 20 books",
      color: "from-purple-500 to-pink-500",
    },
    { title: "Avg Rating", value: "4.6", icon: Star, change: "+0.2 this month", color: "from-amber-500 to-orange-500" },
  ]

  const recentActivity = [
    { action: "Completed", book: "Atomic Habits", time: "2 hours ago" },
    { action: "Started", book: "The Lean Startup", time: "1 day ago" },
    { action: "Reviewed", book: "Good to Great", time: "3 days ago" },
    { action: "Added to list", book: "Thinking, Fast and Slow", time: "1 week ago" },
  ]

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
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user.name}!</h1>
          <p className="text-gray-300">Here's your learning progress and team insights</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-300">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-cyan-300">{stat.change}</p>
                  </div>
                  <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-full shadow-lg`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <TrendingUp className="h-5 w-5 mr-2 text-cyan-400" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-white/10 last:border-b-0"
                  >
                    <div>
                      <p className="font-medium text-white">
                        {activity.action} "{activity.book}"
                      </p>
                      <p className="text-sm text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Calendar className="h-5 w-5 mr-2 text-cyan-400" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                asChild
                className="w-full justify-start bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
              >
                <Link href="/books">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse Library
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start border-white/30 text-white hover:bg-white/10"
              >
                <Link href="/teams">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Team
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start border-white/30 text-white hover:bg-white/10"
              >
                <Link href="/profile">
                  <Target className="h-4 w-4 mr-2" />
                  Set Reading Goals
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
