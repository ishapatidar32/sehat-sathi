import jwt from "jsonwebtoken";
import config from "../config/config.js";
const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY = "7d";

export function signAccessToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    config.JWT_ACCESS_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );
}

export function signRefreshToken(user) {
  return jwt.sign(
    { id: user._id },
    config.JWT_REFRESH_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRY }
  );
}

export function verifyAccessToken(token) {
  return jwt.verify(token, config.JWT_ACCESS_SECRET);
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, config.JWT_REFRESH_SECRET);
}

// "Registration ticket" — proves an email was OTP-verified, before any User exists.
// Short-lived on purpose: it only needs to survive the time it takes the user
// to fill in the role + profile form after OTP verification.
const REGISTRATION_TICKET_EXPIRY = "10m";

export function signRegistrationTicket(email) {
  return jwt.sign({ email, purpose: "registration" }, config.JWT_REGISTRATION_SECRET, {
    expiresIn: REGISTRATION_TICKET_EXPIRY,
  });
}

export function verifyRegistrationTicket(token) {
  const decoded = jwt.verify(token, config.JWT_REGISTRATION_SECRET);
  if (decoded.purpose !== "registration") {
    throw new Error("Invalid ticket purpose");
  }
  return decoded; // { email, purpose, iat, exp }
}

// Cookie options for the refresh token — httpOnly so JS can't read it (XSS-safe)
export const refreshCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: "/api/auth", // only sent to auth routes, not every request
};