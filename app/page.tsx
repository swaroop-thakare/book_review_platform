import { ModernHeroSection } from "@/components/modern-hero-section"
import { FeaturedBooks } from "@/components/featured-books"
import { StatsSection } from "@/components/stats-section"
import { GenreShowcase } from "@/components/genre-showcase"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-dark">
      <ModernHeroSection />
      <StatsSection />
      <FeaturedBooks />
      <GenreShowcase />
      <TestimonialsSection />
      <CTASection />
    </div>
  )
}
