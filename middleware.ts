// /middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(_req: NextRequest) {
  const res = NextResponse.next();
  const now = new Date().toISOString();

  // Generate a safe, short value (no JSON parsing needed later)
  const sid = (globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2)) as string;

  res.cookies.set("_digify_session", `sid=${sid}|t=${encodeURIComponent(now)}`, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 30 * 60,
  });

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
