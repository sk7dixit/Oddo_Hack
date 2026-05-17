import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const moods = [
  'Exciting', 'Peaceful', 'Adventurous', 'Romantic', 'Emotional', 'Fun'
];

export const MoodTags = ({ selected, onSelect }: { selected: string, onSelect: (m: string) => void }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {moods.map((mood) => (
        <motion.button
          key={mood}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(mood)}
          className={cn(
            "px-5 py-2 rounded-full border text-xs font-bold transition-all duration-300",
            selected === mood 
              ? "bg-violet-500/20 border-violet-400 text-violet-400" 
              : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
          )}
        >
          {mood}
        </motion.button>
      ))}
    </div>
  );
};
