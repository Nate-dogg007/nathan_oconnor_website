"use client"
import { useEffect, useMemo, useState } from "react"
import { getDigify, sha256Hex, type DigifyCookie } from "@/lib/digify"

export type HiddenAttribution = Record<string, string>

export function useDigifyAttribution(email?: string, phone?: string) {
  const [fields, setFields] = useState<HiddenAttribution>({})
  const [hashes, setHashes] = useState<{ email_hash?: string; phone_hash?: string }>({})

  useEffect(() => {
    const { digify, sessionId } = getDigify()
    const out: HiddenAttribution = {}

    if (digify?.visitor_id) out["digify_visitor_id"] = digify.visitor_id
    if (sessionId) out["digify_session_id"] = sessionId

    // Include a compact JSON of all touches for the API route / CRM
    if (digify?.touches?.length) {
      out["touches_json"] = JSON.stringify(digify.touches)
      // Convenience: latest source/medium/channel (if you want columns in CRM)
      const last = digify.touches[digify.touches.length - 1]
      out["latest_source"] = last.src
      out["latest_medium"] = last.med
      out["latest_channel"] = last.ch
    }

    setFields(out)
  }, [])

  useEffect(() => {
    ;(async () => {
      const h: any = {}
      if (email) h.email_hash = await sha256Hex(email)
      if (phone) h.phone_hash = await sha256Hex(phone.replace(/\D+/g, ""))
      setHashes(h)
    })()
  }, [email, phone])

  return useMemo(() => ({ ...fields, ...hashes }), [fields, hashes])
}
