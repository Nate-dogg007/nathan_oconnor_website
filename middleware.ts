import { NextRequest, NextResponse } from "next/server";

// ------- Config -------
const MAX_TOUCHES = 10;
const UTM_KEYS = ["utm_source","utm_medium","utm_campaign","utm_term","utm_content"] as const;
const CLICK_IDS = ["gclid","wbraid","gbraid","msclkid","fbclid","ttclid","uetmsclkid"] as const;
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

  if (!ref || isSelf) return { ch: "direct", src: "(direct)", med: "(none)" };

  const isSearch = SEARCH_ENGINES.some(rx => rx.test(ref!.hostname));
  if (isSearch) {
    const src = ref.hostname.replace(/^www\./,"").split(".")[0];
    return { ch: "organic", src, med: "organic" };
  }

  return { ch: "referral", src: ref.hostname.replace(/^www\./,""), med: "referral" };
}

function isTrackablePath(pathname: string): boolean {
  if (IGNORE_PATH_PREFIXES.some(p => pathname.startsWith(p))) return false;
  if (ASSET_EXTS.some(ext => pathname.endsWith(ext))) return false;
  // specifically ignore the consent shim
  if (pathname === "/consent-shim.js") return false;
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

    // Filter: only track actual page paths
    if (isTrackablePath(url.pathname)) {
      const base = classify(url, req.headers.get("referer"), selfHost);

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
      for (const k of CLICK_IDS) {
        const v = url.searchParams.get(k);
        if (v) touch[k] = v;
      }

      const last = touches[touches.length - 1];
      const isDup = last && last.lp === touch.lp && last.src === touch.src && last.med === touch.med && last.ch === touch.ch;
      if (!isDup) touches.push(touch);
      while (touches.length > MAX_TOUCHES) touches.shift();
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
  // This matcher already skips Next static assets, but we still keep a path filter above for safety.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
