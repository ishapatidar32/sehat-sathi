import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const inputClass =
  "w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary";

const Login = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState("email"); // "email" -> "otp"
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState({ loading: false, message: "" });

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

  // ---------- Step 2: Verify OTP & Login ----------
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: "" });
    try {
      const res = await axiosInstance.post("/auth/login", { email, otp });
      // Backend se JWT token + role milega
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      setStatus({ loading: false, message: "Login successful! Redirecting..." });

      setTimeout(() => {
        if (res.data.role === "Doctor") navigate("/doctor/dashboard");
        else if (res.data.role === "Patient") navigate("/patient/dashboard");
        else navigate("/");
      }, 1000);
    } catch (err) {
      setStatus({ loading: false, message: err.response?.data?.message || "Invalid OTP." });
    }
  };

  return (
    <div className="max-w-md mx-auto py-24 px-4">
      <h2 className="section-title text-center">Login to SehatSathi</h2>
      <p className="text-muted text-center mb-8">
        {step === "email" ? "Enter your registered email to continue." : "Enter the OTP sent to your email."}
      </p>

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

      {step === "otp" && (
        <form onSubmit={handleVerifyOtp} className="bg-white rounded-2xl shadow-md p-8 space-y-4">
          <p className="text-sm text-muted">
            OTP sent to <span className="font-medium text-dark">{email}</span>
          </p>
          <input
            className={inputClass}
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            required
          />
          <button type="submit" className="btn-primary w-full justify-center" disabled={status.loading}>
            {status.loading ? "Verifying..." : "Verify & Login"}
          </button>
          <button
            type="button"
            onClick={() => setStep("email")}
            className="w-full text-sm text-muted hover:text-primary"
          >
            Change email
          </button>
        </form>
      )}

      {status.message && (
        <p className="text-center text-sm text-primary font-medium mt-4">{status.message}</p>
      )}
    </div>
  );
};

export default Login;