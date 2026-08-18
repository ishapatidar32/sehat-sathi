import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, ChevronDown, LogOut } from "lucide-react";

const AdminNavbar = ({ pendingCount = 0 }) => {
  const navigate = useNavigate();
  const [usersOpen, setUsersOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/admin/dashboard" className="flex items-center gap-2 font-bold text-lg">
          <ShieldCheck className="w-6 h-6 text-green-400" />
          SehatSathi <span className="text-gray-400 font-normal">Admin</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
          <Link to="/admin/dashboard" className="hover:text-white">Dashboard</Link>

          <Link to="/admin/dashboard" className="relative hover:text-white">
            Doctor Verification
            {pendingCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {pendingCount}
              </span>
            )}
          </Link>

          <div className="relative">
            <button
              onClick={() => setUsersOpen((o) => !o)}
              className="flex items-center gap-1 hover:text-white"
            >
              Manage Users <ChevronDown className="w-4 h-4" />
            </button>
            {usersOpen && (
              <div className="absolute top-full left-0 mt-2 w-44 bg-white text-gray-800 rounded-xl shadow-lg border border-gray-100 py-2">
                <Link to="/admin/doctors" className="block px-4 py-2 text-sm hover:bg-gray-50">Doctors</Link>
                <Link to="/admin/patients" className="block px-4 py-2 text-sm hover:bg-gray-50">Patients</Link>
              </div>
            )}
          </div>

          <Link to="/admin/reports" className="hover:text-white">Reports</Link>
          <Link to="/admin/settings" className="hover:text-white">Settings</Link>
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm font-medium text-red-400 hover:text-red-300"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </header>
  );
};

export default AdminNavbar;