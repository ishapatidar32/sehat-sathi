import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/Footer";

const AdminLayout = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    <AdminNavbar />
    <div className="flex-1">
      <Outlet />
    </div>
    <Footer />
  </div>
);

export default AdminLayout;