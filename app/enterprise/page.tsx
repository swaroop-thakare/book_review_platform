"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, BarChart3, Shield, Zap, Globe, Check, ArrowRight, Calendar, Phone, Mail } from "lucide-react"
import Link from "next/link"

export default function EnterprisePage() {
  const features = [
    {
      icon: Building2,
      title: "Enterprise SSO",
      description: "Seamless integration with your existing identity providers including SAML, LDAP, and OAuth.",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      icon: Shield,
      title: "Advanced Security",
      description: "SOC 2 Type II compliant with enterprise-grade security, encryption, and audit trails.",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: Users,
      title: "Team Management",
      description: "Organize teams, assign roles, and manage permissions across your entire organization.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Comprehensive reporting and insights into reading habits, engagement, and learning outcomes.",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: Zap,
      title: "API Integration",
      description: "RESTful APIs and webhooks for seamless integration with your existing learning platforms.",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      icon: Globe,
      title: "Global Deployment",
      description: "Multi-region deployment with 99.9% uptime SLA and 24/7 enterprise support.",
      gradient: "from-rose-500 to-pink-500",
    },
  ]

  const plans = [
    {
      name: "Professional",
      price: "$15",
      period: "per user/month",
      description: "Perfect for growing teams",
      features: ["Up to 100 users", "Basic analytics", "Email support", "Standard integrations", "Mobile apps"],
      popular: false,
    },
    {
      name: "Enterprise",
      price: "$35",
      period: "per user/month",
      description: "For large organizations",
      features: [
        "Unlimited users",
        "Advanced analytics",
        "Priority support",
        "Custom integrations",
        "SSO & SAML",
        "Dedicated CSM",
        "SLA guarantee",
      ],
      popular: true,
    },
    {
      name: "Enterprise Plus",
      price: "Custom",
      period: "pricing",
      description: "Tailored for your needs",
      features: [
        "Everything in Enterprise",
        "Custom development",
        "On-premise deployment",
        "White-label solution",
        "24/7 phone support",
        "Training & onboarding",
      ],
      popular: false,
    },
  ]

  const testimonials = [
    {
      quote:
        "ReadSphere has transformed how our 5,000+ employees approach professional development. The ROI was evident within the first quarter.",
      author: "Sarah Chen",
      role: "Chief Learning Officer",
      company: "TechGlobal Inc.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      quote:
        "The analytics dashboard gives us unprecedented insights into our team's learning patterns and helps us make data-driven decisions.",
      author: "Michael Rodriguez",
      role: "VP of People Operations",
      company: "Innovation Labs",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  const stats = [
    { value: "500+", label: "Enterprise Clients" },
    { value: "2M+", label: "Active Users" },
    { value: "99.9%", label: "Uptime SLA" },
    { value: "24/7", label: "Support" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 pt-20 md:pt-24">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0 mb-6 px-4 py-2">
              Enterprise Solution
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Scale Learning Across Your
              <span className="block text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">
                Entire Organization
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-300">
              ReadSphere Enterprise provides the tools, security, and support needed to transform learning culture at
              organizations of any size.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 px-8 py-4 text-lg"
              >
                <Link href="/demo">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg"
              >
                <Link href="/contact">
                  <Phone className="mr-2 h-5 w-5" />
                  Contact Sales
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-cyan-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Enterprise-Grade Features</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built for the security, scalability, and compliance requirements of large organizations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <CardHeader>
                  <div
                    className={`bg-gradient-to-r ${feature.gradient} w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-lg`}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Choose Your Enterprise Plan</h2>
            <p className="text-xl text-gray-300">Flexible pricing that scales with your organization</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative bg-white/10 backdrop-blur-lg border border-white/20 ${plan.popular ? "ring-2 ring-cyan-500 shadow-2xl shadow-cyan-500/25" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-300 ml-2">{plan.period}</span>
                  </div>
                  <p className="text-gray-300 mt-2">{plan.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-5 w-5 text-emerald-400 mr-3 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full mt-8 ${plan.popular ? "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700" : "border-white/30 text-white hover:bg-white/10"}`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.name === "Enterprise Plus" ? "Contact Sales" : "Start Free Trial"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Organization?</h2>
          <p className="text-xl text-gray-300 mb-10">
            Join hundreds of leading companies that have revolutionized their learning culture with ReadSphere
            Enterprise.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 px-8 py-4 text-lg"
            >
              <Link href="/demo">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Demo
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg"
            >
              <Link href="/contact">
                <Mail className="mr-2 h-5 w-5" />
                Contact Sales
              </Link>
            </Button>
          </div>

          <div className="text-cyan-300 text-sm">
            <p>✓ 30-day free trial • ✓ No setup fees • ✓ Cancel anytime</p>
          </div>
        </div>
      </section>
    </div>
  )
}
