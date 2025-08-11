import { NextResponse } from "next/server"

const {
  RESEND_API_KEY,
  CONTACT_TO_EMAIL,
  CONTACT_FROM_EMAIL,
  // If you later want SMTP, we can add it back in a way that doesn't break builds without nodemailer installed.
} = process.env

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, message, company, phone } = body || {}
    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 })
    }

    const subject = `New contact form message from ${name}`
    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : undefined,
      phone ? `Phone: ${phone}` : undefined,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n")
    const html = `
      <h2>New contact form message</h2>
      <p><b>Name:</b> ${escapeHtml(name)}</p>
      <p><b>Email:</b> ${escapeHtml(email)}</p>
      ${company ? `<p><b>Company:</b> ${escapeHtml(company)}</p>` : ""}
      ${phone ? `<p><b>Phone:</b> ${escapeHtml(phone)}</p>` : ""}
      <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    `

    // Resend via HTTP API (no SDK needed)
    if (RESEND_API_KEY && CONTACT_TO_EMAIL && CONTACT_FROM_EMAIL) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: CONTACT_FROM_EMAIL,
          to: [CONTACT_TO_EMAIL],
          subject,
          text,
          html,
        }),
      })

      if (!res.ok) {
        const errText = await safeReadText(res).catch(() => "")
        console.error("Resend API error:", res.status, errText)
        return NextResponse.json({ ok: false, error: "Email provider error (Resend)" }, { status: 500 })
      }

      return NextResponse.json({ ok: true, delivered: true })
    }

    // Not configured: accept submission, mark not delivered
    console.log("Contact message (email not configured):", { name, email, message, company, phone })
    return NextResponse.json({ ok: true, delivered: false, reason: "email_not_configured" })
  } catch (err) {
    console.error("Contact API error:", err)
    return NextResponse.json({ ok: false, error: "Failed to send email." }, { status: 500 })
  }
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

async function safeReadText(res: Response) {
  try {
    return await res.text()
  } catch {
    return ""
  }
}
