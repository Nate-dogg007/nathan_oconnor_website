import { NextRequest, NextResponse } from "next/server";

// ------- Config -------
const MAX_TOUCHES = 10;
// (UTM_KEYS kept for reference; not used to classify)
const UTM_KEYS = ["utm_source","utm_medium","utm_campaign","utm_term","utm_content"] as const;
// Include all click IDs you want to capture into touches:
const CLICK_IDS = [
  "gclid","wbraid","gbraid","msclkid","fbclid","ttclid","uetmsclkid",
  "li_fat_id","twclid"
] as const;

const SEARCH_ENGINES = [
  /(^|\.)google\./i, /(^|\.)bing\./i, /(^|\.)yahoo\./i, /(^|\.)duckduckgo\./i,
  /(^|\.)baidu\./i, /(^|\.)yandex\./i, /(^|\.)ecosia\./i, /(^|\.)ask\./i
];

// File extensions and paths we DO NOT want to record as touches
const ASSET_EXTS = [
  ".js",".css",".map",".ico",".png",".jpg",".jpeg",".gif",".webp",".svg",".avif",
  ".woff",".woff2",".ttf",".otf",".eot",".txt",".xml",".json"
];
const IGNORE_PATH_PREFIXES = ["/_next/","/assets/","/static/"];

// ------- Helpers -------
const nowIso = () => new Date().toISOString();
const newId  = () => (globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2)) as string;

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
// Cap per-step time so a long idle tab doesn't explode totals
const STEP_CAP_MS = 30 * 60 * 1000; // 30 minutes

function clampStepDeltaMs(prevISO?: string, nowISO?: string) {
  if (!prevISO || !nowISO) return 0;
  const prev = new Date(prevISO).getTime();
  const now  = new Date(nowISO).getTime();
  if (!Number.isFinite(prev) || !Number.isFinite(now) || now <= prev) return 0;
  return Math.min(now - prev, STEP_CAP_MS);
}


