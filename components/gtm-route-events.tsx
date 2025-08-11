"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

declare global {
  interface Window {
    dataLayer?: any[]
  }
}

function pushPageView() {
  if (typeof window === "undefined") return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: "page_view",
    page_location: window.location.href,
    page_path: window.location.pathname + window.location.search,
    page_title: document.title,
  })
}

export default function GTMRouteEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Initial page_view
  useEffect(() => {
    pushPageView()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Push on client-side navigation
  useEffect(() => {
    pushPageView()
  }, [pathname, searchParams])

  return null
}
