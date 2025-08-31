import { NextRequest, NextResponse } from "next/server";

// --- Config
const MAX_TOUCHES = 10;
const UTM_KEYS = ["utm_source","utm_medium","utm_campaign","utm_term","utm_content"] as const;
const CLICK_IDS = ["gclid","wbraid","gbraid","msclkid","fbclid","ttclid","uetmsclkid"] as const;
const SEARCH_ENGINES = [
  /(^|\.)google\./i, /(^|\.)bing\./i, /(^|\.)yahoo\./i, /(^|\.)duckduckgo\./i,
  /(^|\.)baidu\./i, /(^|\.)yandex\./i, /(^|\.)ecosia\./i, /(^|\.)ask\./i
];

const nowIso = () => new Date().toISOString();
const newId  = () => (globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2)) as string;

// --- base64url helpers (Edge-safe)
function toB64Url(obj: any): string {
  const json = typeof obj === "string" ? obj : JSON.stringify(obj);
  const bytes = new TextEncoder().encode(json);
  let bin = ""; for (let i=0;i<bytes.length;i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
}
function fromB64Url<T=any>(s: string): T | null {
  try {
    const pad = "=".repeat((4 - (s.length % 4)) % 4);
    const b64 = s.replace(/-/g,"+").replace(/_/g,"/")+pad;
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i=0;i<bin.length;i++) bytes[i] = bin.charCodeAt(i);
    const json = new TextDecoder().decode(bytes);
    return JSON.parse(json);
  } catch { return null; }
}

// read both base64url and legacy percent-encoded JSON safely
function readCookieJson<T=any>(req: NextRequest, name: string): T | null {
  const raw = req.cookies.get(name)?.value; if (!raw) return null;
  // try base64url
  const b64 = fromB64Url<T>(raw); if (b64) return b64;
  // try legacy (%-encoded / plain)
  let s = raw;
  for (let i=0;i<3;i++){
    try { return JSON.parse(s); } catch {}
    try { s = decodeURIComponent(s); } catch { break; }
  }
  return null;
}

function readConsent(req: NextRequest) {
  const c = readCookieJson<any>(req, "consent_state") || {};
  const g = (k:string) => c?.[k] === "granted" || c?.[k] === true;
  return {
    analytics: g("analytics_storage"),
    ads: g("ad_storage") || g("ad_user_data") || g("ad_personalization"),
  };
}

// Channel/Source/Medium classification
function classify(url: URL, referrer: string | null, selfHost: string) {
  const qp = url.searchParams;
  const hasUTM = !!qp.get("utm_source");
  const clickId = CLICK_IDS.map(k=>qp.get(k)).find(Boolean);

  if (hasUTM) {
    return {
      ch: "utm",
      src: qp.get("utm_source") || "unknown",
      med: qp.get("utm_medium") || (clickId ? "cpc" : "campaign"),
      cmp: qp.get("utm_campaign") || undefined,
      term: qp.get("utm_term") || undefined,
      cnt: qp.get("utm_content") || undefined,
    };
  }

  const ref = referrer ? new URL(referrer) : null;
  const isSelf = ref && ref.hostname.replace(/^www\./,"") === selfHost.replace(/^www\./,"");

  if (!ref || isSelf) {
    // Direct: no external referrer
    return { ch: "direct", src: "(direct)", med: "(none)" };
  }

  // Organic if known search engine
  const isSearch = SEARCH_ENGINES.some(rx => rx.test(ref!.hostname));
  if (isSearch) {
    // Source is the engine host sans www.
    const src = ref.hostname.replace(/^www\./,"").split(".")[0];
    return { ch: "organic", src, med: "organic" };
  }

  // Referral
  return { ch: "referral", src: ref.hostname.replace(/^www\./,""), med: "referral" };
}

export function middleware(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const res = NextResponse.next();
    const selfHost = url.hostname.replace(/^www\./,"");

    // --- Session cookies
    const existingSession = readCookieJson<any>(req, "_digify_session") || {};
    const THIRTY_MIN = 30 * 60 * 1000;
    const now = Date.now();

    let sid: string = existingSession?.sid;
    let startedAt: string = existingSession?.startedAt;
    let lastAt: string = existingSession?.lastAt;

    const lastAtMs = lastAt ? new Date(lastAt).getTime() : NaN;
    const stale = !lastAt || Number.isNaN(lastAtMs) || now - lastAtMs > THIRTY_MIN;

    if (!sid || stale) { sid = newId(); startedAt = nowIso(); }
    lastAt = nowIso();

    // HttpOnly session
    res.cookies.set("_digify_session", toB64Url({ sid, startedAt, lastAt }), {
      httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 30*60
    });
    // JS-readable mirror
    res.cookies.set("_digify_sid", sid, {
      httpOnly: false, secure: true, sameSite: "lax", path: "/", maxAge: 30*60
    });

    // --- Attribution (all touches)
    const consent = readConsent(req);
    const persist = !!(consent.analytics || consent.ads);

    const existing = readCookieJson<any>(req, "_digify") || {};
    const touches: any[] = Array.isArray(existing.touches) ? existing.touches.slice() : [];

    const base = classify(url, req.headers.get("referer"), selfHost);
    // Build a minimal touch object to limit cookie size
    const touch: any = {
      ts: nowIso(),
      lp: url.pathname + (url.search || ""),
      src: base.src,
      med: base.med,
      ch: base.ch,
    };
    if (base.cmp)  touch.cmp = base.cmp;
    if (base.term) touch.term = base.term;
    if (base.cnt)  touch.cnt = base.cnt;
    for (const k of CLICK_IDS) { const v = url.searchParams.get(k); if (v) touch[k] = v; }

    // Only append if it’s a meaningful navigation (avoid exact duplicates)
    const last = touches[touches.length - 1];
    const isDup = last && last.lp === touch.lp && last.src === touch.src && last.med === touch.med && last.ch === touch.ch;
    if (!isDup) touches.push(touch);
    while (touches.length > MAX_TOUCHES) touches.shift();

    const digify = {
      visitor_id: existing.visitor_id || newId(),
      touches,
    };

    // JS-readable attribution (session-only until consent)
    res.cookies.set("_digify", toB64Url(digify), {
      httpOnly: false, secure: true, sameSite: "lax", path: "/",
      ...(persist ? { maxAge: 365*24*60*60 } : {})
    });

    // Optional headers
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
