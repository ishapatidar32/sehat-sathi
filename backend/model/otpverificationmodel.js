import mongoose from "mongoose";

// This is NOT the User model. It exists only to hold an OTP for an email
// BEFORE any User document is created — i.e. during the "verify email first" step.
// Documents here auto-delete 10 minutes after creation (TTL index), so we don't
// need manual cleanup of abandoned/expired verification attempts.
const otpVerificationSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true, trim: true, index: true },
  otpHash: { type: String, required: true },
  otpExpiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now, expires: 600 }, // TTL: auto-delete after 10 min
});

export const OtpVerification = mongoose.model("OtpVerification", otpVerificationSchema);