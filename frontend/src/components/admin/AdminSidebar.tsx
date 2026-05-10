import React from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Users, 
  Map, 
  BarChart3, 
  Settings,
  X
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AdminSidebar = ({ isOpen, onClose }: Props) => {
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, path: "/admin/dashboard", label: "Dashboard" },
    { icon: Users, path: "/admin/users", label: "Users" },
    { icon: Map, path: "/admin/trips", label: "Trips" },
    { icon: BarChart3, path: "/admin/analytics", label: "Analytics" },
    { icon: Settings, path: "/admin/settings", label: "Settings" },
  ];

  return (
    <>
      <motion.aside
        initial={{ x: -100 }}
        animate={{ x: isOpen || window.innerWidth >= 768 ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`
          fixed
          top-0
          left-0
          h-screen
          w-[72px]
          bg-white/80
          backdrop-blur-xl
          border-r
          border-[#E5E7EB]
          flex
          flex-col
          items-center
          py-6
          gap-8
          z-50
          md:translate-x-0
        `}
      >
        {/* LOGO SECTION */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="
            w-10
            h-10
            rounded-xl
            bg-gradient-to-br
            from-[#8B5CF6]
            to-pink-500
            flex
            items-center
            justify-center
            text-white
            font-bold
            text-xl
            shadow-[0_4px_20px_rgba(0,0,0,0.04)]
            cursor-pointer
          "
        >
          T
        </motion.div>

        {/* NAVIGATION ICONS */}
        <nav className="flex-1 flex flex-col gap-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.includes(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                title={item.label}
                onClick={onClose}
              >
                <motion.div
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 1)" }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    w-12
                    h-12
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    transition-all
                    duration-200
                    ${isActive 
                      ? "bg-white text-[#111827] shadow-[0_8px_20px_rgba(139,92,246,0.15)] border border-[#E5E7EB]" 
                      : "text-[#6B7280] hover:text-[#111827] hover:bg-white/50"
                    }
                  `}
                >
                  <Icon size={22} strokeWidth={isActive ? 2 : 1.8} />
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* MOBILE CLOSE BUTTON */}
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="md:hidden w-10 h-10 rounded-full bg-[#F5F7FB] flex items-center justify-center text-[#6B7280] mb-4"
        >
          <X size={20} />
        </motion.button>
      </motion.aside>
    </>
  );
};

export default AdminSidebar;
