"use client"

import type React from "react"

import { useState } from "react"
import { Mail } from "lucide-react"
import { sendContactEmail } from "@/app/actions" // Import the Server Action

// Helper function for SHA-256 hashing
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message.toLowerCase().trim())
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hexHash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  return hexHash
}

export default function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")
    setSubmitSuccess(false)

    try {
      const result = await sendContactEmail(formData)

      if (result.success) {
        setSubmitSuccess(true)
        setFormData({ name: "", email: "", phone: "", message: "" }) // Clear form

        // Hash email for dataLayer
        const hashedEmail = await sha256(formData.email)

        // Push data to dataLayer for GTM/analytics
        if (typeof window !== "undefined" && window.dataLayer) {
          window.dataLayer.push({
            event: "form_submission",
            form_name: "Contact Page Form",
            user_data: {
              email_address: hashedEmail,
            },
            form_fields: {
              name: formData.name,
              email: formData.email, // Keeping unhashed email for general analytics if needed
              phone: formData.phone,
              message: formData.message,
            },
          })
        }
      } else {
        setSubmitError(result.message)
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitError("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactPointSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPoint",
    telephone: "+44-7912-345678", // Placeholder, replace with actual phone if desired
    contactType: "customer service",
    email: "info@nathanoconnor.co.uk",
  }

  return (
    <div className="bg-white py-16 sm:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPointSchema) }} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Get in Touch</h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500">
            Have questions or ready to get started? Reach out to me.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-75"
                >
                  {isSubmitting ? "Submitting..." : "Send Message"}
                </button>
              </div>
              {submitSuccess && (
                <div className="rounded-md bg-green-50 p-4 text-green-800">
                  Thank you for your message! I'll get back to you soon.
                </div>
              )}
              {submitError && <div className="rounded-md bg-red-50 p-4 text-red-800">{submitError}</div>}
            </form>
          </div>
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
              <div className="mt-4 space-y-4">
                <div className="flex items-start">
                  <Mail className="mr-3 h-6 w-6 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <p className="text-sm text-gray-600">info@nathanoconnor.co.uk</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
