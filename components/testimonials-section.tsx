import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "VP of Learning & Development",
      company: "TechCorp Inc.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      content:
        "ReadSphere has revolutionized how our teams approach professional development. The analytics help us track real learning outcomes.",
      rating: 5,
    },
    {
      name: "Michael Rodriguez",
      role: "Chief People Officer",
      company: "Innovation Labs",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      content:
        "The collaborative features have created a genuine learning culture. Our employee engagement scores have increased by 40%.",
      rating: 5,
    },
    {
      name: "Emily Johnson",
      role: "Head of HR",
      company: "Global Solutions",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      content:
        "Implementation was seamless, and the ROI was evident within the first quarter. Our teams are more knowledgeable and motivated.",
      rating: 5,
    },
  ]

  return (
    <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4 lg:mb-6">
            What Our Clients Say
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Hear from leaders who have transformed their organizations with ReadSphere Enterprise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-modern card-hover h-full">
              <CardContent className="p-6 lg:p-8 h-full flex flex-col">
                <div className="flex items-center mb-4 lg:mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-gray-700 dark:text-gray-300 mb-6 lg:mb-8 italic text-base lg:text-lg leading-relaxed flex-grow">
                  "{testimonial.content}"
                </blockquote>
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 lg:h-14 lg:w-14 mr-4">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-gradient-primary text-white font-semibold">
                      {testimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white text-base lg:text-lg">
                      {testimonial.name}
                    </div>
                    <div className="text-sm lg:text-base text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                    <div className="text-sm lg:text-base text-indigo-600 dark:text-indigo-400 font-medium">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
