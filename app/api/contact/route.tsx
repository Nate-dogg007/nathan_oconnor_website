import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const GMAIL_USER = process.env.GMAIL_USER
    const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD
    const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL

    console.log("[v0] Environment variables check:", {
      hasGmailUser: !!GMAIL_USER,
      hasGmailPassword: !!GMAIL_APP_PASSWORD,
      hasContactEmail: !!CONTACT_TO_EMAIL,
      gmailUser: GMAIL_USER ? `${GMAIL_USER.substring(0, 3)}...` : "undefined",
      contactEmail: CONTACT_TO_EMAIL ? `${CONTACT_TO_EMAIL.substring(0, 3)}...` : "undefined",
    })

    const body = await req.json()
    const { name, email, message, company, phone } = body || {}

    console.log("[v0] Form submission received:", {
      name,
      email: email ? `${email.substring(0, 3)}...` : "undefined",
      hasMessage: !!message,
    })

    if (!name || !email || !message) {
      console.log("[v0] Missing required fields")
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

    if (GMAIL_USER && GMAIL_APP_PASSWORD && CONTACT_TO_EMAIL) {
      console.log("[v0] Attempting to send email via Gmail SMTP")

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: GMAIL_USER,
          pass: GMAIL_APP_PASSWORD,
        },
      })

      try {
        await transporter.sendMail({
          from: GMAIL_USER,
          to: CONTACT_TO_EMAIL,
          replyTo: email, // Allow replying directly to the form submitter
          subject,
          text,
          html,
        })
        console.log("[v0] Email sent successfully")
        return NextResponse.json({ ok: true, delivered: true })
      } catch (emailError) {
        console.error("[v0] Email sending failed:", emailError)
        return NextResponse.json({ ok: false, error: "Failed to send email via SMTP" }, { status: 500 })
      }
    }

    // Not configured: accept submission, mark not delivered
    console.log("[v0] Email not configured - environment variables missing")
    console.log("Contact message (email not configured):", { name, email, message, company, phone })
    return NextResponse.json({ ok: true, delivered: false, reason: "email_not_configured" })
  } catch (err) {
    console.error("[v0] Contact API error:", err)
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
