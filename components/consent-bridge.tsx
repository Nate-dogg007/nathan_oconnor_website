"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    dataLayer?: any[]
    Cookiebot?: any
  }
}

export default function ConsentBridge() {
  useEffect(() => {
    const w = window as Window

    function gtag(...args: any[]) {
      w.dataLayer = w.dataLayer || []
      w.dataLayer.push(args)
    }

    const updateFromCookiebot = () => {
      const c = w.Cookiebot?.consent
      if (!c) return

      // Map Cookiebot categories to Consent Mode v2
      // statistics -> analytics_storage
      // marketing -> ad_storage, ad_user_data, ad_personalization
      // preferences -> functionality_storage
      gtag("consent", "update", {
        analytics_storage: c.statistics ? "granted" : "denied",
        ad_storage: c.marketing ? "granted" : "denied",
        ad_user_data: c.marketing ? "granted" : "denied",
        ad_personalization: c.marketing ? "granted" : "denied",
        functionality_storage: c.preferences ? "granted" : "denied",
        security_storage: "granted",
      })
    }

    // If Cookiebot is already on the page, update immediately
    updateFromCookiebot()

    // Listen for Cookiebot events
    const onAccept = () => updateFromCookiebot()
    const onDecline = () => updateFromCookiebot()

    // Cookiebot emits DOM events on window
    ;(w as any).addEventListener?.("CookiebotOnAccept", onAccept)
    ;(w as any).addEventListener?.("CookiebotOnDecline", onDecline)

    return () => {
      ;(w as any).removeEventListener?.("CookiebotOnAccept", onAccept)
      ;(w as any).removeEventListener?.("CookiebotOnDecline", onDecline)
    }
  }, [])

  return null
}
