import express from "express";
import {
  adminLogin,
  getPendingDoctors,
  getDoctorById,
  approveDoctor,
  rejectDoctor,
} from "../controllers/adminControllers.js";
import { authenticate, requireRole } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public — admin login
router.post("/login", adminLogin);

// Protected — sirf Admin role access kar sakta hai
router.get("/doctors/pending", authenticate, requireRole("Admin"), getPendingDoctors);
router.get("/doctors/:id", authenticate, requireRole("Admin"), getDoctorById);
router.patch("/doctors/:id/approve", authenticate, requireRole("Admin"), approveDoctor);
router.patch("/doctors/:id/reject", authenticate, requireRole("Admin"), rejectDoctor);

export default router;