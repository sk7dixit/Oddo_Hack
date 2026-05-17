import React from 'react';
import { motion } from 'framer-motion';
import { theme } from '@/styles/theme';
import { cn } from '@/lib/utils';

export const GlassCard = ({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => {
  return (
    <motion.div
      whileHover={onClick ? theme.animations.hover : {}}
      whileTap={onClick ? theme.animations.tap : {}}
      onClick={onClick}
      className={cn(theme.glass, "rounded-3xl p-6 transition-all duration-500", className)}
    >
      {children}
    </motion.div>
  );
};

export const GlowButton = ({ children, className, variant = 'primary', ...props }: any) => {
  const variants: any = {
    primary: "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-xl shadow-cyan-600/20",
    secondary: "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xl shadow-purple-600/20",
    outline: "bg-white/5 border border-white/10 text-white hover:bg-white/10"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "px-8 py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={theme.animations.page.initial}
      animate={theme.animations.page.animate}
      exit={theme.animations.page.exit}
      transition={theme.animations.page.transition}
    >
      {children}
    </motion.div>
  );
};
