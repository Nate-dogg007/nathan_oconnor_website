// components/hero.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  function scrollToForm() {
    const el = document.getElementById('contact-form')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="relative isolate bg-[#101C3C] text-white">
      <div
        className="
          mx-auto grid max-w-6xl grid-cols-1 gap-10
          px-4 sm:px-6 lg:px-8
          md:grid-cols-2
          min-h-[26rem] lg:min-h-[36rem]
        "
      >
        {/* Left column: vertically centered */}
        <div className="self-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
            {'Unlock Growth Through'}
          </h1>
          <h2 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl text-[#FFA64C]">
            {'Data-Driven, Privacy-First Marketing'}
          </h2>

          <p className="mt-4 max-w-xl text-white/85">
            {'I help businesses scale with performance marketing, smart automation, and AI-powered systems, all built with privacy at the core.'}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={scrollToForm}
              className="rounded-md bg-[#FFA64C] px-8 py-3 text-base font-medium text-[#101C3C] shadow-sm transition-colors hover:bg-[#ff9f3a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFA64C]/60"
            >
              {'Get Started'}
            </button>

            <Link
              href="/about-me"
              className="rounded-md border border-white/40 bg-transparent px-8 py-3 text-center text-base font-medium text-white transition-colors hover:bg-white/10"
            >
              {'Learn More'}
            </Link>
          </div>
        </div>

        {/* Right column: larger image, pinned to bottom, hidden on mobile */}
        <div className="relative hidden md:flex items-end">
          <div className="relative h-[26rem] w-full lg:h-[38rem]">
            <Image
              src="/hero-photo.png"
              alt="Hero image"
              fill
              priority
              sizes="(min-width: 1024px) 700px, 50vw"
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
