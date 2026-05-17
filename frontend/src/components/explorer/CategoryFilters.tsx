import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const CategoryFilters = ({ categories, selected, onSelect }: { categories: string[], selected: string, onSelect: (cat: string) => void }) => {
  return (
    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
      {categories.map((cat) => (
        <motion.button
          key={cat}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(cat)}
          className={cn(
            "px-6 py-2.5 rounded-full border text-sm font-bold transition-all duration-300 whitespace-nowrap",
            selected === cat 
              ? "bg-cyan-500/20 border-cyan-400 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)]" 
              : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20"
          )}
        >
          {cat}
        </motion.button>
      ))}
    </div>
  );
};
