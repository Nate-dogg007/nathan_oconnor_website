// /lib/digify.ts
export type DigifyCookie = {
  visitor_id: string
  first_touch?: Record<string, string> & { ts: string }
  last_touch?: Record<string, string> & { ts: string }
}

function readRawCookie(name: string): string | null {
  if (typeof document === "undefined") return null
  const m = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\\[\\]\\\\/+^])/g, '\\$1') + '=([^;]*)'))
  return m ? decodeURIComponent(m[1]) : null
}

function fromB64Url<T = any>(s: string): T | null {
  try {
    const pad = "=".repeat((4 - (s.length % 4)) % 4)
    const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + pad
    const binary = atob(b64)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
    const json = new TextDecoder().decode(bytes)
    return JSON.parse(json)
  } catch {
    return null
  }
}

export function getDigify(): { digify: DigifyCookie | null; sessionId: string | null } {
  const raw = readRawCookie("_digify")               // base64url
  const digify = raw ? fromB64Url<DigifyCookie>(raw) : null
  const sessionId = readRawCookie("_digify_sid")     // plain
  return { digify, sessionId }
}
