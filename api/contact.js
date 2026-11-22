import nodemailer from 'nodemailer'

const escapeHtml = value => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char])

// Vercel Node.js serverless function. SMTP credentials stay on the server.
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { name, email, subject, message } = req.body || {}
  if (![name, email, subject, message].every(value => typeof value === 'string' && value.trim()) || name.length > 100 || email.length > 254 || subject.length > 150 || message.length > 5000 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || /[\r\n]/.test(name + email + subject)) return res.status(400).json({ error: 'Please provide valid contact details.' })
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL } = process.env
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_EMAIL) return res.status(503).json({ error: 'Email is not configured yet. Please contact me directly by email.' })
  const transport = nodemailer.createTransport({ host: SMTP_HOST, port: Number(SMTP_PORT), secure: Number(SMTP_PORT) === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } })
  try {
    await transport.sendMail({ from: SMTP_USER, to: CONTACT_EMAIL, replyTo: email, subject: `Portfolio inquiry: ${subject}`, text: `Name: ${name}\nEmail: ${email}\n\n${message}` })
    try {
      await transport.sendMail({
        from: SMTP_USER,
        to: email,
        subject: 'Thanks for reaching out!',
        text: `Hi ${name},\n\nThank you for reaching out. I've received your message and will get back to you as soon as I can.\n\nBest,\nShreya Singh`,
        html: `<div style="background:#10110f;padding:32px 16px;font-family:Arial,sans-serif;color:#eef0e9"><div style="max-width:560px;margin:auto;background:#191b17;border:1px solid #3a3d36;border-radius:12px;overflow:hidden"><div style="background:#c8fb74;color:#10110f;padding:24px 28px;font-size:24px;font-weight:bold">Shreya Singh<span style="color:#596b35">.</span></div><div style="padding:32px 28px;line-height:1.7"><p>Hi ${escapeHtml(name)},</p><h1 style="font-size:26px;line-height:1.2;color:#c8fb74">Thank you for reaching out!</h1><p>I've received your message and appreciate you getting in touch. I'll get back to you as soon as I can.</p><p>Best,<br><strong>Shreya Singh</strong><br>Full-stack developer</p><p style="border-top:1px solid #3a3d36;padding-top:20px;color:#aab1a5;font-size:13px">This is an automatic confirmation that your message was received.</p></div></div></div>`,
      })
      return res.status(200).json({ ok: true, confirmationSent: true })
    } catch (error) {
      console.error('Confirmation email failed:', error.message)
      return res.status(200).json({ ok: true, confirmationSent: false })
    }
  } catch (error) { console.error('Contact delivery failed:', error.message); return res.status(500).json({ error: 'Message could not be sent.' }) }
}
