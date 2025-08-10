// components/hero.tsx
'use client'

import { Button } from '@/components/ui/button'

type HeroProps = {
  eyebrow?: string
  title?: string
  subtitle?: string
  primaryLabel?: string
  primaryHref?: string        // e.g. '/contact' or 'mailto:you@example.com'
  scrollTargetId?: string     // e.g. 'contact'
  className?: string
}

export default function Hero({
  eyebrow = 'Privacy‑First. Performance‑Driven.',
  title = 'Nathan O’Connor',
  subtitle = 'I help businesses scale with performance marketing, smart automation, and AI‑powered systems — built with privacy at the core.',
  primaryLabel = 'Let’s talk',
  primaryHref,
  scrollTargetId = 'contact',
  className,
}: HeroProps) {
  function handlePrimary() {
    if (primaryHref) {
      window.location.href = primaryHref
      return
    }
    const el = document.getElementById(scrollTargetId)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      className={`relative isolate overflow-hidden bg-white py-20 sm:py-24 md:py-28 ${className ?? ''}`}
    >
      {/* soft gradient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 -top-40 h-72 bg-gradient-to-b from-zinc-100 to-transparent blur-3xl" />
        <div className="absolute inset-x-0 -bottom-40 h-72 bg-gradient-to-t from-zinc-100 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-block rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-700">
            {eyebrow}
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl">
            {title}
          </h1>

          <p className="mt-5 text-base leading-relaxed text-zinc-600 sm:text-lg">
            {subtitle}
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <Button
              onClick={handlePrimary}
              className="group relative bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm transition-transform duration-200 ease-out"
            >
              <span className="inline-flex items-center">
                {primaryLabel}
                <span className="ml-2 inline-block translate-x-0 transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </span>
              <span className="pointer-events-none absolute inset-0 -z-10 rounded-md ring-0 ring-zinc-900/0 transition group-hover:ring-8 group-hover:ring-zinc-900/5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
