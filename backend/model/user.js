import mongoose from "mongoose";

const baseOptions = {
  discriminatorKey: "role",
  collection: "users",
  timestamps: true
};

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: String,
  isVerified: { type: Boolean, default: false },
  refreshTokenHash: { type: String, select: false }
}, baseOptions);

const User = mongoose.model("User", userSchema);

const Doctor = User.discriminator("Doctor", new mongoose.Schema({
  registrationNumber: { type: String, required: true },
  registrationCouncil: { type: String },
  qualification: { type: String },
  specialization: { type: String },
  experienceYears: { type: Number },
  hospitalAffiliation: { type: String },
  consultationFee: { type: Number },
  languagesSpoken: [{ type: String }],
  bio: { type: String },
  degreeCertificateUrl: { type: String },
  registrationCertificateUrl: { type: String },
  govIdProofUrl: { type: String },
  verificationStatus: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  rejectionReason: { type: String, default: "" },
}));

const Patient = User.discriminator("Patient", new mongoose.Schema({
  abhaId: { type: String },
  bloodGroup: {
    type: String,
    enum: ["A+","A-","B+","B-","AB+","AB-","O+","O-"]
  },
  heightCm: { type: Number },
  weightKg: { type: Number },
  allergies: [{ type: String }],
  existingConditions: [{ type: String }],
  currentMedications: [{ type: String }],
  pastSurgeries: [{ type: String }],
  familyMedicalHistory: { type: String },
  emergencyContactName: { type: String },
  emergencyContactPhone: { type: String },
}));

const Admin = User.discriminator("Admin", new mongoose.Schema({
  password: { type: String, required: true, select: false },
}));

export { User, Doctor, Patient, Admin };