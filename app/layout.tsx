import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { GoogleTagManager } from "@next/third-parties/google"
import { BASE_URL } from "@/lib/constants"
import MatomoLoader from "@/components/matomo-loader"

const inter = Inter({ subsets: ["latin"] })

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID
const MATOMO_DOMAIN = process.env.NEXT_PUBLIC_MATOMO_DOMAIN // e.g. "nathanoconnor.matomo.cloud"
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID // e.g. "1"

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
    images: [{ url: `${BASE_URL}/hero-photo.png`, width: 800, height: 600, alt: "Nathan O'Connor" }],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nathan O'Connor | Data-Driven, Privacy-First Marketing & AI Consultant",
    description:
      "I help businesses scale with performance marketing, smart automation, and AI-powered systems, all built with privacy at the core. Unlock growth through data-driven strategies.",
    images: [`${BASE_URL}/hero-photo.png`],
  },
  generator: "v0.dev",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
    <html lang="en" className={inter.className}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="" />
        <link rel="preconnect" href="https://consent.cookiebot.com" crossOrigin="" />
        <link rel="preconnect" href="https://cdn.matomo.cloud" crossOrigin="" />
        {MATOMO_DOMAIN ? <link rel="preconnect" href={`https://${MATOMO_DOMAIN}`} crossOrigin="" /> : null}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </head>
      <body>
        {GTM_ID ? <GoogleTagManager gtmId={GTM_ID} /> : null}
        {/* Load Matomo only when configured and after consent */}
        {MATOMO_DOMAIN && MATOMO_SITE_ID ? <MatomoLoader domain={MATOMO_DOMAIN} siteId={MATOMO_SITE_ID} /> : null}
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
