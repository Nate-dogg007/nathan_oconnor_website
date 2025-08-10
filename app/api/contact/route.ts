import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, message, company } = body || {}

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 })
    }

    // TODO: integrate with your email/SaaS (SMTP/Resend/SendGrid/etc.)
    console.log("Contact message:", { name, email, message, company })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
