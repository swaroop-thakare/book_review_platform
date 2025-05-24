"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Users,
  Plus,
  Search,
  MoreVertical,
  BookOpen,
  TrendingUp,
  Target,
  Crown,
  UserPlus,
  Settings,
} from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export default function TeamsPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")

  const teams = [
    {
      id: "1",
      name: "Engineering Team",
      description: "Software development and technical learning",
      memberCount: 24,
      booksRead: 156,
      avgRating: 4.3,
      isOwner: true,
      members: [
        { id: "1", name: "John Doe", avatar: "/placeholder.svg", role: "Team Lead" },
        { id: "2", name: "Jane Smith", avatar: "/placeholder.svg", role: "Senior Dev" },
        { id: "3", name: "Mike Johnson", avatar: "/placeholder.svg", role: "Developer" },
      ],
    },
    {
      id: "2",
      name: "Product Management",
      description: "Product strategy and user experience",
      memberCount: 12,
      booksRead: 89,
      avgRating: 4.5,
      isOwner: false,
      members: [
        { id: "4", name: "Sarah Wilson", avatar: "/placeholder.svg", role: "PM Lead" },
        { id: "5", name: "David Brown", avatar: "/placeholder.svg", role: "Product Manager" },
      ],
    },
    {
      id: "3",
      name: "Leadership Circle",
      description: "Executive leadership development",
      memberCount: 8,
      booksRead: 67,
      avgRating: 4.7,
      isOwner: false,
      members: [
        { id: "6", name: "Emily Davis", avatar: "/placeholder.svg", role: "CEO" },
        { id: "7", name: "Robert Taylor", avatar: "/placeholder.svg", role: "CTO" },
      ],
    },
  ]

  const recentActivity = [
    { team: "Engineering Team", action: "completed", book: "Clean Code", member: "John Doe", time: "2 hours ago" },
    { team: "Product Management", action: "started", book: "Inspired", member: "Sarah Wilson", time: "1 day ago" },
    { team: "Leadership Circle", action: "reviewed", book: "Good to Great", member: "Emily Davis", time: "2 days ago" },
  ]

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 pt-20 md:pt-24 flex items-center justify-center">
        <Card className="p-8 text-center bg-white/10 backdrop-blur-lg border border-white/20">
          <CardContent>
            <h2 className="text-2xl font-bold mb-4 text-white">Please sign in to access teams</h2>
            <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">
              Sign In
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Team Management</h1>
            <p className="text-gray-300">Collaborate with your teams and track learning progress</p>
          </div>
          <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Team
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-8 border border-white/20">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search teams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/30 text-white placeholder:text-gray-400"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                All Teams
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                My Teams
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Owned by Me
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Teams List */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-semibold text-white">Your Teams ({teams.length})</h2>

            {teams.map((team) => (
              <Card
                key={team.id}
                className="bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-lg text-white">{team.name}</CardTitle>
                        {team.isOwner && (
                          <Badge
                            variant="secondary"
                            className="text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0"
                          >
                            <Crown className="h-3 w-3 mr-1" />
                            Owner
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-300 text-sm">{team.description}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Users className="h-4 w-4 text-cyan-400 mr-1" />
                        <span className="font-semibold text-white">{team.memberCount}</span>
                      </div>
                      <p className="text-xs text-gray-400">Members</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <BookOpen className="h-4 w-4 text-emerald-400 mr-1" />
                        <span className="font-semibold text-white">{team.booksRead}</span>
                      </div>
                      <p className="text-xs text-gray-400">Books Read</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <TrendingUp className="h-4 w-4 text-purple-400 mr-1" />
                        <span className="font-semibold text-white">{team.avgRating}</span>
                      </div>
                      <p className="text-xs text-gray-400">Avg Rating</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {team.members.slice(0, 4).map((member) => (
                        <Avatar key={member.id} className="h-8 w-8 border-2 border-white/20">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                            {member.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {team.memberCount > 4 && (
                        <div className="h-8 w-8 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center">
                          <span className="text-xs text-gray-300">+{team.memberCount - 4}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                        <UserPlus className="h-4 w-4 mr-1" />
                        Invite
                      </Button>
                      <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                        <Settings className="h-4 w-4 mr-1" />
                        Manage
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Team Stats */}
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Target className="h-5 w-5 mr-2 text-cyan-400" />
                  Team Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Teams</span>
                  <span className="font-semibold text-white">{teams.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Members</span>
                  <span className="font-semibold text-white">
                    {teams.reduce((sum, team) => sum + team.memberCount, 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Books Read</span>
                  <span className="font-semibold text-white">
                    {teams.reduce((sum, team) => sum + team.booksRead, 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Teams Owned</span>
                  <span className="font-semibold text-white">{teams.filter((team) => team.isOwner).length}</span>
                </div>
              </CardContent>
            </Card>

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
                    <div key={index} className="text-sm">
                      <p className="text-white">
                        <span className="font-medium">{activity.member}</span> {activity.action}{" "}
                        <span className="font-medium">"{activity.book}"</span>
                      </p>
                      <p className="text-gray-400 text-xs">
                        {activity.team} • {activity.time}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start border-white/30 text-white hover:bg-white/10">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Team
                </Button>
                <Button variant="outline" className="w-full justify-start border-white/30 text-white hover:bg-white/10">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite Members
                </Button>
                <Button variant="outline" className="w-full justify-start border-white/30 text-white hover:bg-white/10">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Assign Reading
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
