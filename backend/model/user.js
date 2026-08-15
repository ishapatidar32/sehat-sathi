import mongoose from "mongoose";

const baseOptions = {
  discriminatorKey: "role",
  collection: "users",
  timestamps: true // moved here so all roles get createdAt/updatedAt
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
  isVerified: { type: Boolean, default: false }, // consistent casing
  refreshTokenHash: { type: String, select: false } // store hashed refresh token for security
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
    default: "pending"
  },
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

export { User, Doctor, Patient };