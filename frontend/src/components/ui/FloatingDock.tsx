import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Clipboard,
  Book,
  Share2,
} from "lucide-react";

const items = [
  {
    title: "Checklist",
    path: "/checklist",
    icon: <Clipboard size={18} />,
  },
  {
    title: "Journal",
    path: "/notes",
    icon: <Book size={18} />,
  },
  {
    title: "Share",
    path: "/public/507f1f77bcf86cd799439011", // Default public trip for now
    icon: <Share2 size={18} />,
  },
];

export default function FloatingDock({ isPublic = false }) {
  const location = useLocation();

  return (
    <div className="flex items-center gap-1.5 p-1.5 bg-white/80 backdrop-blur-2xl border border-slate-200/60 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
      {items.map((item) => {
        const isActive = location.pathname === item.path || (item.title === "Share" && isPublic);
        
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={`
              flex items-center gap-2.5 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300
              ${isActive 
                ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20" 
                : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"}
            `}
          >
            <span className={`${isActive ? "text-blue-400" : "text-slate-400"}`}>
              {item.icon}
            </span>
            <span className="hidden sm:inline">{item.title}</span>
          </NavLink>
        );
      })}
    </div>
  );
}
