import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ tripId = "507f1f77bcf86cd799439011" }) => {
  const menuItems = [
    { label: "Checklist", icon: "🎒", path: "/" },
    { label: "Journal", icon: "✍️", path: "/notes" },
    { label: "Shared Page", icon: "🔗", path: `/public/${tripId}` },
  ];

  return (
    <aside className="hidden lg:flex w-72 h-full bg-white border-r border-slate-100 flex-col py-10">
      <div className="px-10 mb-12 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg shadow-blue-100">
          ✈️
        </div>
        <span className="text-2xl font-black text-slate-800 tracking-tight">Traveloop</span>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <div className="px-6 mb-4">
          <h2 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Navigation</h2>
        </div>
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-4 px-6 py-4 text-sm font-bold transition-all rounded-2xl
              ${isActive 
                ? "text-blue-600 bg-blue-50/50 shadow-sm" 
                : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
              }
            `}
          >
            <span className="text-xl">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="px-8 mt-auto">
        <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
          <p className="text-xs font-bold text-slate-400 mb-2">PRO TIP</p>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            Share your itinerary with friends to coordinate packing!
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
