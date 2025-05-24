import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Users } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-dark">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-white mb-4 lg:mb-6">
          Ready to Transform Your Learning?
        </h2>
        <p className="text-lg lg:text-xl text-gray-300 mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
          Join thousands of organizations already using ReadSphere to build stronger, more knowledgeable teams. Start
          your journey today.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center mb-8 lg:mb-12">
          <Button
            asChild
            size="lg"
            className="btn-primary text-base lg:text-lg px-8 lg:px-10 py-4 lg:py-6 h-auto rounded-2xl group"
          >
            <Link href="/signup">
              <Users className="mr-2 lg:mr-3 h-5 w-5 lg:h-6 lg:w-6" />
              Start Free Trial
              <ArrowRight className="ml-2 lg:ml-3 h-4 w-4 lg:h-5 lg:w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="btn-glass text-base lg:text-lg px-8 lg:px-10 py-4 lg:py-6 h-auto rounded-2xl"
          >
            <Link href="/books">
              <BookOpen className="mr-2 lg:mr-3 h-5 w-5 lg:h-6 lg:w-6" />
              Browse Library
            </Link>
          </Button>
        </div>

        <p className="text-sm lg:text-base text-gray-400">
          No credit card required • 14-day free trial • Cancel anytime
        </p>
      </div>
    </section>
  )
}
