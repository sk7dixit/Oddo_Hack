import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="h-16 flex items-center justify-between px-10 bg-white shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
        <span className="text-xl font-bold text-blue-600">Traveloop</span>
      </div>
      <div className="flex gap-8">
        <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Dashboard</Link>
        <Link to="/profile" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;
