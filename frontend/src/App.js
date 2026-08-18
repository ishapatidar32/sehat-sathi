import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./landingpage/home";
import AuthForm from "./landingpage/AuthForm";

import PublicLayout from "./layouts/PublicLayout";
import PatientLayout from "./layouts/PatientLayout";
import DoctorLayout from "./layouts/DoctorLayout";
import AdminLayout from "./layouts/AdminLayout";

import PatientDashboard from "./patient/PatientDashboard";
import DoctorDashboard from "./doctor/DoctorDashboard";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import ProtectedAdminRoute from "./admin/ProtectedAdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes — landing site navbar + footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/signup" element={<AuthForm />} />
        </Route>

        {/* Patient routes — patient navbar, no public footer */}
        <Route element={<PatientLayout />}>
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
        </Route>

        {/* Doctor routes — doctor navbar */}
        <Route element={<DoctorLayout />}>
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        </Route>

        {/* Admin auth (no navbar) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin routes — admin navbar, protected */}
        <Route element={<AdminLayout />}>
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;