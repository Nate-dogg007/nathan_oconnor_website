import { NextRequest, NextResponse } from "next/server";

const UTM_KEYS = ["utm_source","utm_medium","utm_campaign","utm_term","utm_content"] as const;
const CLICK_IDS = ["gclid","wbraid","gbraid","msclkid","fbclid","ttclid","uetmsclkid"] as const;

function jsonParseSafe<T=any>(s: string | undefined | null): T | null {
  try { return s ? JSON.parse(decodeURIComponent(s)) : null; } catch { return null; }
}

function readConsent(req: NextRequest) {
  const raw = req.cookies.get("consent_state")?.value;
  const c = jsonParseSafe<any>(raw) || {};
  const granted = (k: string) => c[k] === "granted" || c[k] === true;
  return {
    analytics: granted("analytics_storage"),
    ads: granted("ad_storage") || granted("ad_user_data") || granted("ad_personalization"),
  };
}

const nowIso = () => new Date().toISOString();
const newId = () => crypto.randomUUID();

function parseAttribution(url: URL, referrer: string | null) {
  const at: Record<string,string> = {};
  for (const k of UTM_KEYS) { const v = url.searchParams.get(k); if (v) at[k] = v; }
  for (const k of CLICK_IDS) { const v = url.searchParams.get(k); if (v) at[k] = v; }
  if (referrer) at.referrer = referrer;
  at.landing_page = url.pathname + (url.search || "");
  return at;
}

function readCookie(req: NextRequest, name: string) {
  const v = req.cookies.get(name)?.value;
  if (!v) return null;
  try { return JSON.parse(decodeURIComponent(v)); } catch { return null; }
}

export function middleware(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const res = NextResponse.next();

    // 1) Session cookie (essential)
    const session = readCookie(req, "_digify_session") || {};
    const now = Date.now();
    const THIRTY_MIN = 30 * 60 * 1000;
    let sid = session.sid as string | undefined;
    let startedAt = session.startedAt as string | undefined;
    let lastAt = session.lastAt as string | undefined;

    if (!sid || !lastAt || now - new Date(lastAt).getTime() > THIRTY_MIN) {
      sid = newId();
      startedAt = nowIso();
    }
    lastAt = nowIso();

    // ✅ Correct signature
    res.cookies.set("_digify_session", encodeURIComponent(JSON.stringify({ sid, startedAt, lastAt })), {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 60, // 30 minutes
    });

    // 2) Attribution (respect consent)
    const consent = readConsent(req);
    const existing = readCookie(req, "_digify") || {};
    const incoming = parseAttribution(url, req.headers.get("referer"));

    const digify: any = {
      visitor_id: existing.visitor_id || newId(),
      first_touch: existing.first_touch || (Object.keys(incoming).length ? { ...incoming, ts: nowIso() } : undefined),
      last_touch: Object.keys(incoming).length ? { ...incoming, ts: nowIso() } : existing.last_touch || undefined,
    };

    const persist = !!(consent.analytics || consent.ads);
    const maxAgeSec = persist ? 365 * 24 * 60 * 60 : undefined;

    // ✅ Correct signature
    res.cookies.set("_digify", encodeURIComponent(JSON.stringify(digify)), {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      ...(maxAgeSec ? { maxAge: maxAgeSec } : {}),
    });

    // (Optional) expose headers for client
    res.headers.set("x-dfy-visitor", digify.visitor_id);
    res.headers.set("x-dfy-session", sid!);

    return res;
  } catch (err) {
    // Don’t break the site if attribution fails — log and continue
    console.error("[digify middleware] error:", err);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
