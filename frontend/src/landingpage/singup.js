import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const inputClass =
  "w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary";

const RegisterForm = () => {
  const navigate = useNavigate();

  // step: "email" -> "otp" -> "form"
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [role, setRole] = useState(""); // "Doctor" | "Patient"
  const [status, setStatus] = useState({ loading: false, message: "" });

  const [common, setCommon] = useState({ name: "", phone: "" });

  const [doctorFields, setDoctorFields] = useState({
    registrationNumber: "", registrationCouncil: "", qualification: "",
    specialization: "", experienceYears: "", hospitalAffiliation: "",
    consultationFee: "", languagesSpoken: "", bio: "",
  });

  const [patientFields, setPatientFields] = useState({
    abhaId: "", bloodGroup: "", heightCm: "", weightKg: "",
    allergies: "", existingConditions: "", currentMedications: "",
    pastSurgeries: "", familyMedicalHistory: "",
    emergencyContactName: "", emergencyContactPhone: "",
  });

  const handleCommonChange = (e) => setCommon({ ...common, [e.target.name]: e.target.value });
  const handleDoctorChange = (e) => setDoctorFields({ ...doctorFields, [e.target.name]: e.target.value });
  const handlePatientChange = (e) => setPatientFields({ ...patientFields, [e.target.name]: e.target.value });

  // ---------- Step 1: Send OTP ----------
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: "" });
    try {
      await axiosInstance.post("/auth/send-otp", { email });
      setStatus({ loading: false, message: "OTP sent to your email." });
      setStep("otp");
    } catch (err) {
      setStatus({ loading: false, message: err.response?.data?.message || "Failed to send OTP." });
    }
  };

  // ---------- Step 2: Verify OTP ----------
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: "" });
    try {
      const res = await axiosInstance.post("/auth/verify-otp", { email, otp });
      setOtpToken(res.data.otpToken);
      setStatus({ loading: false, message: "Email verified! Complete your details below." });
      setStep("form");
    } catch (err) {
      setStatus({ loading: false, message: err.response?.data?.message || "Invalid OTP." });
    }
  };

  // ---------- Step 3: Final registration ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!role) return;

    setStatus({ loading: true, message: "" });

    const roleData = role === "Doctor"
      ? { ...doctorFields, languagesSpoken: doctorFields.languagesSpoken.split(",").map((s) => s.trim()) }
      : {
          ...patientFields,
          allergies: patientFields.allergies.split(",").map((s) => s.trim()),
          existingConditions: patientFields.existingConditions.split(",").map((s) => s.trim()),
          currentMedications: patientFields.currentMedications.split(",").map((s) => s.trim()),
          pastSurgeries: patientFields.pastSurgeries.split(",").map((s) => s.trim()),
        };

    const payload = { email, otpToken, role, ...common, ...roleData };

    try {
      await axiosInstance.post("/auth/register", payload);
      setStatus({ loading: false, message: "Registered successfully! Redirecting to login..." });
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setStatus({ loading: false, message: err.response?.data?.message || "Something went wrong." });
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h2 className="section-title text-center">Create Your Account</h2>
      <p className="text-muted text-center mb-8">Verify your email to get started.</p>

      {/* ---------- Step 1: Email ---------- */}
      {step === "email" && (
        <form onSubmit={handleSendOtp} className="bg-white rounded-2xl shadow-md p-8 space-y-4">
          <input
            className={inputClass}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary w-full justify-center" disabled={status.loading}>
            {status.loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      )}

      {/* ---------- Step 2: OTP ---------- */}
      {step === "otp" && (
        <form onSubmit={handleVerifyOtp} className="bg-white rounded-2xl shadow-md p-8 space-y-4">
          <p className="text-sm text-muted">OTP sent to <span className="font-medium text-dark">{email}</span></p>
          <input
            className={inputClass}
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            required
          />
          <button type="submit" className="btn-primary w-full justify-center" disabled={status.loading}>
            {status.loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      )}

      {/* ---------- Step 3: Role + full details form ---------- */}
      {step === "form" && (
        <>
          <div className="flex gap-4 justify-center mb-8">
            <button
              type="button"
              onClick={() => setRole("Doctor")}
              className={`px-6 py-3 rounded-full font-semibold border-2 transition-colors ${
                role === "Doctor" ? "bg-primary text-white border-primary" : "border-primary text-primary"
              }`}
            >
              I'm a Doctor
            </button>
            <button
              type="button"
              onClick={() => setRole("Patient")}
              className={`px-6 py-3 rounded-full font-semibold border-2 transition-colors ${
                role === "Patient" ? "bg-primary text-white border-primary" : "border-primary text-primary"
              }`}
            >
              I'm a Patient
            </button>
          </div>

          {role && (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input className={inputClass} name="name" placeholder="Full Name" onChange={handleCommonChange} required />
                <input className={inputClass} name="phone" placeholder="Phone Number" onChange={handleCommonChange} required />
              </div>

              <hr className="border-gray-200" />

              {role === "Doctor" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input className={inputClass} name="registrationNumber" placeholder="Medical Registration Number" onChange={handleDoctorChange} required />
                  <input className={inputClass} name="registrationCouncil" placeholder="Registration Council" onChange={handleDoctorChange} required />
                  <input className={inputClass} name="qualification" placeholder="Qualification" onChange={handleDoctorChange} required />
                  <input className={inputClass} name="specialization" placeholder="Specialization" onChange={handleDoctorChange} required />
                  <input className={inputClass} type="number" name="experienceYears" placeholder="Years of Experience" onChange={handleDoctorChange} required />
                  <input className={inputClass} name="hospitalAffiliation" placeholder="Hospital / Clinic" onChange={handleDoctorChange} required />
                  <input className={inputClass} type="number" name="consultationFee" placeholder="Consultation Fee (₹)" onChange={handleDoctorChange} required />
                  <input className={inputClass} name="languagesSpoken" placeholder="Languages Spoken (comma separated)" onChange={handleDoctorChange} required />
                  <textarea className={`${inputClass} sm:col-span-2`} name="bio" placeholder="Short Bio" rows="3" onChange={handleDoctorChange} required></textarea>
                </div>
              )}

              {role === "Patient" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <select className={inputClass} name="bloodGroup" onChange={handlePatientChange} required>
                    <option value="">Blood Group</option>
                    {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map((bg) => <option key={bg}>{bg}</option>)}
                  </select>
                  <input className={inputClass} name="abhaId" placeholder="ABHA ID" onChange={handlePatientChange} required />
                  <input className={inputClass} type="number" name="heightCm" placeholder="Height (cm)" onChange={handlePatientChange} required />
                  <input className={inputClass} type="number" name="weightKg" placeholder="Weight (kg)" onChange={handlePatientChange} required />
                  <input className={inputClass} name="allergies" placeholder="Allergies (comma separated)" onChange={handlePatientChange} required />
                  <input className={inputClass} name="existingConditions" placeholder="Existing Conditions" onChange={handlePatientChange} required />
                  <input className={inputClass} name="currentMedications" placeholder="Current Medications" onChange={handlePatientChange} required />
                  <input className={inputClass} name="pastSurgeries" placeholder="Past Surgeries" onChange={handlePatientChange} required />
                  <textarea className={`${inputClass} sm:col-span-2`} name="familyMedicalHistory" placeholder="Family Medical History" rows="2" onChange={handlePatientChange} required></textarea>
                  <input className={inputClass} name="emergencyContactName" placeholder="Emergency Contact Name" onChange={handlePatientChange} required />
                  <input className={inputClass} name="emergencyContactPhone" placeholder="Emergency Contact Phone" onChange={handlePatientChange} required />
                </div>
              )}

              <button type="submit" className="btn-primary w-full justify-center" disabled={status.loading}>
                {status.loading ? "Registering..." : "Complete Registration"}
              </button>
            </form>
          )}
        </>
      )}

      {status.message && (
        <p className="text-center text-sm text-primary font-medium mt-4">{status.message}</p>
      )}
    </div>
  );
};

export default RegisterForm;