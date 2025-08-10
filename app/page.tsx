import type { Metadata } from 'next'
import { BASE_URL } from '@/lib/constants'

const SEO_TITLE = "Nathan O'Connor — Data‑Driven, Privacy‑First Marketing & AI Consultant"
const SEO_DESCRIPTION =
  'I help businesses scale with performance marketing, smart automation, and AI‑powered systems, all built with privacy at the core. Unlock growth through data‑driven strategies.'

export const metadata: Metadata = {
  title: SEO_TITLE,                  // standard <title>
  description: SEO_DESCRIPTION,      // standard <meta name="description">
  alternates: { canonical: `${BASE_URL}/` },

  openGraph: {                       // social link previews (Facebook, LinkedIn, etc.)
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

  twitter: {                         // Twitter/X card
    card: 'summary_large_image',
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    creator: '@yourtwitterhandle',
    images: [`${BASE_URL}/hero-photo.png`],
  },
}
