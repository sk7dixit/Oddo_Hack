import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ tripId = "507f1f77bcf86cd799439011" }) => {
  const menuItems = [
    { label: "Checklist", icon: "🎒", path: "/checklist" },
    { label: "Journal", icon: "✍️", path: "/notes" },
  ];

  return (
    <div className="h-full flex flex-col p-8">
      {/* Branding */}
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-blue-200">
          ✈️
        </div>
        <span className="text-2xl font-black text-slate-800">Traveloop</span>
      </div>

      {/* Nav Section */}
      <nav className="flex-1 space-y-2">
        <h2 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4 px-2">Main Menu</h2>
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all
              ${isActive 
                ? "bg-blue-600 text-white shadow-xl shadow-blue-100" 
                : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"}
            `}
          >
            <span className="text-xl">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Sharing Footer */}
      <div className="mt-auto">
        <NavLink 
          to={`/public/${tripId}`}
          className="block p-5 bg-slate-900 rounded-[2rem] text-white hover:bg-slate-800 transition-all shadow-lg"
        >
          <p className="text-[10px] font-black opacity-50 uppercase tracking-widest mb-1">Public Share</p>
          <p className="text-xs font-bold">View Live Itinerary 🔗</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
