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
    <div className="flex items-center gap-2 p-1.5 bg-white/5 backdrop-blur-3xl rounded-full border border-white/10 shadow-2xl">
      {items.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          className={({ isActive }) => `
            relative group flex items-center h-11 w-11 hover:w-36 
            rounded-full transition-all duration-500 overflow-hidden 
            ${isActive ? "bg-white/10 shadow-lg" : "bg-transparent"}
          `}
        >
          {/* Active/Hover Gradient Layer */}
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
              min-w-[44px] text-lg text-white/50
              group-hover:text-white transition-all duration-500
            "
          >
            {item.icon}
          </div>

          {/* Label Stage */}
          <span
            className="
              relative z-10 whitespace-nowrap text-white font-bold text-[10px] uppercase tracking-widest
              opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0
              transition-all duration-500 pr-5
            "
          >
            {item.title}
          </span>
        </NavLink>
      ))}
    </div>
  );
}
