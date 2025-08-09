import Image from "next/image"
import { Rocket, Bot, Target, Shield, Brain } from "lucide-react"
import type { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Learn about Nathan O'Connor's 20+ years of experience in performance marketing, automation, and privacy-first data strategies. Discover my 5 pillars for smarter growth.",
  alternates: {
    canonical: `${BASE_URL}/about-me`,
  },
  openGraph: {
    title: "About Nathan O'Connor | Digital Marketing & AI Expertise",
    description:
      "Learn about Nathan O'Connor's 20+ years of experience in performance marketing, automation, and privacy-first data strategies. Discover my 5 pillars for smarter growth.",
    url: `${BASE_URL}/about-me`,
    siteName: "Nathan O'Connor",
    images: [
      {
        url: `${BASE_URL}/about-photo.png`,
        width: 400,
        height: 500,
        alt: "Nathan O'Connor",
      },
    ],
    locale: "en_GB",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Nathan O'Connor | Digital Marketing & AI Expertise",
    description:
      "Learn about Nathan O'Connor's 20+ years of experience in performance marketing, automation, and privacy-first data strategies. Discover my 5 pillars for smarter growth.",
    creator: "@yourtwitterhandle",
    images: [`${BASE_URL}/about-photo.png`],
  },
}

export default function AboutPage() {
  const pillars = [
    {
      id: 1,
      title: "Performance Marketing",
      description:
        "Maximise every click. Scale what works. Cut what doesn't. Whether you're running Google Ads, Performance Max, or YouTube campaigns, I help you build media plans that deliver results — not just reach.",
      icon: Rocket,
    },
    {
      id: 2,
      title: "Automation & AI Workflows",
      description:
        "Automate the boring. Accelerate the smart. I build AI-powered systems that eliminate manual tasks and unlock scale — so you can focus on strategy, not spreadsheets.",
      icon: Bot,
    },
    {
      id: 3,
      title: "Tracking & Attribution",
      description:
        "Data you can trust. Results you can act on. I fix broken tracking setups, align them with your funnel, and build attribution models that reflect what's actually working.",
      icon: Target,
    },
    {
      id: 4,
      title: "Privacy-First Strategy",
      description:
        "Grow with confidence. Stay compliant. Win customer trust. Privacy isn't just a legal box to tick — it's a strategic advantage. I help you build data systems that are compliant, future-proof, and performance-ready.",
      icon: Shield,
    },
    {
      id: 5,
      title: "AI-Ready Data Infrastructure",
      description:
        "Build systems that scale with intelligence. I help you create data infrastructure that's not just compliant and performance-ready, but also optimized for AI-powered insights and automation.",
      icon: Brain,
    },
  ]

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nathan O'Connor",
    url: `${BASE_URL}/about-me`,
    image: `${BASE_URL}/about-photo.png`,
    alumniOf: "University of Life", // Placeholder, replace if applicable
    jobTitle: "Digital Marketing & AI Consultant",
    worksFor: {
      "@type": "Organization",
      name: "Nathan O'Connor Consulting", // Or your business name
    },
    sameAs: [
      "https://www.linkedin.com/in/nathanoconnor", // Replace with actual LinkedIn profile
      "https://twitter.com/yourtwitterhandle", // Replace with actual Twitter profile
    ],
  }

  return (
    <div className="bg-white py-16 sm:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">About Me</h1>
            <p className="mt-4 text-lg text-gray-500">
              I'm a strategic marketer with 20+ years of experience driving growth through data-led, privacy-first
              marketing strategies. While I began my journey in Web Design through to biddable media, my focus has
              evolved far beyond channel execution, today, I specialise in building high-impact marketing strategies
              grounded in analytics, innovation, and the responsible use of data.
            </p>
            <p className="mt-4 text-lg text-gray-500">
              My strength lies in connecting the dots between performance, technology, and customer experience. I bring
              a deep technical understanding of tracking infrastructure, cookie consent, and server-side tracking,
              ensuring marketing remains compliant while maximising the power of first-party data. In a world shaped by
              privacy regulation and AI disruption, I help businesses future-proof their marketing with systems that are
              measurable, ethical, and built to scale.
            </p>
            <p className="mt-4 text-lg text-gray-500">
              I work best in visionary environments where ideas are backed by insight, and success is measured not just
              by clicks or impressions but by real business outcomes.
            </p>
            <p className="mt-4 text-lg text-gray-500">
              Let's connect if you're interested in performance-driven strategy, first-party data transformation, or
              building marketing systems that thrive in the new privacy-first world.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/about-photo.png"
              alt="Professional photo of O'Connor"
              width={400}
              height={500}
              className="rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            My 5 Pillars, Built to Drive Smarter, Faster Growth
          </h2>
          <div className="mt-8 space-y-8">
            {pillars.map((pillar) => (
              <div key={pillar.id} className="flex items-start space-x-4 rounded-lg bg-gray-50 p-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#101C3C] text-white">
                  <pillar.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFA64C] text-white">
                      <span className="text-sm font-bold">{pillar.id}</span>
                    </div>
                    <h3 className="ml-4 text-xl font-semibold text-gray-900">{pillar.title}</h3>
                  </div>
                  <p className="mt-3 text-gray-600">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
