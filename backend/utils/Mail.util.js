import nodemailer from "nodemailer";
import config from "../config/config.js";
// Works with Gmail SMTP (free, use an App Password, not your real password)
// or swap host/port for Brevo / Resend SMTP if you outgrow Gmail's sending limits.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.SMTP_EMAIL,
    pass: config.SMTP_PASSWORD,
  },
});

export async function sendOtpEmail(toEmail, otp, purpose) {
  if (config.NODE_ENV !== "production") {
    console.log(`[DEV] OTP for ${toEmail} (${purpose}): ${otp}`);
  }
  const subject =
    purpose === "register"
      ? "Verify your Sehat Sathi account"
      : "Your Sehat Sathi login code";

  try {
    const info = await transporter.sendMail({
      from: `"Sehat Sathi" <${config.SMTP_EMAIL}>`,
      to: toEmail,
      subject,
      html: `
        <p>Your one-time code is:</p>
        <h2 style="letter-spacing: 4px;">${otp}</h2>
        <p>This code expires in 5 minutes. Do not share it with anyone.</p>
      `,
    });
    console.log("✅ Email sent successfully:", info.messageId, info.response);
  } catch (err) {
    console.error("❌ Email sending FAILED for:", toEmail);
    console.error("Error message:", err.message);
    console.error("Full error:", err);
  }
}