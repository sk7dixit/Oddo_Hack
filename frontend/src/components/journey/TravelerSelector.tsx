import React from 'react';
import { motion } from 'framer-motion';
import { User, Users, Heart, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

const options = [
  { id: 'solo', name: 'Solo', icon: User, desc: 'Individual explorer' },
  { id: 'couple', name: 'Couple', icon: Heart, desc: 'Duo adventure' },
  { id: 'friends', name: 'Friends', icon: Users, desc: 'Group experience' },
  { id: 'family', name: 'Family', icon: Home, desc: 'Multi-gen journey' },
];

export const TravelerSelector = ({ selected, onSelect }: { selected: string, onSelect: (id: string) => void }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {options.map((opt) => (
        <motion.button
          key={opt.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(opt.id)}
          className={cn(
            "relative flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 text-left group",
            selected === opt.id 
              ? "bg-blue-500/10 border-blue-400" 
              : "bg-white/5 border-white/10 hover:border-white/20"
          )}
        >
          <div className={cn(
            "h-12 w-12 rounded-xl flex items-center justify-center shrink-0 transition-colors",
            selected === opt.id ? "bg-blue-500 text-white" : "bg-white/5 text-slate-400 group-hover:text-white"
          )}>
            <opt.icon className="h-6 w-6" />
          </div>
          <div>
            <h4 className={cn(
              "text-sm font-bold tracking-tight",
              selected === opt.id ? "text-white" : "text-slate-300"
            )}>{opt.name}</h4>
            <p className="text-[10px] text-slate-500 mt-0.5">{opt.desc}</p>
          </div>
        </motion.button>
      ))}
    </div>
  );
};
