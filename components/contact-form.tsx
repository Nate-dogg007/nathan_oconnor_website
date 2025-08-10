"use client"

import type React from "react"
import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

declare global {
  interface Window {
    dataLayer?: any[]
  }
}

async function sha256Hex(input: string) {
  const enc = new TextEncoder().encode(input)
  const hashBuffer = await crypto.subtle.digest("SHA-256", enc)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

function normalizeName(name: string) {
  return name.trim().toLowerCase()
}

function getEventId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

async function pushContactSubmitDL(params: { name: string; email: string }) {
  const email_sha256 = await sha256Hex(normalizeEmail(params.email))
  const name_sha256 = await sha256Hex(normalizeName(params.name))
  const event_id = getEventId()
  const page_location = typeof window !== "undefined" ? window.location.href : ""
  const page_path = typeof window !== "undefined" ? window.location.pathname : ""

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: "contact_form_submit",
    event_id,
    page_location,
    page_path,
    user: {
      email_sha256,
      name_sha256,
    },
  })
}

type Props = {
  className?: string
}

export default function ContactForm({ className }: Props) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [company, setCompany] = useState("")
  // Honeypot
  const [website, setWebsite] = useState("")

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (website) return // bot caught

    if (!name || !email || !message) {
      toast({ title: "Please fill in name, email, and message." })
      return
    }

    try {
      setLoading(true)

      // Attempt event (no PII)
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: "contact_form_submit_attempt",
        page_location: typeof window !== "undefined" ? window.location.href : "",
        page_path: typeof window !== "undefined" ? window.location.pathname : "",
      })

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company }),
      })

      if (!res.ok) {
        window.dataLayer.push({
          event: "contact_form_submit_error",
          page_location: typeof window !== "undefined" ? window.location.href : "",
          page_path: typeof window !== "undefined" ? window.location.pathname : "",
        })
        throw new Error("Request failed")
      }

      // Success event with hashed fields
      await pushContactSubmitDL({ name, email })

      toast({ title: "Thanks! Your message has been sent." })
      setName("")
      setEmail("")
      setMessage("")
      setCompany("")
    } catch {
      toast({ title: "Something went wrong. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact-form" className={className}>
      <div className="bg-[#101C3C]">
        <div
          className="
            container mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-12
            sm:px-6 md:grid-cols-2 md:py-16 lg:px-8
          "
        >
          {/* Left column: copy */}
          <div className="self-center text-white">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{"Ready to grow your business?"}</h2>
            <p className="mt-2 text-white/85">
              {"Get started today and see how my solutions can transform your business."}
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "Performance-driven marketing strategies",
                "AI-powered workflow automation",
                "Privacy-first data management",
                "Personalized support",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 flex-none text-[#FFA64C]" />
                  <span className="text-white/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right column: form card (white background) */}
          <div className="self-center">
            <div className="rounded-lg border border-white/10 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-zinc-900">{"Contact me"}</h3>
              <p className="mt-1 text-sm text-zinc-600">{"I’ll get back to you as soon as possible."}</p>

              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                {/* Honeypot (hidden) */}
                <div className="hidden">
                  <Label htmlFor="website">{"Website"}</Label>
                  <Input
                    id="website"
                    name="website"
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    tabIndex={-1}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">{"Name"}</Label>
                    <Input
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{"Email"}</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">{"Company (optional)"}</Label>
                  <Input
                    id="company"
                    name="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Company Ltd"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{"Message"}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me a bit about your goals..."
                    rows={5}
                    required
                  />
                </div>

                <div className="pt-2">
                  <Button type="submit" disabled={loading} className="bg-[#FFA64C] text-[#101C3C] hover:bg-[#ff9f3a]">
                    {loading ? "Sending…" : "Send message"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
