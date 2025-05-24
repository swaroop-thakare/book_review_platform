import { Button } from "@/components/ui/button"
import { Search, BookOpen, Building2, Users, BarChart3, Shield, Zap, Globe, ArrowRight } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-24 px-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />

      {/* Background Image */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&h=1080&fit=crop&crop=center')",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-500/10 border border-blue-400/20 rounded-full px-6 py-3 mb-8">
            <Building2 className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">ReadSphere Enterprise Platform</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Transform Your Team's
            <br />
            <span className="text-blue-300">Learning Journey</span>
          </h1>

          <p className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto text-blue-100 leading-relaxed">
            Empower your organization with intelligent book recommendations, collaborative reviews, and data-driven
            insights. Build a culture of continuous learning with ReadSphere Enterprise.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-900 hover:bg-blue-50 font-semibold px-10 py-4 text-lg h-auto"
            >
              <Link href="/books">
                <Search className="mr-3 h-6 w-6" />
                Explore Library
                <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/50 bg-white/10 text-white hover:bg-white/20 hover:border-white/70 font-semibold px-10 py-4 text-lg h-auto backdrop-blur-sm"
            >
              <Link href="/demo">
                <Building2 className="mr-3 h-6 w-6" />
                Request Demo
              </Link>
            </Button>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300 group">
            <div className="bg-blue-500/20 w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BookOpen className="h-7 w-7 text-blue-300" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Curated Library</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Access thousands of professional development books with AI-powered recommendations tailored to your
              industry
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300 group">
            <div className="bg-green-500/20 w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users className="h-7 w-7 text-green-300" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Team Collaboration</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Foster knowledge sharing through team reviews, reading groups, and collaborative learning initiatives
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300 group">
            <div className="bg-purple-500/20 w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BarChart3 className="h-7 w-7 text-purple-300" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Analytics & Insights</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Track reading progress and measure learning impact across your organization with detailed analytics
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300 group">
            <div className="bg-orange-500/20 w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Shield className="h-7 w-7 text-orange-300" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Enterprise Security</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              SOC 2 compliant with advanced security features, SSO integration, and comprehensive admin controls
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300 group">
            <div className="bg-cyan-500/20 w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="h-7 w-7 text-cyan-300" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Smart Recommendations</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              AI-driven book suggestions based on role, interests, learning goals, and team objectives
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300 group">
            <div className="bg-pink-500/20 w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Globe className="h-7 w-7 text-pink-300" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Global Access</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Multi-language support with content available worldwide and 24/7 customer support
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
