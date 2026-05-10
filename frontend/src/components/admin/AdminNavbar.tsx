import React from "react";
import { motion } from "framer-motion";
import { Search, Bell, UserCircle, Menu } from "lucide-react";

interface Props {
  onMenuClick: () => void;
}

const AdminNavbar = ({ onMenuClick }: Props) => {
  return (
    <header
      className="
        h-16
        md:h-20
        bg-white/70
        backdrop-blur-xl
        border-b
        border-[#E5E7EB]
        px-4
        md:px-6
        flex
        items-center
        justify-between
        sticky
        top-0
        z-40
      "
    >
      <div className="flex items-center gap-3 md:gap-4">
        {/* Mobile Menu Toggle */}
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={onMenuClick}
          className="p-2.5 -ml-2 rounded-xl text-[#6B7280] hover:bg-white md:hidden transition-transform"
        >
          <Menu size={22} />
        </motion.button>

        {/* Mobile Logo Placeholder */}
        <div className="md:hidden w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-pink-500 flex items-center justify-center text-white font-bold text-sm">
          T
        </div>

        {/* Search bar - Hidden on mobile */}
        <motion.div
          className="
            hidden
            md:flex
            w-[360px]
            bg-white
            rounded-xl
            px-4
            py-2
            items-center
            gap-3
            shadow-[0_4px_20px_rgba(0,0,0,0.04)]
            border border-[#E5E7EB]
            focus-within:ring-4
            focus-within:ring-violet-100
            focus-within:border-[#8B5CF6]
            transition-all
            duration-300
          "
        >
          <Search className="text-[#6B7280]" size={20} />
          <input 
            type="text" 
            placeholder="Search traveloop..." 
            className="w-full bg-transparent outline-none text-sm text-[#111827] placeholder:text-[#6B7280]"
          />
        </motion.div>
      </div>

      <div className="flex items-center gap-2 md:gap-5">
        {/* Notifications */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-[#6B7280] hover:text-[#111827] shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all relative"
        >
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </motion.button>

        <div className="h-8 w-px bg-[#E5E7EB] hidden sm:block"></div>

        {/* Profile */}
        <motion.div 
          whileHover={{ x: 2 }}
          className="flex items-center gap-2 md:gap-3 cursor-pointer group transition-opacity"
        >
          <div className="text-right hidden sm:block">
            <p className="text-[13px] font-bold text-[#111827] group-hover:text-black leading-tight">Admin</p>
            <p className="text-[10px] text-[#6B7280]">admin@traveloop</p>
          </div>
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-[#F5F7FB] flex items-center justify-center text-[#6B7280] group-hover:bg-[#E5E7EB] transition-colors overflow-hidden border border-[#E5E7EB]">
            <UserCircle size={24} />
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default AdminNavbar;