// Read cookie that may be base64url (new) or percent-encoded JSON (legacy)
function readCookieJson<T=any>(req: NextRequest, name: string): T | null {
  const raw = req.cookies.get(name)?.value; if (!raw) return null;
  const b64 = fromB64Url<T>(raw); if (b64) return b64;
  let s = raw;
  for (let i=0;i<3;i++){ try { return JSON.parse(s); } catch {} try { s = decodeURIComponent(s); } catch { break; } }
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

// Map click IDs to platforms
function platformFromClickId(url: URL): string | undefined {
  if (url.searchParams.get("gclid") || url.searchParams.get("gbraid") || url.searchParams.get("wbraid")) return "google";
  if (url.searchParams.get("msclkid") || url.searchParams.get("uetmsclkid")) return "bing";
  if (url.searchParams.get("fbclid")) return "facebook";
  if (url.searchParams.get("ttclid")) return "tiktok";
  if (url.searchParams.get("li_fat_id")) return "linkedin";
  if (url.searchParams.get("twclid")) return "twitter";
  return undefined;
}

// UTMs are descriptive only; they do not override channel/source/medium
function classify(url: URL, referrer: string | null, selfHost: string) {
  const qp = url.searchParams;
  const clickIdPresent =
    qp.has("gclid") || qp.has("gbraid") || qp.has("wbraid") ||
    qp.has("msclkid") || qp.has("uetmsclkid") ||
    qp.has("fbclid") || qp.has("ttclid") ||
    qp.has("li_fat_id") || qp.has("twclid");

  // 1) Click ID → paid / cpc; src from platform mapping
  if (clickIdPresent) {
    return { ch: "paid", src: platformFromClickId(url) || "ad_platform", med: "cpc" };
  }

  // 2) Referrer-based (organic search / organic social / referral / direct)
  const ref = referrer ? new URL(referrer) : null;
  const isSelf = ref && ref.hostname.replace(/^www\./, "") === selfHost.replace(/^www\./, "");
  if (!ref || isSelf) return { ch: "direct", src: "(direct)", med: "(none)" };

  const host = ref.hostname.replace(/^www\./, "").toLowerCase();

  // Organic search
  const isSearch = SEARCH_ENGINES.some(rx => rx.test(ref.hostname));
  if (isSearch) {
    const engine = host.split(".")[0];
    return { ch: "organic", src: engine, med: "organic" };
  }

  // Organic social
  if (host.includes("facebook.com")) return { ch: "organic", src: "facebook", med: "social" };
  if (host.includes("twitter.com") || host.includes("x.com")) return { ch: "organic", src: "twitter", med: "social" };
  if (host.includes("linkedin.com")) return { ch: "organic", src: "linkedin", med: "social" };
  if (host.includes("tiktok.com")) return { ch: "organic", src: "tiktok", med: "social" };

  // Everything else → referral
  return { ch: "referral", src: host, med: "referral" };
}

function isTrackablePath(pathname: string): boolean {
  if (IGNORE_PATH_PREFIXES.some(p => pathname.startsWith(p))) return false;
  if (ASSET_EXTS.some(ext => pathname.endsWith(ext))) return false;
  if (pathname === "/consent-shim.js") return false; // specifically ignore
  return true;
}

// ------- Middleware -------
export function middleware(req: NextRequest) {
  try {
    // Only process GET navigations (avoid POST/OPTIONS noise)
    if (req.method !== "GET") return NextResponse.next();

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

    // HttpOnly session (essential)
    res.cookies.set("_digify_session", toB64Url({ sid, startedAt, lastAt }), {
      httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 30*60
    });
    // JS-readable session id mirror
    res.cookies.set("_digify_sid", sid, {
      httpOnly: false, secure: true, sameSite: "lax", path: "/", maxAge: 30*60
    });

    // --- Attribution (all touches)
    const consent = readConsent(req);
    const persist = !!(consent.analytics || consent.ads);

    const existing = readCookieJson<any>(req, "_digify") || {};
    const touches: any[] = Array.isArray(existing.touches) ? existing.touches.slice() : [];

    // Only record real top-level navigations (skip prefetch, assets, RSC/data)
    const isDocument = req.headers.get("sec-fetch-dest") === "document";
    const isNavigate = req.headers.get("sec-fetch-mode") === "navigate" || req.headers.get("sec-fetch-user") === "?1";
    const isPrefetch = req.headers.get("purpose") === "prefetch" || req.headers.get("x-middleware-prefetch") === "1";

    if (isDocument && isNavigate && !isPrefetch && isTrackablePath(url.pathname)) {
      const base = classify(url, req.headers.get("referer"), selfHost);

      // Build touch (no query string in lp)
      const touch: any = {
        ts: nowIso(),
        lp: url.pathname,
        src: base.src,
        med: base.med,
        ch: base.ch,
      };

      // Attach UTMs as metadata only (do not override src/med/ch)
      const utm_source   = url.searchParams.get("utm_source");
      const utm_medium   = url.searchParams.get("utm_medium");
      const utm_campaign = url.searchParams.get("utm_campaign");
      const utm_term     = url.searchParams.get("utm_term");
      const utm_content  = url.searchParams.get("utm_content");
      if (utm_source)   touch.utm_src  = utm_source;
      if (utm_medium)   touch.utm_med  = utm_medium;
      if (utm_campaign) touch.utm_cmp  = utm_campaign;
      if (utm_term)     touch.utm_term = utm_term;
      if (utm_content)  touch.utm_cnt  = utm_content;

      // Capture click IDs separately
      for (const k of CLICK_IDS) {
        const v = url.searchParams.get(k);
        if (v) touch[k] = v;
      }

      // Stronger de-dupe: treat immediate redirect/replace as the same touch
      const last = touches[touches.length - 1];
      const within2s = last ? (new Date(touch.ts).getTime() - new Date(last.ts).getTime()) < 2000 : false;
      const sameAttrs = last && last.lp === touch.lp && last.src === touch.src && last.med === touch.med && last.ch === touch.ch;

      if (!(sameAttrs && within2s)) {
        touches.push(touch);
        while (touches.length > MAX_TOUCHES) touches.shift();
      }
      // --- Visitor-level rollups ---
      const prevTotalMs = (existing.total_time_sec ? existing.total_time_sec * 1000 : 0);
      const lastTouchTs = touches.length > 1
        ? touches[touches.length - 2]?.ts
        : (existing.last_touch_ts as string | undefined);
      
      // Add bounded delta since the previous touch
      const stepDeltaMs = clampStepDeltaMs(lastTouchTs, touches[touches.length - 1]?.ts);
      const totalTimeMs = prevTotalMs + stepDeltaMs;
      
      // Distinct pages seen (lp is path-only, no query)
      const distinctPages = new Set<string>(touches.map(t => t.lp));
      const distinctPagesCount = distinctPages.size;
      const multiPage = distinctPagesCount > 1;
      
      // Persist rollups back onto the existing structure
      existing.total_time_sec = Math.floor(totalTimeMs / 1000);
      existing.distinct_pages_count = distinctPagesCount;
      existing.multi_page = multiPage;
      existing.last_touch_ts = touches[touches.length - 1]?.ts;

    }

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
