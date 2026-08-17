import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './landingpage/home';
import AuthForm from './landingpage/AuthForm';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard"
import ProtectedAdminRoute from "./admin/ProtectedAdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/signup" element={<AuthForm />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
  path="/admin/dashboard"
  element={
    <ProtectedAdminRoute>
      <AdminDashboard />
    </ProtectedAdminRoute>
  }
/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;