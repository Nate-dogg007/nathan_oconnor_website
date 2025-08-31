// /lib/digify.ts

// ---------- Types ----------
export type DigifyCookie = {
  visitor_id: string
  first_touch?: Record<string, string> & { ts: string }
  last_touch?: Record<string, string> & { ts: string }
}

export type DigifySession = {
  sid: string
  startedAt: string
  lastAt: string
}

// ---------- Cookie utils ----------
function readRawCookie(name: string): string | null {
  if (typeof document === "undefined") return null
  // Escape cookie name for regex
  const safeName = name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1")
  const m = document.cookie.match(new RegExp("(?:^|; )" + safeName + "=([^;]*)"))
  return m ? decodeURIComponent(m[1]) : null
}

// Base64url -> JSON parse (Edge/browser-safe, no Buffer)
function fromB64Url<T = any>(s: string): T | null {
  try {
    const pad = "=".repeat((4 - (s.length % 4)) % 4)
    const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + pad
    const binary = atob(b64)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
    const json = new TextDecoder().decode(bytes)
    return JSON.parse(json) as T
  } catch {
    return null
  }
}

// ---------- Public API ----------
/**
 * Reads digify cookies written by middleware:
 *  - `_digify`     (base64url JSON; not HttpOnly)
 *  - `_digify_sid` (plain string; not HttpOnly)
 * Returns nulls if not present or unreadable.
 */
export function getDigify(): { digify: DigifyCookie | null; sessionId: string | null } {
  const digifyRaw = readRawCookie("_digify")
  const digify = digifyRaw ? fromB64Url<DigifyCookie>(digifyRaw) : null
  const sessionId = readRawCookie("_digify_sid")
  return { digify, sessionId }
}

/**
 * Convenience accessors for common fields.
 */
export function getDigifyFields(): Record<string, string> {
  const { digify, sessionId } = getDigify()
  const out: Record<string, string> = {}
  if (digify?.visitor_id) out["digify_visitor_id"] = String(digify.visitor_id)
  if (sessionId) out["digify_session_id"] = String(sessionId)

  const ft = digify?.first_touch || ({} as Record<string, string>)
  const lt = digify?.last_touch || ({} as Record<string, string>)
  for (const [k, v] of Object.entries(ft)) if (typeof v === "string") out[`ft_${k}`] = v
  for (const [k, v] of Object.entries(lt)) if (typeof v === "string") out[`lt_${k}`] = v
  return out
}

/**
 * SHA-256 hex helper for hashing PII (email/phone) client-side.
 * Keeps hashes consistent with ad platforms/CRMs that expect lowercase trimmed inputs.
 */
export async function sha256Hex(input: string): Promise<string> {
  const enc = new TextEncoder().encode(input.trim().toLowerCase())
  const buf = await crypto.subtle.digest("SHA-256", enc)
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("")
}
