import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ModernNavbar } from "@/components/modern-navbar"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "ReadSphere Enterprise - Transform Your Organization's Learning",
  description:
    "Empower your teams with intelligent book recommendations, collaborative reviews, and data-driven insights. Build a culture of continuous learning with ReadSphere Enterprise.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-body antialiased bg-background text-foreground">
        <AuthProvider>
          <ModernNavbar />
          <main className="relative min-h-screen">{children}</main>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
