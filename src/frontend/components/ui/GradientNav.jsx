import React from "react";
import { NavLink } from "react-router-dom";
import {
  IoClipboardOutline,
  IoBookOutline,
  IoShareSocialOutline,
} from "react-icons/io5";

const menuItems = [
  {
    title: "Checklist",
    path: "/checklist",
    icon: <IoClipboardOutline />,
    gradientFrom: "#a955ff",
    gradientTo: "#ea51ff",
  },
  {
    title: "Journal",
    path: "/notes",
    icon: <IoBookOutline />,
    gradientFrom: "#56CCF2",
    gradientTo: "#2F80ED",
  },
  {
    title: "Share",
    path: "/public/507f1f77bcf86cd799439011",
    icon: <IoShareSocialOutline />,
    gradientFrom: "#FF9966",
    gradientTo: "#FF5E62",
  },
];

const GradientNav = () => {
  return (
    <ul className="flex items-center gap-3">
      {menuItems.map(({ title, icon, gradientFrom, gradientTo, path }, idx) => (
        <li key={idx}>
          <NavLink
            to={path}
            style={{
              "--gradient-from": gradientFrom,
              "--gradient-to": gradientTo,
            }}
            className={({ isActive }) => `
              relative flex items-center justify-center gap-2 h-12 px-5 rounded-2xl
              bg-white/50 backdrop-blur-sm border border-slate-100 shadow-sm
              transition-all duration-500 group hover:scale-105
              ${isActive ? "text-white" : "text-slate-500 hover:text-slate-800"}
            `}
          >
            {/* Gradient Background */}
            <span
              className="
                absolute inset-0 rounded-2xl
                bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))]
                opacity-0 transition-all duration-500
                group-hover:opacity-100
              "
              style={{ 
                opacity: (window.location.pathname === path || (path === '/checklist' && window.location.pathname === '/')) ? 1 : undefined 
              }}
            />

            {/* Glow Effect */}
            <span
              className="
                absolute inset-0 rounded-2xl
                bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))]
                blur-lg opacity-0 transition-all duration-500
                group-hover:opacity-30
              "
            />

            {/* Content Stage */}
            <span className="relative z-10 flex items-center gap-2">
              <span className="text-lg">{icon}</span>
              <span className="font-black text-xs uppercase tracking-widest">{title}</span>
            </span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default GradientNav;
