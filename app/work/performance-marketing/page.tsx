import Link from "next/link"
import Image from "next/image" // Import Image component
import { ArrowRight, Target, TrendingUp, Zap, Shield, BarChart3, Users, DollarSign } from "lucide-react"
import type { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Performance Marketing",
  description:
    "Unlock real results with Nathan O'Connor's performance marketing strategies, combining data, automation, and AI for high-impact campaigns.",
  alternates: {
    canonical: `${BASE_URL}/work/performance-marketing`,
  },
  openGraph: {
    title: "Performance Marketing | Nathan O'Connor",
    description:
      "Unlock real results with Nathan O'Connor's performance marketing strategies, combining data, automation, and AI for high-impact campaigns.",
    url: `${BASE_URL}/work/performance-marketing`,
    siteName: "Nathan O'Connor",
    images: [
      {
        url: `${BASE_URL}/images/optimisation.png`, // Use a relevant image for this service
        width: 800,
        height: 600,
        alt: "Performance Marketing",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Performance Marketing | Nathan O'Connor",
    description:
      "Unlock real results with Nathan O'Connor's performance marketing strategies, combining data, automation, and AI for high-impact campaigns.",
    creator: "@yourtwitterhandle",
    images: [`${BASE_URL}/images/optimisation.png`],
  },
}

export default function PerformanceMarketingPage() {
  const services = [
    {
      icon: Target,
      title: "Google Ads Management",
      description:
        "Strategic campaign setup, optimisation, and scaling across Search, Shopping, Performance Max, and YouTube campaigns.",
    },
    {
      icon: BarChart3,
      title: "Conversion Tracking & Attribution",
      description:
        "Advanced tracking setups with server-side implementation, GCLID tracking, and privacy-compliant attribution models.",
    },
    {
      icon: TrendingUp,
      title: "Performance Optimisation",
      description:
        "Data-driven bid strategies, audience refinement, and creative testing to maximise ROAS and reduce acquisition costs.",
    },
    {
      icon: Users,
      title: "Audience Development",
      description:
        "Privacy-first remarketing, lookalike audiences, and customer match strategies using hashed, consented data.",
    },
    {
      icon: Zap,
      title: "Automation & AI Integration",
      description:
        "Smart bidding optimisation, automated reporting, and AI-powered insights to scale campaigns efficiently.",
    },
    {
      icon: Shield,
      title: "Privacy-First Approach",
      description:
        "GDPR-compliant tracking, Consent Mode v2 implementation, and first-party data strategies that protect user privacy.",
    },
  ]

  const benefits = [
    {
      icon: DollarSign,
      title: "Improved ROAS",
      description:
        "Average 40-60% improvement in return on ad spend through strategic optimisation and advanced tracking.",
    },
    {
      icon: Target,
      title: "Better Targeting",
      description: "Precision audience targeting using first-party data and privacy-compliant remarketing strategies.",
    },
    {
      icon: TrendingUp,
      title: "Scalable Growth",
      description: "Sustainable campaign scaling with automated workflows and AI-powered optimisation.",
    },
    {
      icon: BarChart3,
      title: "Clear Attribution",
      description: "Accurate conversion tracking and attribution models that show true campaign performance.",
    },
  ]

  const process = [
    {
      step: "01",
      title: "Audit & Strategy",
      description:
        "Comprehensive analysis of current campaigns, tracking setup, and competitive landscape to identify opportunities.",
      image: "/images/audit-strategy.png", // Add image path for this step
    },
    {
      step: "02",
      title: "Implementation",
      description:
        "Campaign setup, tracking configuration, and privacy-compliant data collection systems implementation.",
      image: "/images/implementation.png", // Add image path for this step
    },
    {
      step: "03",
      title: "Optimisation",
      description: "Continuous testing, bid strategy refinement, and performance optimisation based on real-time data.",
      image: "/images/optimisation.png", // Add image path for this step
    },
    {
      step: "04",
      title: "Scale & Automate",
      description:
        "Systematic scaling with automated workflows and AI-powered insights to maintain efficiency at scale.",
      image: "/images/scale-automate.png", // Add image path for this step
    },
  ]

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Performance Marketing Consulting",
    provider: {
      "@type": "Person",
      name: "Nathan O'Connor",
      url: BASE_URL,
    },
    areaServed: {
      "@type": "Place",
      name: "Global", // Or specific regions like "United Kingdom"
    },
    description:
      "I combine data, automation, and AI to create high-performance marketing strategies that generate real results — from clicks to customers. No guesswork, just outcomes.",
    url: `${BASE_URL}/work/performance-marketing`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Performance Marketing Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.description,
        },
      })),
    },
  }

  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {/* Hero Section */}
      <section className="bg-[#101C3C] py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Performance Marketing
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-xl text-gray-300">
              I combine data, automation, and AI to create high-performance marketing strategies that generate real
              results — from clicks to customers. No guesswork, just outcomes.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-md bg-[#FFA64C] px-8 py-3 text-base font-medium text-white hover:bg-[#E89540] flex items-center"
              >
                Let’s Talk Growth
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Performance Marketing That Actually Performs
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                Performance marketing is my results-first approach to digital marketing, every campaign is built with a
                clear goal, tracked with precision, and optimised continuously to deliver growth.
              </p>
              <p className="mt-4 text-lg text-gray-600">
                Unlike traditional marketing, where success can be vague, performance marketing ties every action to a
                measurable outcome: leads, sales, ROI.
              </p>
              <p className="mt-4 text-lg text-gray-600">
                I focus on channels that deliver through Google Ads, SEO, shopping feeds, remarketing, and AI-powered
                strategies, all working together to attract, convert, and retain high-value customers.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="grid grid-cols-2 gap-6">
                <div className="rounded-lg bg-gray-50 p-6 text-center">
                  <div className="text-3xl font-bold text-[#FFA64C]">40-60%</div>
                  <div className="text-sm text-gray-600">Average ROAS Improvement</div>
                </div>
                <div className="rounded-lg bg-gray-50 p-6 text-center">
                  <div className="text-3xl font-bold text-[#FFA64C]">95%</div>
                  <div className="text-sm text-gray-600">Tracking Accuracy</div>
                </div>
                <div className="rounded-lg bg-gray-50 p-6 text-center">
                  <div className="text-3xl font-bold text-[#FFA64C]">100%</div>
                  <div className="text-sm text-gray-600">GDPR Compliant</div>
                </div>
                <div className="rounded-lg bg-gray-50 p-6 text-center">
                  <div className="text-3xl font-bold text-[#FFA64C]">20+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Comprehensive Performance Marketing Services
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500">
              From strategy to execution, I provide end-to-end performance marketing solutions.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div key={index} className="rounded-lg bg-white p-8 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#101C3C] text-white">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">{service.title}</h3>
                <p className="mt-4 text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose My Performance Marketing Approach?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500">
              Results-driven strategies that deliver measurable growth while maintaining compliance and user trust.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FFA64C] text-white">
                  <benefit.icon className="h-8 w-8" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-gray-900">{benefit.title}</h3>
                <p className="mt-2 text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              My Performance Marketing Process
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500">
              A systematic approach to building and scaling high-performance campaigns.
            </p>
          </div>

          <div className="mt-16 space-y-12">
            {process.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col gap-8 lg:flex-row lg:gap-16 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
              >
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFA64C] text-white font-bold">
                      {step.step}
                    </div>
                    <h3 className="ml-4 text-2xl font-bold text-gray-900">{step.title}</h3>
                  </div>
                  <p className="mt-4 text-lg text-gray-600">{step.description}</p>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  {step.image ? (
                    <Image
                      src={step.image || "/placeholder.svg"}
                      alt={step.title}
                      width={400}
                      height={256}
                      className="h-64 w-full rounded-lg object-cover"
                    />
                  ) : (
                    <div className="h-64 w-full rounded-lg bg-gradient-to-br from-[#101C3C] to-[#FFA64C] opacity-10"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#101C3C] py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Scale Your Performance Marketing?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-300">
              Let's build a performance marketing strategy that drives real results while respecting user privacy and
              maintaining compliance.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-md bg-[#FFA64C] px-8 py-3 text-base font-medium text-white hover:bg-[#E89540] flex items-center"
              >
                Let’s Talk Growth
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
