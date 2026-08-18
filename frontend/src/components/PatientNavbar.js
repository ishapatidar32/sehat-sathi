import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeartPulse, Bell, ChevronDown, LogOut, User } from "lucide-react";

const PatientNavbar = () => {
  const navigate = useNavigate();
  const [consultOpen, setConsultOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const name = localStorage.getItem("name") || "Patient";

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/patient/dashboard" className="flex items-center gap-2 font-bold text-lg text-green-600">
          <HeartPulse className="w-6 h-6" />
          SehatSathi
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link to="/patient/dashboard" className="hover:text-green-600">Home</Link>

          <div className="relative">
            <button
              onClick={() => setConsultOpen((o) => !o)}
              className="flex items-center gap-1 hover:text-green-600"
            >
              Consultations <ChevronDown className="w-4 h-4" />
            </button>
            {consultOpen && (
              <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-2">
                <Link to="/patient/consultations/video" className="block px-4 py-2 text-sm hover:bg-gray-50">Video Consultation</Link>
                <Link to="/patient/consultations/audio" className="block px-4 py-2 text-sm hover:bg-gray-50">Audio Consultation</Link>
                <Link to="/patient/consultations/text" className="block px-4 py-2 text-sm hover:bg-gray-50">Text Consultation</Link>
                <Link to="/patient/consultations/specialist" className="block px-4 py-2 text-sm hover:bg-gray-50">Specialist Consultation</Link>
                <Link to="/patient/ai-health-check" className="block px-4 py-2 text-sm hover:bg-gray-50">AI Health Check</Link>
              </div>
            )}
          </div>

          <Link to="/patient/ayurveda" className="hover:text-green-600">Ayurveda</Link>
          <Link to="/patient/hospitals" className="hover:text-green-600">Healthcare Centers</Link>
          <Link to="/patient/appointments" className="hover:text-green-600">Appointments</Link>
          <Link to="/patient/health-records" className="hover:text-green-600">Health Records</Link>
        </nav>

        <div className="flex items-center gap-4">
          <button className="relative text-gray-500 hover:text-green-600">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <div className="relative">
            <button
              onClick={() => setProfileOpen((o) => !o)}
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold">
                {name.charAt(0).toUpperCase()}
              </div>
              <ChevronDown className="w-4 h-4" />
            </button>
            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-2">
                <Link to="/patient/profile" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50">
                  <User className="w-4 h-4" /> My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default PatientNavbar;