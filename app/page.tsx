import Hero from "@/components/hero"
import Pillars from "@/components/pillars"
import FAQ from "@/components/faq"
import CTA from "@/components/cta"
import type { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Home",
  description:
    "I help businesses scale with performance marketing, smart automation, and AI-powered systems, all built with privacy at the core. Unlock growth through data-driven strategies.",
  alternates: {
    canonical: `${BASE_URL}/`,
  },
  openGraph: {
    title: "Nathan O'Connor | Data-Driven, Privacy-First Marketing & AI Consultant",
    description:
      "I help businesses scale with performance marketing, smart automation, and AI-powered systems, all built with privacy at the core. Unlock growth through data-driven strategies.",
    url: `${BASE_URL}/`,
    siteName: "Nathan O'Connor",
    images: [
      {
        url: `${BASE_URL}/hero-photo.png`,
        width: 800,
        height: 600,
        alt: "Nathan O'Connor",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nathan O'Connor | Data-Driven, Privacy-First Marketing & AI Consultant",
    description:
      "I help businesses scale with performance marketing, smart automation, and AI-powered systems, all built with privacy at the core. Unlock growth through data-driven strategies.",
    creator: "@yourtwitterhandle",
    images: [`${BASE_URL}/hero-photo.png`],
  },
}

export default function Home() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are you an agency?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, I'm a consultant and strategic partner. I work directly with businesses or as a fractional performance lead alongside internal teams. You get expertise without the overhead of an agency.",
        },
      },
      {
        "@type": "Question",
        name: "Do you run campaigns for us or just advise?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "I can do both. I offer fully managed setups for things like Google Ads, tracking, and automation, or I can plug into your team to guide strategy, build frameworks, and ensure systems are working efficiently.",
        },
      },
      {
        "@type": "Question",
        name: "Can you help me implement AI workflows or is this just theory?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "I build hands-on AI-powered systems using tools like n8n, Airtable, and OpenAI. Whether you want to automate content, reporting, or internal operations, I can design, implement, and train your team on it.",
        },
      },
      {
        "@type": "Question",
        name: "I'm concerned about GDPR, can you help me stay compliant?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. I specialise in privacy-first marketing strategies, including Consent Mode v2, hashed user IDs, and server-side tracking. You'll get performance without sacrificing compliance.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to see results?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "That depends on your goals. In most cases, clients start seeing clarity and performance lifts within the first 30–60 days through improved tracking, budget control, or workflow automation.",
        },
      },
      {
        "@type": "Question",
        name: "What's my process?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "I follow a simple 4-phase approach: 1. Audit – I assess your ads, automation, tracking, and data setup. 2. Roadmap – You get a clear plan with prioritised actions. 3. Build – I implement or support your team in executing the work. 4. Optimise – We refine, automate, and scale what works. It's lean, flexible, and built to drive results fast.",
        },
      },
    ],
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Nathan O'Connor",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+44-7912-345678", // Placeholder, replace with actual phone if desired
      contactType: "customer service",
      email: "info@nathanoconnor.co.uk",
    },
    sameAs: [
      "https://www.linkedin.com/in/nathanoconnor", // Replace with actual LinkedIn profile
      "https://twitter.com/yourtwitterhandle", // Replace with actual Twitter profile
    ],
  }

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <Hero />
      <Pillars />
      <FAQ />
      <CTA />
    </div>
  )
}
