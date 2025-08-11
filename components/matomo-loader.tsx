"use client"

import { useEffect, useState } from "react"
import Script from "next/script"

type Props = {
  domain: string // e.g. "nathanoconnor.matomo.cloud"
  siteId: string | number
}

export default function MatomoLoader({ domain, siteId }: Props) {
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    const w = window as any
    const handleConsent = () => {
      if (w.Cookiebot) {
        setAllowed(Boolean(w.Cookiebot?.consent?.statistics))
      } else {
        // No Cookiebot found -> allow by default
        setAllowed(true)
      }
    }
    handleConsent()
    w.addEventListener?.("CookiebotOnAccept", handleConsent)
    return () => w.removeEventListener?.("CookiebotOnAccept", handleConsent)
  }, [])

  if (!domain || !siteId || !allowed) return null

  const cleaned = domain.replace(/^https?:\/\//, "").replace(/\/+$/, "")
  const trackerUrl = `https://${cleaned}/matomo.php`
  const scriptSrc = `https://cdn.matomo.cloud/${cleaned}/matomo.js`

  return (
    <>
      <Script id="matomo-init" strategy="afterInteractive">
        {`
          window._paq = window._paq || [];
          _paq.push(["disableCookies"]);
          _paq.push(["trackPageView"]);
          _paq.push(["enableLinkTracking"]);
          (function() {
            var u="${trackerUrl.replace(/"/g, '\\"').replace(/</g, "\\u003c")}";
            _paq.push(["setTrackerUrl", u]);
            _paq.push(["setSiteId", "${String(siteId)}"]);
          })();
        `}
      </Script>
      <Script id="matomo-js" src={scriptSrc} strategy="afterInteractive" />
    </>
  )
}
