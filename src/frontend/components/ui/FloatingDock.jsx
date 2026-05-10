import React from "react";
import { NavLink } from "react-router-dom";
import {
  IoClipboardOutline,
  IoBookOutline,
  IoShareSocialOutline,
} from "react-icons/io5";

const items = [
  {
    title: "Checklist",
    path: "/checklist",
    icon: <IoClipboardOutline />,
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    title: "Journal",
    path: "/notes",
    icon: <IoBookOutline />,
    color: "from-cyan-400 to-blue-500",
  },
  {
    title: "Share",
    path: "/public/507f1f77bcf86cd799439011",
    icon: <IoShareSocialOutline />,
    color: "from-orange-400 to-pink-500",
  },
];

export default function FloatingDock() {
  return (
    <div className="flex items-center gap-3">
      {items.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          className={({ isActive }) => `
            relative group flex items-center h-14 w-14 hover:w-44 
            rounded-full transition-all duration-500 overflow-hidden 
            bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50
            ${isActive ? "ring-2 ring-blue-500 ring-offset-2 shadow-blue-100" : ""}
          `}
        >
          {/* Gradient Background Layer */}
          <div
            className={`
              absolute inset-0 bg-gradient-to-r ${item.color}
              opacity-0 group-hover:opacity-100 transition-all duration-500
            `}
          />

          {/* Icon Stage */}
          <div
            className="
              relative z-10 flex items-center justify-center 
              min-w-[56px] text-2xl text-slate-600
              group-hover:text-white transition-all duration-500
            "
          >
            {item.icon}
          </div>

          {/* Hidden Label Stage */}
          <span
            className="
              relative z-10 whitespace-nowrap text-white font-black text-xs uppercase tracking-widest
              opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0
              transition-all duration-500 pr-6
            "
          >
            {item.title}
          </span>
        </NavLink>
      ))}
    </div>
  );
}
