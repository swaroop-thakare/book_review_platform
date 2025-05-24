"use client"

import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  BookOpen,
  User,
  LogOut,
  Menu,
  X,
  Building2,
  Users,
  BarChart3,
  Settings,
  Bell,
  Sparkles,
  Moon,
  Sun,
  Search,
} from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export function ModernNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-strong backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20 py-3 md:py-4">
          {/* Logo - Fixed positioning to prevent overlap */}
          <Link href="/" className="flex items-center space-x-2 md:space-x-3 group flex-shrink-0 z-10 min-w-0">
            <div className="relative">
              <div className="bg-gradient-primary p-2.5 md:p-3 rounded-xl md:rounded-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg relative z-20">
                <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-emerald-400 rounded-full animate-pulse" />
            </div>
            <div className="hidden sm:block">
              <span className="text-lg md:text-2xl font-display font-bold text-white group-hover:text-indigo-300 transition-colors duration-300">
                ReadSphere
              </span>
              <div className="flex items-center gap-1">
                <span className="text-xs text-indigo-400 font-medium">Enterprise</span>
                <Sparkles className="h-3 w-3 text-yellow-400 animate-pulse" />
              </div>
            </div>
          </Link>

          {/* Desktop Navigation - Proper spacing */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 flex-shrink-0">
            {[
              { href: "/books", label: "Library", icon: Search },
              { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
              { href: "/teams", label: "Teams", icon: Users },
              { href: "/enterprise", label: "Enterprise", icon: Building2 },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-2 text-gray-300 hover:text-white font-medium transition-all duration-300 px-3 py-2 rounded-xl hover:bg-white/10"
              >
                <item.icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm">{item.label}</span>
              </Link>
            ))}

            {user ? (
              <div className="flex items-center space-x-3">
                {/* Search Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-300 hover:text-white hover:bg-white/10 rounded-full p-2.5"
                >
                  <Search className="h-4 w-4" />
                </Button>

                {/* Dark Mode Toggle */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleDarkMode}
                  className="text-gray-300 hover:text-white hover:bg-white/10 rounded-full p-2.5"
                >
                  {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>

                {/* Notifications */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative text-gray-300 hover:text-white hover:bg-white/10 rounded-full p-2.5"
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 bg-gradient-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
                    3
                  </span>
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-full ring-2 ring-indigo-500/50 hover:ring-indigo-400 transition-all duration-300 hover:scale-105"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gradient-primary text-white font-semibold text-sm">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 glass border-white/20 rounded-2xl p-2">
                    <div className="px-4 py-4 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-gradient-primary text-white text-sm">
                            {user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-white text-sm">{user.name}</p>
                          <p className="text-xs text-gray-400">{user.email}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-xs text-indigo-400">Enterprise Admin</span>
                            <Sparkles className="h-3 w-3 text-yellow-400" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {[
                      { icon: User, label: "Profile & Settings", href: "/profile" },
                      { icon: BarChart3, label: "Dashboard", href: "/dashboard" },
                      { icon: Settings, label: "Admin Panel", href: "/admin" },
                    ].map((item) => (
                      <DropdownMenuItem
                        key={item.href}
                        asChild
                        className="text-gray-300 hover:text-white hover:bg-white/10 rounded-xl m-1"
                      >
                        <Link href={item.href} className="cursor-pointer flex items-center gap-3 px-3 py-2">
                          <item.icon className="h-4 w-4" />
                          <span className="text-sm">{item.label}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}

                    <DropdownMenuSeparator className="bg-white/10 my-2" />
                    <DropdownMenuItem
                      onClick={logout}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl m-1 cursor-pointer flex items-center gap-3 px-3 py-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="text-sm">Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  asChild
                  className="font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-xl px-4 py-2"
                >
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild className="btn-primary rounded-xl px-6 py-2">
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="text-gray-300 hover:text-white hover:bg-white/10 rounded-full p-2"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white hover:bg-white/10 rounded-full p-2"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 glass-strong rounded-2xl mt-4 mx-2 animate-scale-in">
            <div className="flex flex-col space-y-2 px-4">
              {[
                { href: "/books", label: "Library", icon: Search },
                { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
                { href: "/teams", label: "Teams", icon: Users },
                { href: "/enterprise", label: "Enterprise", icon: Building2 },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-300 hover:text-white font-medium px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              ))}

              {user ? (
                <>
                  <div className="border-t border-white/10 pt-4 mt-4">
                    <div className="flex items-center px-4 py-3 mb-2 bg-white/5 rounded-xl">
                      <Avatar className="h-8 w-8 mr-3">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gradient-primary text-white text-sm">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-white text-sm">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/profile"
                    className="text-gray-300 hover:text-white font-medium px-4 py-3 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-3"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    <span className="text-sm">Profile & Settings</span>
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={logout}
                    className="justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10 mx-4 rounded-xl"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    <span className="text-sm">Sign Out</span>
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 border-t border-white/10 pt-4 mt-4">
                  <Button
                    variant="ghost"
                    asChild
                    className="justify-start mx-4 text-gray-300 hover:text-white rounded-xl"
                  >
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button asChild className="mx-4 btn-primary rounded-xl">
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
