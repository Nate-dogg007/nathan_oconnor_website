import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  LayoutDashboard,
  Server,
  LineChart,
  Database,
  LinkIcon,
  ShieldCheck,
  DollarSign,
} from "lucide-react"
import type { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Tracking & Attribution",
  description:
    "Gain crystal-clear insights with Nathan O'Connor's robust, privacy-first tracking and attribution systems for confident marketing decisions.",
  alternates: {
    canonical: `${BASE_URL}/work/tracking-attribution`,
  },
  openGraph: {
    title: "Tracking & Attribution | Nathan O'Connor",
    description:
      "Gain crystal-clear insights with Nathan O'Connor's robust, privacy-first tracking and attribution systems for confident marketing decisions.",
    url: `${BASE_URL}/work/tracking-attribution`,
    siteName: "Nathan O'Connor",
    images: [
      {
        url: `${BASE_URL}/images/tracking-attribution-process-1.png`, // Use a relevant image for this service
        width: 800,
        height: 600,
        alt: "Tracking & Attribution",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tracking & Attribution | Nathan O'Connor",
    description:
      "Gain crystal-clear insights with Nathan O'Connor's robust, privacy-first tracking and attribution systems for confident marketing decisions.",
    creator: "@yourtwitterhandle",
    images: [`${BASE_URL}/images/tracking-attribution-process-1.png`],
  },
}

export default function TrackingAttributionPage() {
  const services = [
    {
      icon: LayoutDashboard,
      title: "Google Tag Manager (GTM) Setup",
      description: "Expert configuration of GTM for efficient tag deployment and event tracking.",
    },
    {
      icon: Server,
      title: "Server-Side Tracking Implementation",
      description: "Moving tracking from client-side to server-side for enhanced data accuracy and privacy compliance.",
    },
    {
      icon: ShieldCheck,
      title: "Consent Mode v2 Integration",
      description: "Ensuring your tracking respects user consent while maximising data collection for Google services.",
    },
    {
      icon: LineChart,
      title: "Advanced Attribution Modelling",
      description: "Building custom attribution models that reflect your unique customer journey and business goals.",
    },
    {
      icon: Database,
      title: "CRM Integration & Offline Conversions",
      description:
        "Connecting marketing data with your CRM to track the full customer lifecycle and import offline conversions.",
    },
    {
      icon: LinkIcon,
      title: "Data Layer Design & Implementation",
      description: "Structuring your website's data layer for consistent and reliable data capture.",
    },
  ]

  const benefits = [
    {
      icon: Database,
      title: "Reliable Data",
      description: "Make decisions based on accurate, complete data, free from common tracking errors.",
    },
    {
      icon: ShieldCheck,
      title: "Privacy Compliance",
      description: "Stay ahead of privacy regulations with robust, consent-driven tracking solutions.",
    },
    {
      icon: DollarSign,
      title: "Optimised Spend",
      description: "Attribute conversions correctly to allocate budget to the most effective channels.",
    },
    {
      icon: LineChart,
      title: "Full Customer View",
      description: "Understand the entire customer journey, from first touch to final conversion.",
    },
  ]

  const process = [
    {
      step: "01",
      title: "Data Audit & Planning",
      description:
        "Review of existing tracking, identification of data gaps, and planning of the new data architecture.",
      image: "/images/tracking-attribution-process-1.png",
    },
    {
      step: "02",
      title: "Implementation & Configuration",
      description: "Setup of GTM, server-side tracking, Consent Mode v2, and data layer.",
      image: "/images/tracking-attribution-process-2.png",
    },
    {
      step: "03",
      title: "Validation & Testing",
      description: "Thorough testing and debugging to ensure data accuracy and consistency across all platforms.",
      image: "/images/tracking-attribution-process-3.png",
    },
    {
      step: "04",
      title: "Reporting & Optimisation",
      description: "Building custom reports and dashboards for clear insights, enabling continuous optimisation.",
      image: "/images/tracking-attribution-process-4.png",
    },
  ]

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Tracking & Attribution Consulting",
    provider: {
      "@type": "Person",
      name: "Nathan O'Connor",
      url: BASE_URL,
    },
    areaServed: {
      "@type": "Place",
      name: "Global", // Or specific regions
    },
    description:
      "I build robust, privacy-first tracking systems that give you crystal-clear insights into your marketing performance. Know what's working, where to invest, and how to scale with confidence.",
    url: `${BASE_URL}/work/tracking-attribution`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Tracking & Attribution Services",
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
              Tracking & Attribution
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-xl text-gray-300">
              I build robust, privacy-first tracking systems that give you crystal-clear insights into your marketing
              performance. Know what's working, where to invest, and how to scale with confidence.
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
                Unlock True Performance with Accurate Data
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                In today's privacy-conscious world, accurate tracking and attribution are more critical than ever. I
                specialise in building resilient data infrastructures that capture every valuable interaction, ensuring
                you have the insights needed to make informed decisions.
              </p>
              <p className="mt-4 text-lg text-gray-600">
                From server-side tracking and Consent Mode v2 implementation to advanced attribution modelling, I help
                you overcome data silos and privacy challenges. Get a unified view of your customer journey and
                confidently attribute conversions to the right channels.
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
              My Tracking & Attribution Services
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500">
              From foundational setup to advanced modelling, I ensure your data is precise and actionable.
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
              The Power of Precise Tracking & Attribution
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500">
              Make confident decisions with data you can trust, driving better ROI and compliance.
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
              My Tracking & Attribution Process
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500">
              A systematic approach to building and maintaining robust data infrastructure.
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
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Ready for Data You Can Trust?</h2>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-300">
              Let's build a tracking and attribution system that empowers your marketing with accurate, privacy-first
              data.
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
