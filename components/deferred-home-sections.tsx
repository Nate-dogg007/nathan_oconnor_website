"use client"

import dynamic from "next/dynamic"

// Load below-the-fold sections on the client, after hydration
export const FAQ = dynamic(() => import("@/components/faq"), {
  ssr: false,
  loading: () => (
    <section className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 my-16 h-28 animate-pulse rounded-lg bg-zinc-100" />
  ),
})

export const CTA = dynamic(() => import("@/components/cta"), {
  ssr: false,
  loading: () => (
    <section className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 my-12 h-20 animate-pulse rounded-lg bg-zinc-100" />
  ),
})

export default function DeferredHomeSections() {
  return (
    <>
      <FAQ />
      <CTA />
    </>
  )
}
