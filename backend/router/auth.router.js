import express from "express";
import {
  requestOtp,
  verifyOtp,
  completeRegistration,
  refreshAccessToken,
  logout,
} from "../controllers/authcontrollers.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { User } from "../model/user.js";

const router = express.Router();

// Single OTP entry point — works for both "new email" (register) and
// "existing email" (login). Frontend doesn't need to know which in advance.
router.post("/request-otp", requestOtp);
router.post("/verify-otp", verifyOtp);

// Only reachable with a valid registrationTicket from verify-otp above
router.post("/registration", completeRegistration);

// Token lifecycle
router.post("/refresh", refreshAccessToken);
router.post("/logout", logout);

// Example protected route
router.get("/me", authenticate, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

export default router;