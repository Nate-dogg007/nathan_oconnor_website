import Link from "next/link"
import Image from "next/image"

export default function Hero() {
  const scrollToForm = () => {
    const formElement = document.getElementById('contact-form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="relative bg-[#101C3C]">
      <div className="container mx-auto px-4 pt-8 sm:px-6 sm:pt-12 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col justify-center">
            <h1 className="text-[27px] font-bold leading-tight tracking-tight text-white sm:text-[33px] md:text-[45px]">
              <span className="block">Unlock Growth Through</span>
              <span className="block text-[#FFA64C]">Data-Driven, Privacy-First Marketing</span>
            </h1>
            <p className="mt-6 max-w-lg text-xl text-gray-300">
              I help businesses scale with performance marketing, smart automation, and AI-powered systems, all built
              with privacy at the core.
            </p>
            <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <button
                onClick={scrollToForm}
                className="rounded-md bg-[#FFA64C] px-8 py-3 text-center text-base font-medium text-white hover:bg-[#E89540] cursor-pointer"
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
          <div className="flex items-center justify-center">
            <Image
              src="/hero-photo.png"
              alt="Professional photo of O'Connor"
              width={500}
              height={500}
              className="rounded-lg object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}
