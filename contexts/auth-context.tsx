"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User } from "@/types/user"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        // TODO: Check for existing JWT token and validate
        const token = localStorage.getItem("auth_token")
        if (token) {
          // Simulate token validation
          const mockUser: User = {
            id: "1",
            name: "John Doe",
            email: "john.doe@company.com",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
            bio: "VP of Learning & Development at TechCorp Inc. Passionate about building learning cultures and professional development.",
            reviewCount: 15,
            booksRead: 42,
            createdAt: "2024-01-01",
            updatedAt: "2024-01-01",
          }
          setUser(mockUser)
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        localStorage.removeItem("auth_token")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // TODO: Implement actual login logic
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful login
      const mockUser: User = {
        id: "1",
        name: "John Doe",
        email: email,
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        bio: "VP of Learning & Development at TechCorp Inc.",
        reviewCount: 15,
        booksRead: 42,
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01",
      }

      localStorage.setItem("auth_token", "mock_jwt_token")
      setUser(mockUser)
    } catch (error) {
      throw new Error("Invalid credentials")
    }
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Export the context for use in other hooks
export { AuthContext }
