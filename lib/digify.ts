// /lib/digify.ts
export type DigifyTouch = {
  ts: string;         // ISO
  lp: string;         // landing page path+query
  src: string;        // source
  med: string;        // medium
  ch: "direct"|"referral"|"organic"|"utm";
  cmp?: string;
  term?: string;
  cnt?: string;
  // optional click IDs
  gclid?: string; wbraid?: string; gbraid?: string; msclkid?: string; fbclid?: string; ttclid?: string; uetmsclkid?: string;
};

export type DigifyCookie = {
  visitor_id: string;
  touches: DigifyTouch[];
};

function readRawCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const safe = name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1");
  const m = document.cookie.match(new RegExp("(?:^|; )" + safe + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : null;
}

function fromB64Url<T=any>(s: string): T | null {
  try {
    const pad = "=".repeat((4 - (s.length % 4)) % 4);
    const b64 = s.replace(/-/g,"+").replace(/_/g,"/") + pad;
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i=0;i<bin.length;i++) bytes[i] = bin.charCodeAt(i);
    const json = new TextDecoder().decode(bytes);
    return JSON.parse(json) as T;
  } catch { return null; }
}

export function getDigify(): { digify: DigifyCookie | null; sessionId: string | null } {
  const raw = readRawCookie("_digify");
  const digify = raw ? fromB64Url<DigifyCookie>(raw) : null;
  const sid = readRawCookie("_digify_sid");
  return { digify, sessionId: sid };
}

// Optional helper for hashing PII if you want to include hashed email/phone
export async function sha256Hex(input: string): Promise<string> {
  const enc = new TextEncoder().encode(input.trim().toLowerCase());
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,"0")).join("");
}
