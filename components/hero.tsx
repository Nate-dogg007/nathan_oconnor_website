// components/hero.tsx
'use client'

import Image from 'next/image'

export default function Hero() {
  function scrollToForm() {
    const el = document.getElementById('contact-form')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="relative isolate bg-[#101C3C] text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-20 lg:px-8">
        {/* Left: copy */}
        <div>
          <h1 className="text-[33px] leading-tight text-white">
            {'Unlock Growth Through'}
          </h1>
          <h2 className="mt-2 text-[33px] leading-tight text-[#FFA64C]">
            {'Data-Driven, Privacy-First Marketing'}
          </h2>

          <div className="mt-8">
            <button
              type="button"
              onClick={scrollToForm}
              className="inline-flex items-center rounded-md bg-[#FFA64C] px-6 py-3 text-base font-medium text-[#101C3C] transition-colors hover:bg-[#ff9d37] focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              {'Get Started'}
            </button>
          </div>
        </div>

        {/* Right: image (hidden on mobile, anchored to bottom) */}
        <div className="relative hidden md:block">
          <div className="relative h-[22rem] w-full">
            <Image
              src="/hero-photo.png"
              alt="Nathan O’Connor"
              fill
              priority
              sizes="(min-width: 1024px) 600px, 50vw"
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
