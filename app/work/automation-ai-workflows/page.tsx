import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Zap, Bot, Database, Settings, Lightbulb, Code, Clock, DollarSign, TrendingUp } from "lucide-react"
import type { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Automation & AI Workflows",
  description:
    "Streamline operations and accelerate growth with Nathan O'Connor's intelligent automation and AI-powered workflow solutions.",
  alternates: {
    canonical: `${BASE_URL}/work/automation-ai-workflows`,
  },
  openGraph: {
    title: "Automation & AI Workflows | Nathan O'Connor",
    description:
      "Streamline operations and accelerate growth with Nathan O'Connor's intelligent automation and AI-powered workflow solutions.",
    url: `${BASE_URL}/work/automation-ai-workflows`,
    siteName: "Nathan O'Connor",
    images: [
      {
        url: `${BASE_URL}/images/automation-ai-workflows-process-1.png`, // Use a relevant image for this service
        width: 800,
        height: 600,
        alt: "Automation & AI Workflows",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Automation & AI Workflows | Nathan O'Connor",
    description:
      "Streamline operations and accelerate growth with Nathan O'Connor's intelligent automation and AI-powered workflow solutions.",
    creator: "@yourtwitterhandle",
    images: [`${BASE_URL}/images/automation-ai-workflows-process-1.png`],
  },
}

export default function AutomationAIWorkflowsPage() {
  const services = [
    {
      icon: Zap,
      title: "Custom Workflow Automation",
      description:
        "Design and implement automated sequences for marketing, sales, and operational tasks using leading platforms.",
    },
    {
      icon: Bot,
      title: "AI-Powered Content Generation",
      description:
        "Automate content creation, summarisation, and personalisation using advanced AI models for efficiency.",
    },
    {
      icon: Database,
      title: "Data Integration & ETL",
      description:
        "Connect disparate data sources and automate data extraction, transformation, and loading for unified insights.",
    },
    {
      icon: Settings,
      title: "System Integration & API Development",
      description:
        "Seamlessly integrate your existing tools and platforms through custom API connections for a cohesive ecosystem.",
    },
    {
      icon: Lightbulb,
      title: "AI Strategy & Consulting",
      description:
        "Develop a clear AI adoption strategy, identifying high-impact use cases and opportunities for your business.",
    },
    {
      icon: Code,
      title: "Low-Code/No-Code Solutions",
      description:
        "Build powerful automations using platforms like n8n, Zapier, and Make, empowering your team with minimal coding.",
    },
  ]

  const benefits = [
    {
      icon: Clock,
      title: "Time Savings",
      description: "Automate repetitive tasks, freeing up valuable time for strategic work and innovation.",
    },
    {
      icon: DollarSign,
      title: "Cost Reduction",
      description: "Minimise operational expenses by streamlining processes and reducing manual effort.",
    },
    {
      icon: TrendingUp,
      title: "Scalability",
      description:
        "Build systems that can handle increased volume and complexity without proportional increases in resources.",
    },
    {
      icon: Zap,
      title: "Enhanced Accuracy",
      description: "Reduce human error and ensure consistent, precise execution of tasks and data handling.",
    },
  ]

  const process = [
    {
      step: "01",
      title: "Discovery & Blueprint",
      description:
        "Understand your current processes, identify automation opportunities, and design the workflow architecture.",
      image: "/images/automation-ai-workflows-process-1.png",
    },
    {
      step: "02",
      title: "Development & Integration",
      description:
        "Build and configure the automation workflows, integrating necessary tools and APIs for seamless operation.",
      image: "/images/automation-ai-workflows-process-2.png",
    },
    {
      step: "03",
      title: "Testing & Refinement",
      description:
        "Rigorous testing to ensure accuracy, efficiency, and seamless operation, followed by iterative improvements.",
      image: "/images/automation-ai-workflows-process-3.png",
    },
    {
      step: "04",
      title: "Deployment & Training",
      description:
        "Launch the automated workflows and provide training to your team for effective management and adoption.",
      image: "/images/automation-ai-workflows-process-4.png",
    },
  ]

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Automation & AI Workflows Consulting",
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
      "I build intelligent automation and AI-powered workflows that eliminate manual tasks, accelerate operations, and unlock new levels of efficiency and scale for your business.",
    url: `${BASE_URL}/work/automation-ai-workflows`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Automation & AI Workflow Services",
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
              Automation & AI Workflows
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-xl text-gray-300">
              I build intelligent automation and AI-powered workflows that eliminate manual tasks, accelerate
              operations, and unlock new levels of efficiency and scale for your business.
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
          <div className="text-center">
            {" "}
            {/* Added text-center here */}
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Automate the Mundane, Accelerate the Intelligent
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              In a world where efficiency is key, leveraging automation and AI isn't just an advantage—it's a necessity.
              I design and implement custom AI-powered workflows that streamline your operations, from marketing and
              sales to customer service and data analysis.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              My approach focuses on identifying repetitive tasks, integrating smart tools, and building systems that
              learn and adapt. This frees up your team to focus on strategic initiatives, driving innovation and growth
              without getting bogged down in manual processes.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              My Automation & AI Workflow Services
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500">
              From concept to implementation, I build intelligent systems tailored to your business needs.
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
              Why Invest in Automation & AI Workflows?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500">
              Boost efficiency, reduce costs, and unlock new growth opportunities.
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
              My Automation & AI Workflow Process
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500">
              A structured approach to designing, building, and deploying intelligent automations.
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
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Ready to Automate Your Growth?</h2>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-300">
              Let's build intelligent workflows that transform your operations and accelerate your business scale.
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
