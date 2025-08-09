import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { GoogleTagManager } from "@next/third-parties/google" // Import GoogleTagManager
import { BASE_URL } from "@/lib/constants"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: {
    default: "Nathan O'Connor | Data-Driven, Privacy-First Marketing & AI Consultant",
    template: "%s | Nathan O'Connor",
  },
  description:
    "I help businesses scale with performance marketing, smart automation, and AI-powered systems, all built with privacy at the core. Unlock growth through data-driven strategies.",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: "Nathan O'Connor | Data-Driven, Privacy-First Marketing & AI Consultant",
    description:
      "I help businesses scale with performance marketing, smart automation, and AI-powered systems, all built with privacy at the core. Unlock growth through data-driven strategies.",
    url: BASE_URL,
    siteName: "Nathan O'Connor",
    images: [
      {
        url: `${BASE_URL}/hero-photo.png`, // Default image for social sharing
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
    creator: "@yourtwitterhandle", // Replace with your Twitter handle if you have one
    images: [`${BASE_URL}/hero-photo.png`],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Nathan O'Connor",
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <GoogleTagManager gtmId="GTM-MFR8LX" /> {/* Google Tag Manager component */}
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
