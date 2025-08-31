// /hooks/useDigifyAttribution.ts
"use client"
import { useEffect, useMemo, useState } from "react"
import { getDigify, sha256Hex } from "@/lib/digify"

export type HiddenAttribution = Record<string, string>

export function useDigifyAttribution(email?: string, phone?: string) {
  const [fields, setFields] = useState<HiddenAttribution>({})
  const [hashes, setHashes] = useState<{ email_hash?: string; phone_hash?: string }>({})

  useEffect(() => {
    const { digify, sessionId } = getDigify()
    const out: HiddenAttribution = {}
    if (digify?.visitor_id) out["digify_visitor_id"] = digify.visitor_id
    if (sessionId) out["digify_session_id"] = sessionId

    const ft = digify?.first_touch || ({} as any)
    const lt = digify?.last_touch || ({} as any)
    for (const [k, v] of Object.entries(ft)) if (typeof v === "string") out[`ft_${k}`] = v
    for (const [k, v] of Object.entries(lt)) if (typeof v === "string") out[`lt_${k}`] = v
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
