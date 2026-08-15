import crypto from "crypto";

const OTP_LENGTH = 6;
const OTP_EXPIRY_MINUTES = 5;

// Generates a 6-digit numeric OTP, e.g. "483920"
export function generateOtp() {
  const min = 10 ** (OTP_LENGTH - 1);
  const max = 10 ** OTP_LENGTH - 1;
  return crypto.randomInt(min, max).toString();
}

// We never store the raw OTP in the DB — only a hash of it.
// If the DB is ever leaked, no OTPs can be replayed.
export function hashOtp(otp) {
  return crypto.createHash("sha256").update(otp).digest("hex");
}

export function getOtpExpiry() {
  return new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
}

export function isOtpExpired(expiresAt) {
  return !expiresAt || new Date() > new Date(expiresAt);
}

export function compareOtp(rawOtp, storedHash) {
  return hashOtp(rawOtp) === storedHash;
}