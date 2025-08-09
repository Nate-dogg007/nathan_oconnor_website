import type { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"
import ContactPageClient from "./ContactPageClient"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Have questions or ready to get started? Contact Nathan O'Connor for performance marketing, AI workflows, and privacy-first data solutions.",
  alternates: {
    canonical: `${BASE_URL}/contact`,
  },
  openGraph: {
    title: "Contact Nathan O'Connor | Get in Touch for Growth Solutions",
    description:
      "Have questions or ready to get started? Contact Nathan O'Connor for performance marketing, AI workflows, and privacy-first data solutions.",
    url: `${BASE_URL}/contact`,
    siteName: "Nathan O'Connor",
    images: [
      {
        url: `${BASE_URL}/hero-photo.png`, // Use a relevant image
        width: 800,
        height: 600,
        alt: "Contact Nathan O'Connor",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Nathan O'Connor | Get in Touch for Growth Solutions",
    description:
      "Have questions or ready to get started? Contact Nathan O'Connor for performance marketing, AI workflows, and privacy-first data solutions.",
    creator: "@yourtwitterhandle",
    images: [`${BASE_URL}/hero-photo.png`],
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}
