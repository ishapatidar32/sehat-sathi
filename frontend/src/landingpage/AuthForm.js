import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const inputClass =
  "w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary";

const AuthForm = () => {
  const navigate = useNavigate();

  // step: "email" -> "otp" -> "profile" (profile sirf naye users ke liye aata hai)
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [registrationTicket, setRegistrationTicket] = useState("");
  const [role, setRole] = useState(""); // "doctor" | "patient"
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

  const saveSession = (accessToken, user) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("role", user.role);
    localStorage.setItem("name", user.name);
  };

  const redirectAfterAuth = (role) => {
    if (role === "doctor") navigate("/doctor/dashboard");
    else if (role === "patient") navigate("/patient/dashboard");
    else navigate("/");
  };

  // ---------- Step 1: Request OTP (login ya register — backend khud decide karega) ----------
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: "" });
    try {
      await axiosInstance.post("/auth/request-otp", { email });
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

      if (res.data.accessToken) {
        // Existing account -> ye seedha login hai, yahi khatam
        saveSession(res.data.accessToken, res.data.user);
        setStatus({ loading: false, message: "Login successful! Redirecting..." });
        setTimeout(() => redirectAfterAuth(res.data.user.role), 1000);
      } else if (res.data.registrationTicket) {
        // Naya email -> profile form dikhana hai
        setRegistrationTicket(res.data.registrationTicket);
        setStatus({ loading: false, message: "Email verified! Complete your profile below." });
        setStep("profile");
      }
    } catch (err) {
      setStatus({ loading: false, message: err.response?.data?.message || "Invalid OTP." });
    }
  };

  // ---------- Step 3: Complete registration (naye users ke liye) ----------
  const handleCompleteRegistration = async (e) => {
    e.preventDefault();
    if (!role) return;
    setStatus({ loading: true, message: "" });

    const roleData = role === "doctor"
      ? { ...doctorFields, languagesSpoken: doctorFields.languagesSpoken.split(",").map((s) => s.trim()) }
      : {
          ...patientFields,
          allergies: patientFields.allergies.split(",").map((s) => s.trim()),
          existingConditions: patientFields.existingConditions.split(",").map((s) => s.trim()),
          currentMedications: patientFields.currentMedications.split(",").map((s) => s.trim()),
          pastSurgeries: patientFields.pastSurgeries.split(",").map((s) => s.trim()),
        };

    const payload = { registrationTicket, role, ...common, ...roleData };

    try {
      const res = await axiosInstance.post("/auth/registration", payload);
      saveSession(res.data.accessToken, res.data.user);
      setStatus({ loading: false, message: "Account created! Redirecting..." });
      setTimeout(() => redirectAfterAuth(res.data.user.role), 1000);
    } catch (err) {
      setStatus({ loading: false, message: err.response?.data?.message || "Something went wrong." });
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h2 className="section-title text-center">Welcome to SehatSathi</h2>
      <p className="text-muted text-center mb-8">
        {step === "email" && "Enter your email to login or create an account."}
        {step === "otp" && "Enter the OTP sent to your email."}
        {step === "profile" && "New here! Complete your profile to finish."}
      </p>

      {/* ---------- Step 1 ---------- */}
      {step === "email" && (
        <form onSubmit={handleRequestOtp} className="bg-white rounded-2xl shadow-md p-8 space-y-4">
          <input
            className={inputClass}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary w-full justify-center" disabled={status.loading}>
            {status.loading ? "Sending..." : "Continue"}
          </button>
        </form>
      )}

      {/* ---------- Step 2 ---------- */}
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

      {/* ---------- Step 3: naye users ke liye role + profile ---------- */}
      {step === "profile" && (
        <>
          <div className="flex gap-4 justify-center mb-8">
            <button
              type="button"
              onClick={() => setRole("doctor")}
              className={`px-6 py-3 rounded-full font-semibold border-2 transition-colors ${
                role === "doctor" ? "bg-primary text-white border-primary" : "border-primary text-primary"
              }`}
            >
              I'm a Doctor
            </button>
            <button
              type="button"
              onClick={() => setRole("patient")}
              className={`px-6 py-3 rounded-full font-semibold border-2 transition-colors ${
                role === "patient" ? "bg-primary text-white border-primary" : "border-primary text-primary"
              }`}
            >
              I'm a Patient
            </button>
          </div>

          {role && (
            <form onSubmit={handleCompleteRegistration} className="bg-white rounded-2xl shadow-md p-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input className={inputClass} name="name" placeholder="Full Name" onChange={handleCommonChange} required />
                <input className={inputClass} name="phone" placeholder="Phone Number" onChange={handleCommonChange} />
              </div>

              <hr className="border-gray-200" />

              {role === "doctor" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input className={inputClass} name="registrationNumber" placeholder="Medical Registration Number" onChange={handleDoctorChange} required />
                  <input className={inputClass} name="registrationCouncil" placeholder="Registration Council" onChange={handleDoctorChange} />
                  <input className={inputClass} name="qualification" placeholder="Qualification" onChange={handleDoctorChange} />
                  <input className={inputClass} name="specialization" placeholder="Specialization" onChange={handleDoctorChange} />
                  <input className={inputClass} type="number" name="experienceYears" placeholder="Years of Experience" onChange={handleDoctorChange} />
                  <input className={inputClass} name="hospitalAffiliation" placeholder="Hospital / Clinic" onChange={handleDoctorChange} />
                  <input className={inputClass} type="number" name="consultationFee" placeholder="Consultation Fee (₹)" onChange={handleDoctorChange} />
                  <input className={inputClass} name="languagesSpoken" placeholder="Languages Spoken (comma separated)" onChange={handleDoctorChange} />
                  <textarea className={`${inputClass} sm:col-span-2`} name="bio" placeholder="Short Bio" rows="3" onChange={handleDoctorChange}></textarea>
                </div>
              )}

              {role === "patient" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <select className={inputClass} name="bloodGroup" onChange={handlePatientChange}>
                    <option value="">Blood Group</option>
                    {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map((bg) => <option key={bg}>{bg}</option>)}
                  </select>
                  <input className={inputClass} name="abhaId" placeholder="ABHA ID" onChange={handlePatientChange} />
                  <input className={inputClass} type="number" name="heightCm" placeholder="Height (cm)" onChange={handlePatientChange} />
                  <input className={inputClass} type="number" name="weightKg" placeholder="Weight (kg)" onChange={handlePatientChange} />
                  <input className={inputClass} name="allergies" placeholder="Allergies (comma separated)" onChange={handlePatientChange} />
                  <input className={inputClass} name="existingConditions" placeholder="Existing Conditions" onChange={handlePatientChange} />
                  <input className={inputClass} name="currentMedications" placeholder="Current Medications" onChange={handlePatientChange} />
                  <input className={inputClass} name="pastSurgeries" placeholder="Past Surgeries" onChange={handlePatientChange} />
                  <textarea className={`${inputClass} sm:col-span-2`} name="familyMedicalHistory" placeholder="Family Medical History" rows="2" onChange={handlePatientChange}></textarea>
                  <input className={inputClass} name="emergencyContactName" placeholder="Emergency Contact Name" onChange={handlePatientChange} />
                  <input className={inputClass} name="emergencyContactPhone" placeholder="Emergency Contact Phone" onChange={handlePatientChange} />
                </div>
              )}

              <button type="submit" className="btn-primary w-full justify-center" disabled={status.loading}>
                {status.loading ? "Creating account..." : "Complete Registration"}
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

export default AuthForm;