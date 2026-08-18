import React from "react";
import { Outlet } from "react-router-dom";
import DoctorNavbar from "../components/DoctorNavbar";
import Footer from "../components/Footer";

const DoctorLayout = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    <DoctorNavbar />
    <div className="flex-1">
      <Outlet />
    </div>
    <Footer />
  </div>
);

export default DoctorLayout;