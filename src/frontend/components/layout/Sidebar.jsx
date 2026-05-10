import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ tripId = "123" }) => {
  const location = useLocation();

  const menuItems = [
    { label: "Overview", icon: "🏠", path: `/` },
    { label: "Checklist", icon: "✅", path: `/checklist/${tripId}` },
    { label: "Notes", icon: "📝", path: `/notes/${tripId}` },
    { label: "Shared Page", icon: "🌐", path: `/public/${tripId}` },
  ];

  return (
    <aside style={{
      width: "260px",
      height: "calc(100vh - 64px)",
      background: "#fdfdfd",
      borderRight: "1px solid #eee",
      padding: "20px 0",
      position: "fixed",
      left: 0
    }}>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <li key={item.label}>
              <Link
                to={item.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 24px",
                  textDecoration: "none",
                  color: isActive ? "#007bff" : "#555",
                  background: isActive ? "#e7f1ff" : "transparent",
                  borderRight: isActive ? "4px solid #007bff" : "none",
                  fontWeight: isActive ? "600" : "400",
                  transition: "all 0.2s ease"
                }}
              >
                <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
