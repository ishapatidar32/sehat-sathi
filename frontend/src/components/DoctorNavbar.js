import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Stethoscope, Bell, ChevronDown, LogOut, User } from "lucide-react";

const DoctorNavbar = () => {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const name = localStorage.getItem("name") || "Doctor";

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/doctor/dashboard" className="flex items-center gap-2 font-bold text-lg text-blue-600">
          <Stethoscope className="w-6 h-6" />
          SehatSathi
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link to="/doctor/dashboard" className="hover:text-blue-600">Dashboard</Link>
          <Link to="/doctor/appointments" className="hover:text-blue-600">Appointments</Link>
          <Link to="/doctor/patients" className="hover:text-blue-600">My Patients</Link>
          <Link to="/doctor/consultations" className="hover:text-blue-600">Consultations</Link>
          <Link to="/doctor/prescriptions" className="hover:text-blue-600">Prescriptions</Link>
          <Link to="/doctor/schedule" className="hover:text-blue-600">Schedule</Link>
        </nav>

        <div className="flex items-center gap-4">
          <button className="relative text-gray-500 hover:text-blue-600">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <div className="relative">
            <button
              onClick={() => setProfileOpen((o) => !o)}
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
                {name.charAt(0).toUpperCase()}
              </div>
              <ChevronDown className="w-4 h-4" />
            </button>
            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-2">
                <Link to="/doctor/profile" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50">
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

export default DoctorNavbar;