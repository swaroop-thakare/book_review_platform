import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Sparkles, Camera, Palette } from "lucide-react"

export function ImageSourcesGuide() {
  const freeSources = [
    {
      name: "Unsplash",
      url: "https://unsplash.com",
      description: "High-quality photos for books, people, and backgrounds",
      category: "Photography",
      icon: Camera,
    },
    {
      name: "Pexels",
      url: "https://pexels.com",
      description: "Free stock photos and videos",
      category: "Photography",
      icon: Camera,
    },
    {
      name: "Pixabay",
      url: "https://pixabay.com",
      description: "Free images, vectors, and illustrations",
      category: "Mixed",
      icon: Palette,
    },
  ]

  const aiTools = [
    {
      name: "DALL-E 3",
      url: "https://openai.com/dall-e-3",
      description: "Generate book covers and illustrations",
      category: "AI Generation",
      icon: Sparkles,
    },
    {
      name: "Midjourney",
      url: "https://midjourney.com",
      description: "Create artistic book covers and character art",
      category: "AI Generation",
      icon: Sparkles,
    },
    {
      name: "Stable Diffusion",
      url: "https://stability.ai",
      description: "Open-source AI image generation",
      category: "AI Generation",
      icon: Sparkles,
    },
  ]

  const bookCoverPrompts = [
    "Modern minimalist book cover with geometric shapes and typography",
    "Vintage library with old books and warm lighting",
    "Futuristic digital library with holographic books",
    "Cozy reading nook with books and coffee",
    "Abstract representation of knowledge and learning",
    "Manga-style illustration with vibrant colors",
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Free Image Sources & AI Tools</h1>
        <p className="text-gray-600">Resources for adding high-quality images to your book review platform</p>
      </div>

      {/* Free Stock Photo Sources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Camera className="h-5 w-5 mr-2" />
            Free Stock Photo Sources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {freeSources.map((source, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{source.name}</h3>
                  <Badge variant="outline">{source.category}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{source.description}</p>
                <Button asChild size="sm" variant="outline" className="w-full">
                  <a href={source.url} target="_blank" rel="noopener noreferrer">
                    Visit Site <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Image Generation Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="h-5 w-5 mr-2" />
            AI Image Generation Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiTools.map((tool, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{tool.name}</h3>
                  <Badge variant="secondary">{tool.category}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{tool.description}</p>
                <Button asChild size="sm" variant="outline" className="w-full">
                  <a href={tool.url} target="_blank" rel="noopener noreferrer">
                    Learn More <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Prompts for Book Covers */}
      <Card>
        <CardHeader>
          <CardTitle>AI Prompts for Book Covers & Illustrations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {bookCoverPrompts.map((prompt, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm font-mono">{prompt}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Pro Tips:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Add "high quality, 4K, professional" to your prompts</li>
              <li>• Specify aspect ratios like "3:4 aspect ratio" for book covers</li>
              <li>• Use style keywords like "minimalist", "vintage", or "modern"</li>
              <li>• For manga covers, try "anime style, vibrant colors, dynamic composition"</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Current Implementation */}
      <Card>
        <CardHeader>
          <CardTitle>Current Image Implementation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            The platform currently uses Unsplash images with specific parameters for consistency:
          </p>
          <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm">
            <p>Book covers: https://images.unsplash.com/photo-ID?w=300&h=400&fit=crop&crop=center</p>
            <p>User avatars: https://images.unsplash.com/photo-ID?w=100&h=100&fit=crop&crop=face</p>
            <p>Backgrounds: https://images.unsplash.com/photo-ID?w=1920&h=1080&fit=crop&crop=center</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
