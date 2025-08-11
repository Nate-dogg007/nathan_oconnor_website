import type React from "react"
import { Inter } from "next/font/google"
// import "./globals.css"
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

        <style
          dangerouslySetInnerHTML={{
            __html: `
            :root {
              --background: 0 0% 100%;
              --foreground: 240 10% 3.9%;
              --card: 0 0% 100%;
              --card-foreground: 240 10% 3.9%;
              --popover: 0 0% 100%;
              --popover-foreground: 240 10% 3.9%;
              --primary: 240 5.9% 10%;
              --primary-foreground: 0 0% 98%;
              --secondary: 240 4.8% 95.9%;
              --secondary-foreground: 240 5.9% 10%;
              --muted: 240 4.8% 95.9%;
              --muted-foreground: 240 3.8% 46.1%;
              --accent: 240 4.8% 95.9%;
              --accent-foreground: 240 5.9% 10%;
              --destructive: 0 84.2% 60.2%;
              --destructive-foreground: 0 0% 98%;
              --border: 240 5.9% 90%;
              --input: 240 5.9% 90%;
              --ring: 240 10% 3.9%;
              --chart-1: 12 76% 61%;
              --chart-2: 173 58% 39%;
              --chart-3: 197 37% 24%;
              --chart-4: 43 74% 66%;
              --chart-5: 27 87% 67%;
              --radius: 0.5rem;
            }
            @media (prefers-color-scheme: dark) {
              :root {
                --background: 240 10% 3.9%;
                --foreground: 0 0% 98%;
                --card: 240 10% 3.9%;
                --card-foreground: 0 0% 98%;
                --popover: 240 10% 3.9%;
                --popover-foreground: 0 0% 98%;
                --primary: 0 0% 98%;
                --primary-foreground: 240 5.9% 10%;
                --secondary: 240 3.7% 15.9%;
                --secondary-foreground: 0 0% 98%;
                --muted: 240 3.7% 15.9%;
                --muted-foreground: 240 5% 64.9%;
                --accent: 240 3.7% 15.9%;
                --accent-foreground: 0 0% 98%;
                --destructive: 0 62.8% 30.6%;
                --destructive-foreground: 0 0% 98%;
                --border: 240 3.7% 15.9%;
                --input: 240 3.7% 15.9%;
                --ring: 240 4.9% 83.9%;
                --chart-1: 220 70% 50%;
                --chart-2: 160 60% 45%;
                --chart-3: 30 80% 55%;
                --chart-4: 280 65% 60%;
                --chart-5: 340 75% 55%;
              }
            }
            * { box-sizing: border-box; }
            body { 
              margin: 0; 
              font-family: ${inter.style.fontFamily}, ui-sans-serif, system-ui, sans-serif;
              background-color: hsl(var(--background));
              color: hsl(var(--foreground));
              line-height: 1.5;
            }
            .flex { display: flex; }
            .min-h-screen { min-height: 100vh; }
            .flex-col { flex-direction: column; }
            .flex-grow { flex-grow: 1; }
            @media (prefers-reduced-motion: reduce) {
              *, ::before, ::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
              }
            }
          `,
          }}
        />

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

        <Script id="load-css" strategy="afterInteractive">
          {`
            function loadCSS() {
              if (!document.querySelector('link[href="/api/css"]')) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = '/api/css';
                document.head.appendChild(link);
              }
            }
            
            // Load CSS immediately
            loadCSS();
            
            // Fallback for slower connections
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', loadCSS);
            }
          `}
        </Script>
      </body>
    </html>
  )
}
