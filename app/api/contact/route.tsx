import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(req: Request) {
  console.log("[v0] Contact API called")

  try {
    const RESEND_API_KEY = process.env.RESEND_API_KEY
    const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL
    const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL

    console.log("[v0] Environment variables:", {
      hasResendKey: !!RESEND_API_KEY,
      resendKeyLength: RESEND_API_KEY?.length || 0,
      hasContactToEmail: !!CONTACT_TO_EMAIL,
      contactToEmail: CONTACT_TO_EMAIL,
      hasContactFromEmail: !!CONTACT_FROM_EMAIL,
      contactFromEmail: CONTACT_FROM_EMAIL,
    })

    const body = await req.json()
    console.log("[v0] Request body:", body)

    const { name, email, message, company, phone } = body

    if (!name || !email || !message) {
      console.log("[v0] Missing required fields:", { name: !!name, email: !!email, message: !!message })
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 })
    }

    if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
      console.log("[v0] Missing environment variables")
      return NextResponse.json({
        ok: true,
        delivered: false,
        reason: "Email not configured - missing environment variables",
      })
    }

    console.log("[v0] Initializing Resend...")
    const resend = new Resend(RESEND_API_KEY)

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
      `,
    }

    console.log("[v0] Sending email with data:", {
      from: emailData.from,
      to: emailData.to,
      subject: emailData.subject,
    })

    const { data, error } = await resend.emails.send(emailData)

    if (error) {
      console.error("[v0] Resend API error:", error)
      return NextResponse.json(
        {
          ok: false,
          error: "Failed to send email",
          details: error,
        },
        { status: 500 },
      )
    }

    console.log("[v0] Email sent successfully:", data)
    return NextResponse.json({ ok: true, delivered: true, emailId: data?.id })
  } catch (error) {
    console.error("[v0] Contact API error:", error)
    return NextResponse.json(
      {
        ok: false,
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
