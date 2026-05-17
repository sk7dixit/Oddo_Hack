import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Zap, Wallet, Briefcase, Heart, Utensils } from 'lucide-react';
import { cn } from '@/lib/utils';

const styles = [
  { id: 'luxury', name: 'Luxury', icon: Heart, desc: 'Premium comfort & stays' },
  { id: 'adventure', name: 'Adventure', icon: Zap, desc: 'Thrills & exploration' },
  { id: 'budget', name: 'Budget', icon: Wallet, desc: 'Smart spending' },
  { id: 'backpacking', name: 'Backpacking', icon: Compass, desc: 'Raw & authentic' },
  { id: 'relaxation', name: 'Relaxation', icon: Briefcase, desc: 'Chill & unwind' },
  { id: 'culture', name: 'Food & Culture', icon: Utensils, desc: 'Taste the world' },
];

export const TravelStyleSelector = ({ selected, onSelect }: { selected: string, onSelect: (id: string) => void }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {styles.map((style) => (
        <motion.button
          key={style.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(style.id)}
          className={cn(
            "relative flex flex-col items-start p-4 rounded-2xl border transition-all duration-300 text-left group",
            selected === style.id 
              ? "bg-cyan-500/10 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.1)]" 
              : "bg-white/5 border-white/10 hover:border-white/20"
          )}
        >
          <div className={cn(
            "mb-3 h-10 w-10 rounded-xl flex items-center justify-center transition-colors",
            selected === style.id ? "bg-cyan-400 text-black" : "bg-white/5 text-slate-400 group-hover:text-white"
          )}>
            <style.icon className="h-5 w-5" />
          </div>
          <h4 className={cn(
            "text-sm font-bold tracking-tight",
            selected === style.id ? "text-white" : "text-slate-300"
          )}>{style.name}</h4>
          <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">{style.desc}</p>
          
          {selected === style.id && (
            <motion.div 
              layoutId="style-ring"
              className="absolute inset-0 rounded-2xl border-2 border-cyan-400/50 pointer-events-none"
            />
          )}
        </motion.button>
      ))}
    </div>
  );
};
