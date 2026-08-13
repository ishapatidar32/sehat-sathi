import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="w-full px-6 lg:px-12 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <i className="fas fa-heartbeat text-red-500 text-2xl"></i>
          <span className="text-xl font-bold text-primary">SehatSathi</span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          <Link
            to="/"
            className="flex items-center gap-1 px-4 py-2 rounded-full text-dark font-medium hover:bg-soft hover:text-primary transition-colors"
          >
            <i className="fas fa-home"></i> Home
          </Link>
          <Link
            to="/#features"
            className="px-4 py-2 rounded-full text-dark font-medium hover:bg-soft hover:text-primary transition-colors"
          >
            Features
          </Link>
          <Link
            to="/#how-it-works"
            className="px-4 py-2 rounded-full text-dark font-medium hover:bg-soft hover:text-primary transition-colors"
          >
            How It Works
          </Link>
          <Link
            to="/centers"
            className="flex items-center gap-1 px-4 py-2 rounded-full text-dark font-medium hover:bg-soft hover:text-primary transition-colors"
          >
            <i className="fas fa-hospital"></i> Healthcare Centers
          </Link>
          <Link
            to="/support"
            className="flex items-center gap-1 px-4 py-2 rounded-full text-dark font-medium hover:bg-soft hover:text-primary transition-colors"
          >
            <i className="fas fa-question-circle"></i> Support
          </Link>
        </nav>

        <div className="flex items-center gap-4 shrink-0">
          <Link
            to="/login"
            className="flex items-center gap-1 px-4 py-2 rounded-full text-dark font-medium hover:bg-soft hover:text-primary transition-colors"
          >
            <i className="fas fa-sign-in-alt"></i> Login
          </Link>
          <Link to="/signup" className="btn-primary !py-2">
            <i className="fas fa-user-plus mr-2"></i> Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;