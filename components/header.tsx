"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    setIsServicesOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1a2d5d] bg-[#101C3C]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[100px] items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="O'Connor Logo" width={160} height={50} className="h-14 w-auto" priority />
            </Link>
          </div>

          {/* Burger Menu Button - Visible on all screen sizes */}
          <div className="flex">
            <button
              type="button"
              className="text-white hover:text-gray-300"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Panel - Slides in from right when burger is clicked */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-64 transform bg-[#101C3C] shadow-lg transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-[100px] items-center justify-between border-b border-[#1a2d5d] px-4">
          <span className="text-lg font-semibold text-white">Menu</span>
          <button type="button" className="text-white hover:text-gray-300" onClick={toggleMenu} aria-label="Close menu">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="space-y-1 px-4 py-6">
          <Link
            href="/"
            className="block py-2 text-base font-medium text-gray-300 hover:text-white"
            onClick={closeMenu}
          >
            Home
          </Link>

          {/* Services with submenu */}
          <div>
            <button
              onClick={toggleServices}
              className="flex w-full items-center justify-between py-2 text-base font-medium text-gray-300 hover:text-white"
            >
              Work
              <ChevronDown className={`h-4 w-4 transform transition-transform ${isServicesOpen ? "rotate-180" : ""}`} />
            </button>
            {isServicesOpen && (
              <div className="ml-4 space-y-1 border-l border-gray-600 pl-4">
                <Link
                  href="/work/performance-marketing"
                  className="block py-2 text-sm font-medium text-gray-400 hover:text-white"
                  onClick={closeMenu}
                >
                  Performance Marketing
                </Link>
                <Link
                  href="/work/automation-ai-workflows"
                  className="block py-2 text-sm font-medium text-gray-400 hover:text-white"
                  onClick={closeMenu}
                >
                  Automation & AI Workflows
                </Link>
                <Link
                  href="/work/tracking-attribution"
                  className="block py-2 text-sm font-medium text-gray-400 hover:text-white"
                  onClick={closeMenu}
                >
                  Tracking & Attribution
                </Link>
                <Link
                  href="/work"
                  className="block py-2 text-sm font-medium text-gray-400 hover:text-white"
                  onClick={closeMenu}
                >
                  All Work
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/about-me"
            className="block py-2 text-base font-medium text-gray-300 hover:text-white"
            onClick={closeMenu}
          >
            About Me
          </Link>
          <Link
            href="/contact"
            className="block py-2 text-base font-medium text-gray-300 hover:text-white"
            onClick={closeMenu}
          >
            Contact
          </Link>
          <Link
            href="/contact"
            className="mt-6 block rounded-md bg-[#FFA64C] px-4 py-2 text-center text-sm font-medium text-white hover:bg-[#E89540]"
            onClick={closeMenu}
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Overlay when menu is open */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-25 transition-opacity duration-300 ease-in-out"
          onClick={toggleMenu}
        ></div>
      )}
    </header>
  )
}
