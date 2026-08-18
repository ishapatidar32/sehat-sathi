import React from "react";
import { Outlet } from "react-router-dom";
import PatientNavbar from "../components/PatientNavbar";
import Footer from "../components/Footer";

const PatientLayout = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    <PatientNavbar />
    <div className="flex-1">
      <Outlet />
    </div>
    <Footer />
  </div>
);

export default PatientLayout;