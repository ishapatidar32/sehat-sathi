import bcrypt from "bcryptjs";
import { Admin, Doctor } from "../model/user.js";
import { signAccessToken } from "../utils/jwt.util.js";

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email }).select("+password");
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = signAccessToken(admin); // 👈 yahan fix hua
    res.json({ accessToken, admin: { name: admin.name, email: admin.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Sab pending doctors list karo
export const getPendingDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ verificationStatus: "pending" });
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Ek doctor ki full detail
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Approve
export const approveDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { verificationStatus: "approved", rejectionReason: "" },
      { new: true }
    );
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json({ message: "Doctor approved", doctor });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Reject
export const rejectDoctor = async (req, res) => {
  try {
    const { reason } = req.body;
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { verificationStatus: "rejected", rejectionReason: reason || "Not specified" },
      { new: true }
    );
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json({ message: "Doctor rejected", doctor });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};