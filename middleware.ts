// /middleware.ts
import { NextRequest, NextResponse } from "next/server";

// --- Config: what to capture from query
const UTM_KEYS = ["utm_source","utm_medium","utm_campaign","utm_term","utm_content"] as const;
const CLICK_IDS = ["gclid","wbraid","gbraid","msclkid","fbclid","ttclid","uetmsclkid"] as const;

// --- Utils
const nowIso = () => new Date().toISOString();
const newId = () => (globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2)) as string;

function safeParseJson<T = any>(raw?: string | null): T | null {
  if (!raw) return null;
  try { return JSON.parse(decodeURIComponent(raw)); } catch {}
  try { return JSON.parse(raw as string); } catch {}
  return null;
}

function readJsonCookie<T = any>(req: NextRequest, name: string): T | null {
  const raw = req.cookies.get(name)?.value;
  if (!raw) return null;

  let s = raw;
  for (let i = 0; i < 3; i++) {
    try {
      return JSON.parse(s);
    } catch {}
    try {
      s = decodeURIComponent(s);
    } catch {
      break;
    }
  }
  return null;
}

function readConsent(req: NextRequest) {
  const c = readJsonCookie<any>(req, "consent_state") || {};
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
  if (referrer) at.referrer = referrer; // (yes, header name is 'referer')
  at.landing_page = url.pathname + (url.search || "");
  return at;
}

export function middleware(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const res = NextResponse.next();

    // --- 1) Essential session cookie (_digify_session)
    const existingSession = readJsonCookie<any>(req, "_digify_session") || {};
    const THIRTY_MIN = 30 * 60 * 1000;
    const now = Date.now();

    let sid: string = existingSession.sid;
    let startedAt: string = existingSession.startedAt;
    let lastAt: string = existingSession.lastAt;

    const lastAtMs = lastAt ? new Date(lastAt).getTime() : NaN;
    const isStale = !lastAt || Number.isNaN(lastAtMs) || now - lastAtMs > THIRTY_MIN;

    if (!sid || isStale) {
      sid = newId();
      startedAt = nowIso();
    }
    lastAt = nowIso();

    res.cookies.set(
      "_digify_session",
      encodeURIComponent(JSON.stringify({ sid, startedAt, lastAt })),
      {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 30 * 60, // 30 minutes
      }
    );

    // --- 2) Attribution cookie (_digify), respecting consent
    const consent = readConsent(req);
    const existing = readJsonCookie<any>(req, "_digify") || {};
    const incoming = parseAttribution(url, req.headers.get("referer"));

    const digify: any = {
      visitor_id: existing.visitor_id || newId(),
      first_touch: existing.first_touch || (Object.keys(incoming).length ? { ...incoming, ts: nowIso() } : undefined),
      last_touch: Object.keys(incoming).length ? { ...incoming, ts: nowIso() } : (existing.last_touch || undefined),
    };

    // Persist only with analytics/ads consent; else session-only (no maxAge)
    const persist = !!(consent.analytics || consent.ads);

    res.cookies.set(
      "_digify",
      encodeURIComponent(JSON.stringify(digify)),
      {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        ...(persist ? { maxAge: 365 * 24 * 60 * 60 } : {}),
      }
    );

    // Optional convenience headers for client hooks
    res.headers.set("x-dfy-visitor", digify.visitor_id);
    res.headers.set("x-dfy-session", sid);

    return res;
  } catch (err) {
    // Never break the request due to attribution; log and continue
    console.error("[digify middleware] error:", err);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
