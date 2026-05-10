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
    path: "/public/507f1f77bcf86cd799439011",
    icon: <Share2 size={18} />,
  },
];

export default function FloatingDock({ isPublic = false }) {
  const location = useLocation();

  return (
    <div className="flex items-center gap-1 p-1 bg-slate-200/40 backdrop-blur-md rounded-full border border-slate-200/50">
      {items.map((item, index) => {
        // Special case for Share tab on public page
        const isShareTab = item.title === "Share";
        const isActiveOnPublic = isPublic && isShareTab;
        
        return (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => `
              nav-tab flex items-center gap-2.5 px-6 py-2.5 
              ${(isActive || isActiveOnPublic) ? "nav-tab-active" : "nav-tab-inactive"}
            `}
          >
            <span className="opacity-80">{item.icon}</span>
            <span className="font-semibold tracking-tight">{item.title}</span>
          </NavLink>
        );
      })}
    </div>
  );
}
