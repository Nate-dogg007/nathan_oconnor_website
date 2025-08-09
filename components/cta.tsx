"use client"

import { useState } from "react"
import { CheckCircle } from "lucide-react"
import { sendContactEmail } from "@/app/actions" // Import the Server Action

// Helper function for SHA-256 hashing
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message.toLowerCase().trim())
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hexHash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  return hexHash
}

export default function CTA() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")
    setSubmitSuccess(false)

    try {
      const result = await sendContactEmail(formData)

      if (result.success) {
        setSubmitSuccess(true)
        setFormData({ name: "", email: "", company: "", message: "" }) // Clear form

        // Hash email for dataLayer
        const hashedEmail = await sha256(formData.email)

        // Push data to dataLayer for GTM/analytics
        if (typeof window !== "undefined" && window.dataLayer) {
          window.dataLayer.push({
            event: "form_submission",
            form_name: "CTA Form",
            user_data: {
              email_address: hashedEmail,
            },
            form_fields: {
              name: formData.name,
              email: formData.email, // Keeping unhashed email for general analytics if needed
              company: formData.company,
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

  const usps = [
    "Performance-driven marketing strategies",
    "AI-powered workflow automation",
    "Privacy-first data management",
    "Personalized support", // Changed from "Dedicated support team"
  ]

  return (
    <div className="container mx-auto px-6 py-16 lg:px-8">
      <div className="mx-auto overflow-hidden rounded-3xl bg-[#101C3C] px-6 py-12 shadow-xl sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left side - Heading and USPs */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Ready to grow your business?</h2>
            <p className="mt-4 text-lg text-gray-300">
              Get started today and see how my solutions can transform your business.
            </p>

            <div className="mt-8 space-y-4">
              {usps.map((usp, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="mr-3 h-6 w-6 flex-shrink-0 text-[#FFA64C]" />
                  <span className="text-gray-300">{usp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Form */}
          <div id="contact-form" className="rounded-xl bg-white p-6 shadow-md sm:p-8">
            <h3 className="text-xl font-semibold text-gray-900">Get in touch</h3>
            <p className="mt-2 text-sm text-gray-600">Fill out the form below and I'll get back to you shortly.</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#FFA64C] focus:outline-none focus:ring-[#FFA64C]"
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
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#FFA64C] focus:outline-none focus:ring-[#FFA64C]"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#FFA64C] focus:outline-none focus:ring-[#FFA64C]"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#FFA64C] focus:outline-none focus:ring-[#FFA64C]"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-md bg-[#FFA64C] px-4 py-2 text-white hover:bg-[#E89540] focus:outline-none focus:ring-2 focus:ring-[#FFA64C] focus:ring-offset-2 disabled:opacity-75"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
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
        </div>
      </div>
    </div>
  )
}
