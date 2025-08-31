import { NextRequest, NextResponse } from 'next/server';


function nowIso() { return new Date().toISOString(); }
function newId() { return crypto.randomUUID(); }


function parseAttribution(url: URL, referrer: string | null) {
const at: Record<string,string> = {};
for (const k of UTM_KEYS) {
const v = url.searchParams.get(k);
if (v) at[k] = v;
}
for (const k of CLICK_IDS) {
const v = url.searchParams.get(k);
if (v) at[k] = v;
}
if (referrer) at.referrer = referrer;
at.landing_page = url.pathname + (url.search || '');
return at;
}


function readCookie(req: NextRequest, name: string) {
const v = req.cookies.get(name)?.value;
if (!v) return null;
try { return JSON.parse(decodeURIComponent(v)); } catch { return null; }
}


function cookie(name: string, value: any, opts: {maxAgeSec?: number, httpOnly?: boolean}) {
return {
name,
value: encodeURIComponent(JSON.stringify(value)),
httpOnly: opts.httpOnly ?? true,
secure: true,
sameSite: 'lax' as const,
path: '/',
...(opts.maxAgeSec ? { maxAge: opts.maxAgeSec } : {}),
};
}


export function middleware(req: NextRequest) {
const url = new URL(req.url);
const res = NextResponse.next();


// 1) Always manage session cookie (essential)
const session = readCookie(req, '_digify_session') || {};
const now = Date.now();
const THIRTY_MIN = 30 * 60 * 1000;
let sid = session.sid as string | undefined;
let startedAt = session.startedAt as string | undefined;
let lastAt = session.lastAt as string | undefined;


if (!sid || !lastAt || (now - new Date(lastAt).getTime()) > THIRTY_MIN) {
sid = newId();
startedAt = nowIso();
}
lastAt = nowIso();
res.cookies.set(cookie('_digify_session', { sid, startedAt, lastAt }, { maxAgeSec: 30 * 60, httpOnly: true }));


// 2) Attribution + visitor cookie (respect consent)
const consent = readConsent(req);
const existing = readCookie(req, '_digify') || {};
const incoming = parseAttribution(url, req.headers.get('referer'));


// Prepare structure
const digify = {
visitor_id: existing.visitor_id || newId(),
first_touch: existing.first_touch || (Object.keys(incoming).length ? { ...incoming, ts: nowIso() } : undefined),
last_touch: Object.keys(incoming).length ? { ...incoming, ts: nowIso() } : (existing.last_touch || undefined),
} as any;


// Only persist across visits if consent allows analytics or ads.
const persist = !!(consent.analytics || consent.ads);
const maxAgeSec = persist ? 365 * 24 * 60 * 60 : undefined; // 1 year vs session cookie
res.cookies.set(cookie('_digify', digify, { maxAgeSec, httpOnly: true }));


// Expose lightweight header for client hooks (no PII)
res.headers.set('x-dfy-visitor', digify.visitor_id);
res.headers.set('x-dfy-session', sid);
return res;
}


export const config = {
matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};
