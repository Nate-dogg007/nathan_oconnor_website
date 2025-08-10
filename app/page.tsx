// app/page.tsx
import Hero from '@/components/hero'
import CTA from '@/components/cta'
import Pillars from '@/components/pillars'
import FAQ from '@/components/faq'
import type { Metadata } from 'next'
import { BASE_URL } from '@/lib/constants'

const SEO_TITLE =
  "Nathan O'Connor — Data‑Driven, Privacy‑First Marketing & AI Consultant"
const SEO_DESCRIPTION =
  'I help businesses scale with performance marketing, smart automation, and AI‑powered systems, all built with privacy at the core. Unlock growth through data‑driven strategies.'

export const metadata: Metadata = {
  title: SEO_TITLE,
  description: SEO_DESCRIPTION,
  alternates: { canonical: `${BASE_URL}/` },
  openGraph: {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    url: `${BASE_URL}/`,
    siteName: "Nathan O'Connor",
    images: [
      { url: `${BASE_URL}/hero-photo.png`, width: 1200, height: 630, alt: "Nathan O'Connor" },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    images: [`${BASE_URL}/hero-photo.png`],
  },
}

export default function Home() {
  return (
    <div>
      <Hero />
      <Pillars />
      <FAQ />
      <CTA />
    </div>
  )
}
