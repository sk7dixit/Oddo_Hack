import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";

const Layout = ({ children }) => {
  const { tripId } = useParams();

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa" }}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar tripId={tripId} />
        <main style={{
          marginLeft: "260px",
          padding: "40px",
          width: "calc(100% - 260px)",
          minHeight: "calc(100vh - 64px)"
        }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
