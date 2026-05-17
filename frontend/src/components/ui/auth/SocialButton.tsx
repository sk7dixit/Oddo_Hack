import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SocialButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
  variant?: 'google' | 'microsoft';
}

const SocialButton: React.FC<SocialButtonProps> = ({ icon, label, onClick, className, variant = 'google' }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "group relative flex w-full items-center justify-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold transition-all duration-300",
        "border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20",
        "text-white shadow-xl shadow-black/20",
        className
      )}
    >
      <div className="flex h-5 w-5 items-center justify-center grayscale group-hover:grayscale-0 transition-all">
        {icon}
      </div>
      <span>{label}</span>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
    </motion.button>
  );
};

export default SocialButton;
