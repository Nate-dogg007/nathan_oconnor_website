"use server"

import nodemailer from "nodemailer"

interface ContactFormData {
  name: string
  email: string
  company?: string
  phone?: string
  message: string
}

export async function sendContactEmail(formData: ContactFormData) {
  // Configure your SMTP transporter
  // You will need to set these environment variables in your Vercel project settings
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number.parseInt(process.env.SMTP_PORT || "587"), // Default to 587 for TLS
    secure: process.env.SMTP_SECURE === "true", // Use 'true' for 465, 'false' for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER, // Sender address (usually your email)
      to: "info@nathanoconnor.co.uk", // Recipient email address
      subject: `New Contact Form Submission from ${formData.name}`,
      html: `
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        ${formData.company ? `<p><strong>Company:</strong> ${formData.company}</p>` : ""}
        ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${formData.message}</p>
      `,
    })
    return { success: true, message: "Email sent successfully!" }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, message: "Failed to send email." }
  }
}
