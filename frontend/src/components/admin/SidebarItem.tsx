import { Link, useLocation } from "react-router-dom";
import React from "react";

interface Props {
  icon: React.ElementType;
  label: string;
  path: string;
}

const SidebarItem = ({
  icon: Icon,
  label,
  path,
}: Props) => {
  const location = useLocation();

  const active = location.pathname === path;

  return (
    <Link
      to={path}
      className={`
        flex items-center gap-3
        rounded-xl px-4 py-3
        transition-all duration-200
        ${
          active
            ? "bg-white text-black"
            : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
        }
      `}
    >
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  );
};

export default SidebarItem;
