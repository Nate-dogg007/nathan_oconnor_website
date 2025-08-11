import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { GoogleTagManager } from "@next/third-parties/google"
import { BASE_URL } from "@/lib/constants"
import Script from "next/script"
import ConsentBridge from "@/components/consent-bridge"
import GTMRouteEvents from "@/components/gtm-route-events"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID
const COOKIEBOT_ID = process.env.NEXT_PUBLIC_COOKIEBOT_ID
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

  if (typeof window !== "undefined") {
    console.log("GTM Debug - SGTM_URL:", SGTM_URL, "sgtm:", sgtm, "GTM_ID:", GTM_ID)
  }

  return (
    <html lang="en" className={inter.className}>
      <head>
        {sgtm ? (
          <link rel="preconnect" href={sgtm} crossOrigin="" />
        ) : (
          <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
        )}
        <link rel="preconnect" href="https://consent.cookiebot.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://consent.cookiebot.com" />

        {COOKIEBOT_ID ? (
          <link
            rel="preload"
            href={`https://consent.cookiebot.com/uc.js?cbid=${COOKIEBOT_ID}`}
            as="script"
            crossOrigin=""
          />
        ) : null}

        {/* JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />

        <Script id="consent-defaults" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              ad_storage: 'denied',
              analytics_storage: 'denied',
              functionality_storage: 'granted',
              security_storage: 'granted',
              wait_for_update: 500
            });
            gtag('js', new Date());
          `}
        </Script>

        {/* Cookiebot */}
        {COOKIEBOT_ID ? (
          <Script
            id="cookiebot"
            src={`https://consent.cookiebot.com/uc.js?cbid=${COOKIEBOT_ID}`}
            data-blockingmode="auto"
            strategy="beforeInteractive"
          />
        ) : null}
      </head>
      <body>
        {GTM_ID ? <GoogleTagManager gtmId={GTM_ID} gtmScriptUrl={sgtm ? `${sgtm}/gtm.js` : undefined} /> : null}

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
