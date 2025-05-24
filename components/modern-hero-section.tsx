import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  BookOpen,
  Building2,
  Users,
  BarChart3,
  Shield,
  Zap,
  Globe,
  ArrowRight,
  Sparkles,
  Star,
  Play,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

export function ModernHeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-dark overflow-hidden pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating orbs with vibrant colors */}
        <div className="absolute top-32 left-10 w-72 h-72 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        />
        <div
          className="absolute top-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-pink-500/15 to-rose-500/15 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "6s" }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(79, 70, 229, 0.1) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Hero Content */}
        <div className="text-center mb-16 lg:mb-20">
          {/* Floating Badge */}
          <div className="inline-flex items-center glass rounded-full px-6 lg:px-8 py-3 lg:py-4 mb-6 lg:mb-8 animate-scale-in">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-pulse" />
              <Building2 className="h-4 w-4 lg:h-5 lg:w-5 mr-2 text-indigo-400" />
              <span className="text-xs lg:text-sm font-medium text-white">ReadSphere Enterprise Platform</span>
              <Sparkles className="h-3 w-3 lg:h-4 lg:w-4 ml-2 text-yellow-400 animate-pulse" />
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-8xl xl:text-9xl font-bold mb-6 lg:mb-8 leading-none animate-slide-up">
            <span className="text-white">Transform Your</span>
            <br />
            <span className="text-gradient-primary">Learning Journey</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg sm:text-xl lg:text-2xl xl:text-3xl mb-8 lg:mb-12 max-w-5xl mx-auto text-gray-300 leading-relaxed font-body animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            Discover books, manga, and light novels with{" "}
            <span className="text-indigo-400 font-semibold">AI-powered recommendations</span>. Build a culture of
            continuous learning with <span className="text-cyan-400 font-semibold">collaborative reviews</span> and{" "}
            <span className="text-emerald-400 font-semibold">data-driven insights</span>.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center mb-12 lg:mb-16 animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Button
              asChild
              size="lg"
              className="btn-primary text-base lg:text-lg px-8 lg:px-10 py-4 lg:py-6 h-auto rounded-2xl group shadow-2xl"
            >
              <Link href="/books">
                <Search className="mr-2 lg:mr-3 h-5 w-5 lg:h-6 lg:w-6 group-hover:rotate-12 transition-transform duration-300" />
                Explore Library
                <ArrowRight className="ml-2 lg:ml-3 h-4 w-4 lg:h-5 lg:w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="btn-glass text-base lg:text-lg px-8 lg:px-10 py-4 lg:py-6 h-auto rounded-2xl group"
            >
              <Link href="/demo">
                <Play className="mr-2 lg:mr-3 h-5 w-5 lg:h-6 lg:w-6 group-hover:scale-110 transition-transform duration-300" />
                Watch Demo
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div
            className="flex flex-wrap justify-center gap-4 lg:gap-8 mb-16 lg:mb-20 animate-slide-up"
            style={{ animationDelay: "0.6s" }}
          >
            {[
              { icon: Star, text: "4.9/5 Rating", color: "text-yellow-400" },
              { icon: Users, text: "50,000+ Users", color: "text-cyan-400" },
              { icon: BookOpen, text: "25,000+ Books", color: "text-emerald-400" },
              { icon: TrendingUp, text: "300% Growth", color: "text-indigo-400" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 lg:gap-3 glass rounded-full px-4 lg:px-6 py-2 lg:py-3 hover:scale-105 transition-transform duration-300"
              >
                <item.icon className={`h-4 w-4 lg:h-5 lg:w-5 ${item.color}`} />
                <span className="text-xs lg:text-sm font-medium text-white">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {[
            {
              icon: BookOpen,
              title: "AI-Curated Library",
              description:
                "Smart recommendations powered by machine learning algorithms that understand your reading preferences and team goals",
              gradient: "from-cyan-500 to-blue-500",
              delay: "0.8s",
            },
            {
              icon: Users,
              title: "Team Collaboration",
              description:
                "Real-time collaboration tools with shared reading lists, team discussions, and knowledge sharing features",
              gradient: "from-emerald-500 to-teal-500",
              delay: "1.0s",
            },
            {
              icon: BarChart3,
              title: "Advanced Analytics",
              description:
                "Comprehensive insights into reading patterns, learning outcomes, and team engagement metrics",
              gradient: "from-indigo-500 to-purple-500",
              delay: "1.2s",
            },
            {
              icon: Shield,
              title: "Enterprise Security",
              description:
                "Bank-level security with SOC 2 compliance, SSO integration, and advanced permission controls",
              gradient: "from-rose-500 to-pink-500",
              delay: "1.4s",
            },
            {
              icon: Zap,
              title: "Smart Automation",
              description: "Automated workflows for book recommendations, progress tracking, and team notifications",
              gradient: "from-amber-500 to-orange-500",
              delay: "1.6s",
            },
            {
              icon: Globe,
              title: "Global Platform",
              description: "Multi-language support with content from around the world and 24/7 premium support",
              gradient: "from-violet-500 to-purple-500",
              delay: "1.8s",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-6 lg:p-8 group hover:scale-105 transition-all duration-500 animate-slide-up"
              style={{ animationDelay: feature.delay }}
            >
              <div
                className={`bg-gradient-to-r ${feature.gradient} w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 lg:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}
              >
                <feature.icon className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
              </div>
              <h3 className="font-display text-xl lg:text-2xl font-semibold mb-3 lg:mb-4 text-white group-hover:text-indigo-300 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-sm lg:text-base leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 lg:mt-24 animate-slide-up" style={{ animationDelay: "2.0s" }}>
          <Badge className="bg-gradient-primary text-white border-0 px-4 lg:px-6 py-2 mb-6 lg:mb-8 text-sm lg:text-lg rounded-full shadow-lg">
            ✨ Join 500+ Enterprise Clients Worldwide
          </Badge>
          <p className="text-gray-400 text-base lg:text-lg mb-6 lg:mb-8">
            Trusted by leading organizations across 50+ countries
          </p>

          {/* Company logos */}
          <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-8 opacity-50">
            {["Microsoft", "Google", "Amazon", "Meta", "Apple"].map((company, index) => (
              <div key={index} className="glass rounded-lg px-4 lg:px-6 py-2 lg:py-3">
                <span className="text-white font-semibold text-sm lg:text-base">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
