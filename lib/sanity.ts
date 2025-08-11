// Mock Sanity functions for development
// Replace with actual Sanity client when CMS is implemented

export interface Service {
  _id: string
  title: string
  description: string
  image: string
  slug: {
    current: string
  }
}

export async function getServices(): Promise<Service[]> {
  // Mock data for services - replace with actual Sanity query later
  return [
    {
      _id: "1",
      title: "Performance Marketing",
      description:
        "Data-driven marketing strategies that deliver measurable results and maximize your ROI through targeted campaigns and optimization.",
      image: "/placeholder.svg?height=192&width=384&text=Performance+Marketing",
      slug: {
        current: "performance-marketing",
      },
    },
    {
      _id: "2",
      title: "Automation & AI Workflows",
      description:
        "Streamline your business processes with intelligent automation solutions that save time and reduce manual work.",
      image: "/placeholder.svg?height=192&width=384&text=AI+Automation",
      slug: {
        current: "automation-ai-workflows",
      },
    },
    {
      _id: "3",
      title: "Tracking & Attribution",
      description:
        "Advanced analytics and attribution modeling to understand your customer journey and optimize marketing spend.",
      image: "/placeholder.svg?height=192&width=384&text=Analytics+Dashboard",
      slug: {
        current: "tracking-attribution",
      },
    },
  ]
}
