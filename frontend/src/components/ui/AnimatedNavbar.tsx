import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Compass, 
  Sparkles, 
  Wallet, 
  Briefcase, 
  BookOpen,
  Users2
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/travel-hub', icon: Home, label: 'Hub' },
  { path: '/discover', icon: Compass, label: 'Explore' },
  { path: '/journey-flow', icon: Briefcase, label: 'Trips' },
  { path: '/voyage-ai', icon: Sparkles, label: 'AI' },
  { path: '/finance-hub', icon: Wallet, label: 'Budget' },
  { path: '/shared-journey', icon: Users2, label: 'Crew' },
  { path: '/journal', icon: BookOpen, label: 'Journal' },
];

export const AnimatedNavbar = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[200] w-[92%] max-w-[680px]">
      <motion.nav 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-around h-[64px] px-[18px] py-2 rounded-[22px] bg-[#080F23]/72 backdrop-blur-[24px] border border-white/8 shadow-[0_10px_40px_rgba(0,0,0,0.45)] transition-all duration-300"
      >
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} className="flex-1 flex justify-center">
              <motion.button 
                whileHover={{ y: -2 }}
                whileTap={{ scale: 1.05 }}
                className="relative group flex items-center justify-center w-[46px] h-[46px] transition-all duration-300"
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute inset-0 bg-white/10 rounded-full border border-white/10 backdrop-blur-[14px] shadow-[0_0_20px_rgba(0,255,255,0.15)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                <div className="relative z-10 flex flex-col items-center justify-center transition-all duration-300">
                  <item.icon 
                    size={20} 
                    strokeWidth={2}
                    className={cn(
                      "transition-all duration-300",
                      isActive ? "text-cyan-400" : "text-slate-400 group-hover:text-white"
                    )} 
                  />
                  
                  <span className={cn(
                    "absolute -bottom-4 text-[9px] font-bold uppercase tracking-[0.15em] transition-all duration-300 pointer-events-none whitespace-nowrap",
                    isActive ? "text-cyan-400 opacity-100" : "opacity-0 group-hover:opacity-100 text-slate-400"
                  )}>
                    {item.label}
                  </span>
                </div>

                {/* Magnetic Glow Effect */}
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-cyan-400/5 blur-xl transition-opacity pointer-events-none" />
              </motion.button>
            </Link>
          );
        })}
      </motion.nav>
    </div>
  );
};
