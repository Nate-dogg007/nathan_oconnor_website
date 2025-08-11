import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { BASE_URL } from "@/lib/constants"
import Script from "next/script"
import ConsentBridge from "@/components/consent-bridge"
import GTMRouteEvents from "@/components/gtm-route-events"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID
// e.g. "https://server.nathanoconnor.co.uk" (no trailing slash)
const SGTM_URL = process.env.NEXT_PUBLIC_SGTM_URL

export const metadata = {
  title: {
    default: "Nathan O'Connor | Data-Driven, Privacy-First Marketing & AI Consultant",
    template: "%s | Nathan O'Connor",
  },
  description:
    "I help businesses scale with performance marketing, smart automation, and AI-powered systems, all built with privacy at the core. Unlock growth through data-driven strategies.",
  metadataBase: new URL(BASE_URL),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Nathan O'Connor",
    url: BASE_URL,
  }

  const sgtm = SGTM_URL ? SGTM_URL.replace(/\/+$/, "") : undefined

  return (
    <html lang="en" className={inter.className}>
      <head>
        {sgtm ? (
          <link rel="preconnect" href={sgtm} crossOrigin="" />
        ) : (
          <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
        )}

        {/* JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </head>
      <body>
        {GTM_ID ? (
          <Script
            src={sgtm ? `${sgtm}/gtm.js?id=${GTM_ID}` : `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
            strategy="lazyOnload"
          />
        ) : null}

        <ConsentBridge />

        {/* Client routing page_view events need Suspense */}
        <Suspense fallback={null}>
          <GTMRouteEvents />
        </Suspense>

        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
