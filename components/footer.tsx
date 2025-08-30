import Link from "next/link"
import Image from "next/image"
import { Linkedin } from "lucide-react"

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

export default function Footer() {
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
              <a
                href="https://x.com/NathanO74600725"
                className="text-gray-400 hover:text-gray-500"
                aria-label="X (formerly Twitter)"
                target="_blank"
                rel="noopener noreferrer"
              >
                <XIcon className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/nathanoconnor82/"
                className="text-gray-400 hover:text-gray-500"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-900">Work</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/work/performance-marketing"
                  className="text-sm text-gray-600 hover:text-gray-900 md:text-left"
                >
                  Performance Marketing
                </Link>
              </li>
              <li>
                <Link
                  href="/work/automation-ai-workflows"
                  className="text-sm text-gray-600 hover:text-gray-900 md:text-left"
                >
                  Automation &amp; AI Workflows
                </Link>
              </li>
              <li>
                <Link
                  href="/work/tracking-attribution"
                  className="text-sm text-gray-600 hover:text-gray-900 md:text-left"
                >
                  Tracking &amp; Attribution
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-900">About</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about-me" className="text-sm text-gray-600 hover:text-gray-900 md:text-left">
                  About Me
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-900">Policies</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900 md:text-left">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900 md:text-left">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-gray-600 hover:text-gray-900 md:text-left">
                  Cookies
                </Link>
              </li>
              <li>
                <Link href="/dpa" className="text-sm text-gray-600 hover:text-gray-900 md:text-left">
                  DPA
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Nathan O&apos;Connor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
