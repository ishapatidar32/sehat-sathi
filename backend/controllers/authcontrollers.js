import {User , Doctor , Patient} from "../model/user.js";
import { OtpVerification } from "../model/otpverificationmodel.js";
import { generateOtp, hashOtp, getOtpExpiry, isOtpExpired, compareOtp } from "../utils/otp.util.js";
import { sendOtpEmail } from "../utils/Mail.util.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  signRegistrationTicket,
  verifyRegistrationTicket,
  refreshCookieOptions,
} from "../utils/jwt.util.js";

/**
 * STEP 1 — REQUEST EMAIL OTP (before any account exists)
 * POST /api/auth/request-otp
 * body: { email }
 *
 * Used for BOTH "start registration" and "start login" — the frontend doesn't
 * need to know in advance which one it is. We just check whether the email
 * already belongs to a verified account, and let the frontend branch on that.
 */
export async function requestOtp(req, res) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "email is required" });

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });

    const otp = generateOtp();

    // Upsert: overwrite any previous pending OTP for this email with a fresh one
    await OtpVerification.findOneAndUpdate(
      { email: normalizedEmail },
      { otpHash: hashOtp(otp), otpExpiresAt: getOtpExpiry(), createdAt: new Date() },
      { upsert: true, new: true }
    );

    await sendOtpEmail(normalizedEmail, otp, existingUser ? "login" : "register");

    return res.json({
      message: "OTP sent to your email",
      accountExists: !!existingUser, // frontend uses this to decide: show registration form, or just log in
    });
  } catch (err) {
    console.error("Request OTP error:", err.message);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

/**
 * STEP 2 — VERIFY EMAIL OTP
 * POST /api/auth/verify-otp
 * body: { email, otp }
 *
 * Two outcomes depending on whether the email already belongs to an account:
 *  - New email  -> issues a short-lived "registrationTicket" so the frontend
 *                  can now safely reveal the role + profile form.
 *  - Existing email -> this IS the login step, issues real access/refresh tokens directly.
 */
export async function verifyOtp(req, res) {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "email and otp are required" });
    }
    const normalizedEmail = email.toLowerCase().trim();

    const pending = await OtpVerification.findOne({ email: normalizedEmail });
    if (!pending) {
      return res.status(400).json({ message: "No OTP request found, please request a new one" });
    }
    if (isOtpExpired(pending.otpExpiresAt)) {
      return res.status(400).json({ message: "OTP expired, please request a new one" });
    }
    if (!compareOtp(otp, pending.otpHash)) {
      return res.status(400).json({ message: "Incorrect OTP" });
    }

    // OTP is correct — this pending record has done its job, remove it either way
    await OtpVerification.deleteOne({ _id: pending._id });

    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      // This was a LOGIN flow — user already has an account, log them in now
      const accessToken = signAccessToken(existingUser);
      const refreshToken = signRefreshToken(existingUser);
      existingUser.refreshTokenHash = hashOtp(refreshToken);
      await existingUser.save();

      res.cookie("refreshToken", refreshToken, refreshCookieOptions);
      return res.json({
        message: "Login successful",
        accessToken,
        user: { id: existingUser._id, name: existingUser.name, email: existingUser.email, role: existingUser.role },
      });
    }

    // This was a REGISTRATION flow — email confirmed, but no account yet.
    // Issue a ticket the frontend must send back with the completed profile form.
    const registrationTicket = signRegistrationTicket(normalizedEmail);
    return res.json({
      message: "Email verified. Please complete your profile.",
      registrationTicket,
    });
  } catch (err) {
    console.error("Verify OTP error:", err.message);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

/**
 * STEP 3 — COMPLETE REGISTRATION (role + profile form, shown only after OTP verified)
 * POST /api/auth/complete-registration
 * body: { registrationTicket, name, role, ...roleSpecificFields }
 *
 * The email is NEVER taken from req.body here — it comes only from the verified
 * ticket, so there's no way to register an account for an email you didn't OTP-verify.
 */
export async function completeRegistration(req, res) {
  try {
    const { registrationTicket, name, role, ...roleFields } = req.body;
    if (!registrationTicket) {
      return res.status(401).json({ message: "Missing registration ticket — please verify your email again" });
    }
    if (!name || !role) {
      return res.status(400).json({ message: "name and role are required" });
    }
    if (!["doctor", "patient"].includes(role)) {
      return res.status(400).json({ message: "role must be 'doctor' or 'patient'" });
    }

    let decodedTicket;
    try {
      decodedTicket = verifyRegistrationTicket(registrationTicket);
    } catch {
      return res.status(401).json({ message: "Registration session expired, please verify your email again" });
    }
    const email = decodedTicket.email; // trusted, not taken from req.body

    const alreadyExists = await User.findOne({ email });
    if (alreadyExists) {
      return res.status(409).json({ message: "An account with this email already exists" });
    }

    if (role === "doctor" && !roleFields.registrationNumber) {
      return res.status(400).json({ message: "registrationNumber is required for doctor accounts" });
    }

    const Model = role === "doctor" ? Doctor : Patient;
    const newUser = await Model.create({
      name,
      email,
      ...roleFields,
      isVerified: true, // email was already confirmed via OTP in step 2
    });

    const accessToken = signAccessToken(newUser);
    const refreshToken = signRefreshToken(newUser);
    newUser.refreshTokenHash = hashOtp(refreshToken);
    await newUser.save();

    res.cookie("refreshToken", refreshToken, refreshCookieOptions);
    return res.status(201).json({
      message: "Account created",
      accessToken,
      user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role },
    });
  } catch (err) {
    console.error("Complete registration error:", err.message);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

/**
 * REFRESH ACCESS TOKEN
 * POST /api/auth/refresh
 */
export async function refreshAccessToken(req, res) {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token provided" });

    let decoded;
    try {
      decoded = verifyRefreshToken(token);
    } catch {
      return res.status(401).json({ message: "Invalid or expired refresh token" });
    }

    const user = await User.findById(decoded.id).select("+refreshTokenHash");
    if (!user || user.refreshTokenHash !== hashOtp(token)) {
      return res.status(401).json({ message: "Refresh token no longer valid" });
    }

    const newAccessToken = signAccessToken(user);
    return res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error("Refresh token error:", err.message);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

/**
 * LOGOUT
 * POST /api/auth/logout
 */
export async function logout(req, res) {
  try {
    const token = req.cookies?.refreshToken;
    if (token) {
      try {
        const decoded = verifyRefreshToken(token);
        await User.findByIdAndUpdate(decoded.id, { $unset: { refreshTokenHash: 1 } });
      } catch {
        // already invalid — nothing to clean up
      }
    }
    res.clearCookie("refreshToken", { path: "/api/auth" });
    return res.json({ message: "Logged out" });
  } catch (err) {
    console.error("Logout error:", err.message);
    return res.status(500).json({ message: "Something went wrong" });
  }
}