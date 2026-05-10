import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{
      height: "64px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 40px",
      background: "white",
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      position: "sticky",
      top: 0,
      zIndex: 100
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ width: "32px", height: "32px", background: "#007bff", borderRadius: "8px" }}></div>
        <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#007bff" }}>Traveloop</span>
      </div>
      <div style={{ display: "flex", gap: "30px" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#666", fontWeight: "500" }}>Dashboard</Link>
        <Link to="/profile" style={{ textDecoration: "none", color: "#666", fontWeight: "500" }}>Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;
