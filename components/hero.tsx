'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  function scrollToForm() {
    const formElement = document.getElementById('contact-form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="bg-black text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-2 lg:px-8">
        {/* Text */}
        <div>
          <p className="mb-3 text-sm uppercase tracking-wider text-gray-300">
            Privacy‑First. Performance‑Driven.
          </p>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Nathan O’Connor
          </h1>

          <p className="mt-5 max-w-xl text-gray-300">
            I help businesses scale with performance marketing, smart automation, and AI‑powered
            systems — all built with privacy at the core.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={scrollToForm}
              className="rounded-md bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100"
            >
              Get Started
            </button>

            <Link
              href="/about"
              className="rounded-md border border-gray-500 bg-transparent px-8 py-3 text-center text-base font-medium text-white hover:bg-gray-800"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="relative h-64 w-full sm:h-80 md:h-[28rem]">
          <Image
            src="/hero-photo.png"
            alt="Nathan O’Connor"
            fill
            priority
            sizes="(min-width: 1024px) 600px, 100vw"
            className="rounded-lg object-cover"
          />
        </div>
      </div>
    </section>
  )
}
