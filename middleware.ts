// /middleware.ts
import { NextRequest, NextResponse } from "next/server";

// --- Capture config
const UTM_KEYS = ["utm_source","utm_medium","utm_campaign","utm_term","utm_content"] as const;
const CLICK_IDS = ["gclid","wbraid","gbraid","msclkid","fbclid","ttclid","uetmsclkid"] as const;

// --- Time helpers
const nowIso = () => new Date().toISOString();
const newId  = () => (globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2)) as string;

// --- Base64url helpers (Edge-safe)
function toB64Url(obj: any): string {
  const json = typeof obj === "string" ? obj : JSON.stringify(obj);
  const bytes = new TextEncoder().encode(json);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  const b64 = btoa(binary);
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function fromB64Url<T = any>(s: string): T {
  const pad = "=".repeat((4 - (s.length % 4)) % 4);
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + pad;
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  const json = new TextDecoder().decode(bytes);
  return JSON.parse(json) as T;
}

// --- Legacy tolerant JSON cookie reader (handles %7B and %257B etc.)
function readLegacyJson<T = any>(raw: string): T | null {
  let s: string = raw;
  for (let i = 0; i < 3; i++) {
    try { return JSON.parse(s); } catch {}
    try { s = decodeURIComponent(s); } catch { break; }
  }
  return null;
}

// --- Read cookie supporting both base64url (new) and legacy percent-encoded JSON
function readDigifyCookie<T = any>(req: NextRequest, name: string): { value: T | null; legacy: boolean } {
  const raw = req.cookies.get(name)?.value;
  if (!raw) return { value: null, legacy: false };

  // Heuristic: base64url tokens are [-_A-Za-z0-9] without % signs
  const looksB64Url = /^[A-Za-z0-9\-_]+$/.test(raw);
  if (looksB64Url) {
    try {
      const v = fromB64Url<T>(raw);
      return { value: v, legacy: false };
    } catch { /* fall through to legacy */ }
  }

  const legacyVal = readLegacyJson<T>(raw);
  if (legacyVal) return { value: legacyVal, legacy: true };

  return { value: null, legacy: false };
}

function readConsent(req: NextRequest) {
  // consent_state also may be legacy; tolerate both
  const { value: c } = readDigifyCookie<any>(req, "consent_state");
  const granted = (k: string) => c?.[k] === "granted" || c?.[k] === true;
  return {
    analytics: granted("analytics_storage"),
    ads: granted("ad_storage") || granted("ad_user_data") || granted("ad_personalization"),
  };
}

function parseAttribution(url: URL, referrer: string | null) {
  const at: Record<string, string> = {};
  for (const k of UTM_KEYS) { const v = url.searchParams.get(k); if (v) at[k] = v; }
  for (const k of CLICK_IDS) { const v = url.searchParams.get(k); if (v) at[k] = v; }
  if (referrer) at.referrer = referrer; // header is 'referer'
  at.landing_page = url.pathname + (url.search || "");
  return at;
}

export function middleware(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const res = NextResponse.next();

    // --- 1) _digify_session (essential)
    const { value: existingSession } = readDigifyCookie<any>(req, "_digify_session");
    const THIRTY_MIN = 30 * 60 * 1000;
    const now = Date.now();

    let sid: string = existingSession?.sid;
    let startedAt: string = existingSession?.startedAt;
    let lastAt: string = existingSession?.lastAt;

    const lastAtMs = lastAt ? new Date(lastAt).getTime() : NaN;
    const isStale = !lastAt || Number.isNaN(lastAtMs) || now - lastAtMs > THIRTY_MIN;

    if (!sid || isStale) {
      sid = newId();
      startedAt = nowIso();
    }
    lastAt = nowIso();

    res.cookies.set("_digify_session", toB64Url({ sid, startedAt, lastAt }), {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 60,
    });

    // --- 2) _digify (respect consent)
    const consent = readConsent(req);
    const incoming = parseAttribution(url, req.headers.get("referer"));
    const read = readDigifyCookie<any>(req, "_digify");

    const existing = read.value || {};
    const digify: any = {
      visitor_id: existing.visitor_id || newId(),
      first_touch: existing.first_touch || (Object.keys(incoming).length ? { ...incoming, ts: nowIso() } : undefined),
      last_touch: Object.keys(incoming).length ? { ...incoming, ts: nowIso() } : (existing.last_touch || undefined),
    };

    const persist = !!(consent.analytics || consent.ads);

    // _digify: readable by JS (client hook can decode it)
res.cookies.set("_digify", toB64Url(digify), {
  httpOnly: false, // <-- changed
  secure: true,
  sameSite: "lax",
  path: "/",
  ...(persist ? { maxAge: 365 * 24 * 60 * 60 } : {}),
});

// Mirror just the session id to a lightweight, readable cookie
res.cookies.set("_digify_sid", sid, {
  httpOnly: false,
  secure: true,
  sameSite: "lax",
  path: "/",
  maxAge: 30 * 60, // same as session
});

    // Optional: convenience headers
    res.headers.set("x-dfy-visitor", digify.visitor_id);
    res.headers.set("x-dfy-session", sid);

    return res;
  } catch (err) {
    console.error("[digify middleware] error:", err);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
