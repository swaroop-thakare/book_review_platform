"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { BookOpen, User, LogOut, Menu, X, Building2, Users, BarChart3, Settings, Bell } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-2 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">ReadSphere</span>
              <span className="text-xs text-gray-500 block leading-none">Enterprise</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/books" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Library
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center"
            >
              <BarChart3 className="h-4 w-4 mr-1" />
              Dashboard
            </Link>
            <Link
              href="/teams"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center"
            >
              <Users className="h-4 w-4 mr-1" />
              Teams
            </Link>
            <Link
              href="/enterprise"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center"
            >
              <Building2 className="h-4 w-4 mr-1" />
              Enterprise
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    3
                  </span>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-9 w-9 rounded-full ring-2 ring-gray-200 hover:ring-blue-300 transition-all"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64">
                    <div className="px-3 py-3 border-b">
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                      <p className="text-xs text-blue-600 mt-1">Enterprise Admin</p>
                    </div>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Profile & Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="cursor-pointer">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-red-600 focus:text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" asChild className="font-medium">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button
                  asChild
                  className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
                >
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t bg-gray-50">
            <div className="flex flex-col space-y-3">
              <Link
                href="/books"
                className="text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-md hover:bg-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Library
              </Link>
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-md hover:bg-white transition-colors flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
              <Link
                href="/teams"
                className="text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-md hover:bg-white transition-colors flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Users className="h-4 w-4 mr-2" />
                Teams
              </Link>
              <Link
                href="/enterprise"
                className="text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-md hover:bg-white transition-colors flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Building2 className="h-4 w-4 mr-2" />
                Enterprise
              </Link>

              {user ? (
                <>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex items-center px-3 py-2 mb-2">
                      <Avatar className="h-8 w-8 mr-3">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-blue-100 text-blue-700">{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/profile"
                    className="text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-md hover:bg-white transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile & Settings
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={logout}
                    className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50 mx-3"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 border-t pt-3 mt-3">
                  <Button variant="ghost" asChild className="justify-start mx-3">
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button asChild className="mx-3 bg-gradient-to-r from-blue-600 to-indigo-700">
                    <Link href="/signup">Get Started</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
