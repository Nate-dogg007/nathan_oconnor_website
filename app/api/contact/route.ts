import { NextResponse } from "next/server"

const {
  RESEND_API_KEY,
  CONTACT_TO_EMAIL,
  CONTACT_FROM_EMAIL,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  SMTP_SECURE,
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

    // Try Resend
    if (RESEND_API_KEY && CONTACT_TO_EMAIL && CONTACT_FROM_EMAIL) {
      const { Resend } = await import("resend")
      const resend = new Resend(RESEND_API_KEY)
      const result = await resend.emails.send({
        to: CONTACT_TO_EMAIL,
        from: CONTACT_FROM_EMAIL,
        subject,
        text,
        html,
      })
      if ((result as any)?.error) {
        return NextResponse.json({ ok: false, error: "Email provider error (Resend)" }, { status: 500 })
      }
      return NextResponse.json({ ok: true, delivered: true })
    }

    // Fallback: SMTP
    if (SMTP_HOST && SMTP_USER && SMTP_PASS && CONTACT_TO_EMAIL && CONTACT_FROM_EMAIL) {
      const nodemailer = (await import("nodemailer")).default
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT || 587),
        secure: String(SMTP_SECURE || "").toLowerCase() === "true" || Number(SMTP_PORT) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      })

      await transporter.sendMail({
        from: CONTACT_FROM_EMAIL,
        to: CONTACT_TO_EMAIL,
        subject,
        text,
        html,
      })

      return NextResponse.json({ ok: true, delivered: true })
    }

    // Not configured: accept submission but mark not delivered
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
