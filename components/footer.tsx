"use client"

import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Footer() {
  const router = useRouter()
  const handleLinkClick = (href: string) => {
    router.push(href)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-gray-50">
      <div className="container mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <Image
              src="/footer-logo.jpg"
              alt="O'Connor Logo"
              width={120}
              height={120}
              className="h-16 w-16 object-contain"
            />
            <p className="mt-4 text-sm text-gray-600">Providing quality services for over 20+ years.</p>
            <div className="mt-6 flex justify-center space-x-4 md:justify-start">
              <a href="#" className="text-gray-400 hover:text-gray-500" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-900">Work</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <button
                  onClick={() => handleLinkClick("/work/performance-marketing")}
                  className="text-sm text-gray-600 hover:text-gray-900 md:text-left"
                >
                  Performance Marketing
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("/work/automation-ai-workflows")}
                  className="text-sm text-gray-600 hover:text-gray-900 md:text-left"
                >
                  Automation &amp; AI Workflows
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("/work/tracking-attribution")}
                  className="text-sm text-gray-600 hover:text-gray-900 md:text-left"
                >
                  Tracking &amp; Attribution
                </button>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-900">About</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <button
                  onClick={() => handleLinkClick("/about-me")}
                  className="text-sm text-gray-600 hover:text-gray-900 md:text-left"
                >
                  About Me
                </button>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-900">Policies</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <button
                  onClick={() => handleLinkClick("/privacy")}
                  className="text-sm text-gray-600 hover:text-gray-900 md:text-left"
                >
                  Privacy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("/terms")}
                  className="text-sm text-gray-600 hover:text-gray-900 md:text-left"
                >
                  Terms
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("/cookies")}
                  className="text-sm text-gray-600 hover:text-gray-900 md:text-left"
                >
                  Cookies
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("/dpa")}
                  className="text-sm text-gray-600 hover:text-gray-900 md:text-left"
                >
                  DPA
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-600">&copy; 2025 Nathan O&apos;Connor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
