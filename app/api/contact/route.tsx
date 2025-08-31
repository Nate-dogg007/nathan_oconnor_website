import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(req: Request) {
  console.log("[v0] Contact API called")

  try {
    const RESEND_API_KEY = process.env.RESEND_API_KEY
    const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL
    const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL

    const body = await req.json().catch(() => null)
    if (!body) {
      console.log("[v0] Invalid JSON body")
      return NextResponse.json({ ok: false, error: "Bad JSON" }, { status: 400 })
    }

    // 🟢 NEW: pick up attrib from the client
    const { name, email, message, company, phone, attrib } = body

    if (!name || !email || !message) {
      console.log("[v0] Missing required fields:", { name: !!name, email: !!email, message: !!message })
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 })
    }

    // 🟢 NEW: normalised server-side payload you can forward to Twenty later
    const nowIso = new Date().toISOString()
    const sourceIp = req.headers.get("x-forwarded-for") || "unknown"
    const userAgent = req.headers.get("user-agent") || "unknown"

    const crmPayload = {
      name,
      email,
      phone,
      company,
      message,
      digify: attrib || {},           // visitor_id, session_id, FT/LT utms/click ids, hashes
      consent: {
        // If your CMP posts consent state to the server later, add it here.
        collectedAt: nowIso,
      },
      meta: {
        receivedAt: nowIso,
        sourceIp,
        userAgent,
        page: attrib?.lt_landing_page || attrib?.ft_landing_page || null,
      },
    }

    console.log("[CONTACT] Normalised payload (for CRM):", JSON.stringify(crmPayload))

    // Email sending (unchanged, but we add a tiny footer showing we captured attrib)
    if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
      console.log("[v0] Missing environment variables for email — returning delivered:false")
      return NextResponse.json({
        ok: true,
        delivered: false,
        reason: "Email not configured - missing environment variables",
      })
    }

    const resend = new Resend(RESEND_API_KEY)

    // 🟢 OPTIONAL: include minimal attribution in the email for visibility (safe, no raw PII)
    // Keep it short; full JSON is logged above.
    const attribSummary = (() => {
      if (!attrib) return ""
      const parts: string[] = []
      if (attrib.digify_visitor_id) parts.push(`visitor_id: ${attrib.digify_visitor_id}`)
      if (attrib.digify_session_id) parts.push(`session_id: ${attrib.digify_session_id}`)
      const utmBits = ["ft_utm_source","ft_utm_medium","ft_utm_campaign","lt_utm_source","lt_utm_medium","lt_utm_campaign"]
        .filter((k) => attrib[k]) as string[]
      if (utmBits.length) parts.push("utm: " + utmBits.map((k) => `${k}=${attrib[k]}`).join(", "))
      return parts.length ? `<hr/><p style="font-size:12px;color:#666"><strong>Attribution:</strong> ${parts.join(" · ")}</p>` : ""
    })()

    const emailData = {
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New contact form message from ${name}`,
      html: `
        <h2>New contact form message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
        ${attribSummary}
      `,
    }

    const { data, error } = await resend.emails.send(emailData)

    if (error) {
      console.error("[v0] Resend API error:", error)
      return NextResponse.json({ ok: false, error: "Failed to send email", details: error }, { status: 500 })
    }

    console.log("[v0] Email sent successfully:", data)

    // 🟢 FUTURE: Forward to Twenty (server-to-server)
    // if (process.env.TWENTY_API_URL && process.env.TWENTY_API_KEY) {
    //   const resp = await fetch(`${process.env.TWENTY_API_URL}/leads`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${process.env.TWENTY_API_KEY}`,
    //     },
    //     body: JSON.stringify(crmPayload),
    //   })
    //   console.log("[Twenty] lead create status:", resp.status)
    // }

    return NextResponse.json({ ok: true, delivered: true, emailId: data?.id })
  } catch (error) {
    console.error("[v0] Contact API error:", error)
    return NextResponse.json(
      { ok: false, error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
