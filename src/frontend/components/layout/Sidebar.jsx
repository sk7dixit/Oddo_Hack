import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ tripId = "507f1f77bcf86cd799439011" }) => {
  const location = useLocation();

  const menuItems = [
    { label: "Checklist", icon: "✅", path: "/" },
    { label: "Journal", icon: "📝", path: "/notes" },
    { label: "Shared Page", icon: "🌐", path: `/public/${tripId}` },
  ];

  return (
    <aside className="w-[260px] h-screen bg-white border-r border-gray-100 py-6 fixed left-0">
      <div className="px-6 mb-8">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Menu</h2>
      </div>
      <ul className="space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <li key={item.label}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all ${
                  isActive 
                    ? "text-blue-600 bg-blue-50 border-r-4 border-blue-600" 
                    : "text-gray-500 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
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
