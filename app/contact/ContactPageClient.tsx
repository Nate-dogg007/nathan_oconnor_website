"use client"

import type React from "react"
import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

// 🟢 NEW: digify hook
import { useDigifyAttribution } from "@/hooks/useDigifyAttribution"

declare global {
  interface Window {
    dataLayer?: any[]
  }
}

// Hash helpers for dataLayer
async function sha256Hex(input: string) {
  const enc = new TextEncoder().encode(input.trim().toLowerCase())
  const hashBuffer = await crypto.subtle.digest("SHA-256", enc)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}
function getEventId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID()
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

async function pushDLAttempt() {
  const base = {
    page_location: typeof window !== "undefined" ? window.location.href : "",
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
  }
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: "contact_form_submit_attempt", ...base })
}
async function pushDLError() {
  const base = {
    page_location: typeof window !== "undefined" ? window.location.href : "",
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
  }
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: "contact_form_submit_error", ...base })
}
async function pushDLSuccess(name: string, email: string, delivered: boolean) {
  const base = {
    page_location: typeof window !== "undefined" ? window.location.href : "",
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
  }
  const event_id = getEventId()
  const name_sha256 = await sha256Hex(name)
  const email_sha256 = await sha256Hex(email)

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: "contact_form_submit",
    event_id,
    delivered,
    ...base,
    user: { name_sha256, email_sha256 },
  })
}

export default function ContactPageClient() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("") // optional
  const [message, setMessage] = useState("")
  const [company, setCompany] = useState("")
  const [website, setWebsite] = useState("") // honeypot

  // 🟢 NEW: build digify attribution (visitor_id, session_id, FT/LT UTM & click IDs, plus hashed email/phone)
  const attrib = useDigifyAttribution(email, phone)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (website) return // bot caught

    if (!name || !email || !message) {
      toast({ title: "Please fill in name, email, and message." })
      return
    }

    try {
      setLoading(true)
      await pushDLAttempt()

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // 🟢 NEW: include attrib
        body: JSON.stringify({ name, email, message, company, phone, attrib }),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok || data?.ok === false) {
        await pushDLError()
        toast({ title: data?.error || "Failed to send email." })
        return
      }

      const delivered = Boolean(data?.delivered !== false)
      await pushDLSuccess(name, email, delivered)

      if (delivered) {
        toast({ title: "Thanks! Your message has been sent." })
      } else {
        toast({
          title: "Message received",
          description: "Email notifications aren’t configured yet, but your message was submitted.",
        })
      }

      // reset
      setName("")
      setEmail("")
      setPhone("")
      setMessage("")
      setCompany("")
    } catch {
      await pushDLError()
      toast({ title: "Something went wrong. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact-form" className="bg-[#101C3C]">
      <div className="container mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-16 lg:px-8">
        {/* Left: copy */}
        <div className="self-center text-white">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to grow your business?</h2>
          <p className="mt-2 text-white/85">Get started today and see how my solutions can transform your business.</p>
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

        {/* Right: white form card */}
        <div className="self-center">
          <div className="rounded-lg border border-white/10 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-zinc-900">Contact me</h3>
            <p className="mt-1 text-sm text-zinc-600">I’ll get back to you as soon as possible.</p>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              {/* Honeypot (hidden) */}
              <div className="hidden">
                <Label htmlFor="website">Website</Label>
                <Input id="website" name="website" autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company">Company (optional)</Label>
                  <Input id="company" name="company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company Ltd" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell me a bit about your goals..." required />
              </div>

              {/* 🟢 OPTIONAL: if you ever POST to a non-JS endpoint, mirror attrib in hidden inputs
              {Object.entries(attrib).map(([k, v]) => (
                <input key={k} type="hidden" name={k} value={v} />
              ))} */}

              <div className="pt-2">
