// Utility helpers for client code
export type DigifyCookie = {
visitor_id: string;
first_touch?: Record<string,string> & { ts: string };
last_touch?: Record<string,string> & { ts: string };
};


export type DigifySession = {
sid: string;
startedAt: string;
lastAt: string;
};


export function readCookie(name: string): any | null {
if (typeof document === 'undefined') return null;
const m = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\/+^])/g, '\\$1') + '=([^;]*)'));
if (!m) return null;
try { return JSON.parse(decodeURIComponent(m[1])); } catch { return null; }
}


export function getDigify(): { digify: DigifyCookie | null, session: DigifySession | null } {
return { digify: readCookie('_digify'), session: readCookie('_digify_session') } as any;
}


export async function sha256Hex(input: string): Promise<string> {
const enc = new TextEncoder().encode(input.trim().toLowerCase());
const buf = await crypto.subtle.digest('SHA-256', enc);
return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('');
}
