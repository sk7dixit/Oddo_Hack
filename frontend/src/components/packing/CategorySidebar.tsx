import React from 'react';
import { motion } from 'framer-motion';
import { Shirt, FileText, Smartphone, Droplets, ShieldPlus, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: any = { Shirt, FileText, Smartphone, Droplets, ShieldPlus };

export const CategorySidebar = ({ categories, activeId, onSelect }: { categories: any[], activeId: string, onSelect: (id: string) => void }) => {
  return (
    <div className="w-80 shrink-0 space-y-4">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Categories</h3>
        <button className="text-slate-500 hover:text-white"><MoreHorizontal className="h-4 w-4" /></button>
      </div>

      <div className="space-y-3">
        {categories.map((cat) => {
          const Icon = iconMap[cat.icon] || Shirt;
          const percentage = Math.round((cat.packed / cat.count) * 100);
          
          return (
            <motion.button
              key={cat.id}
              whileHover={{ x: 5 }}
              onClick={() => onSelect(cat.id)}
              className={cn(
                "w-full p-4 rounded-2xl border transition-all duration-300 text-left relative overflow-hidden group",
                activeId === cat.id 
                  ? "bg-blue-500/10 border-blue-400/50 shadow-lg shadow-blue-900/10" 
                  : "bg-white/5 border-white/10 hover:border-white/20"
              )}
            >
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "h-10 w-10 rounded-xl flex items-center justify-center transition-colors",
                    activeId === cat.id ? "bg-blue-500 text-white" : "bg-white/5 text-slate-400 group-hover:text-white"
                  )}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className={cn(
                      "text-sm font-bold tracking-tight",
                      activeId === cat.id ? "text-white" : "text-slate-300"
                    )}>{cat.name}</h4>
                    <p className="text-[10px] text-slate-500 font-medium">{cat.count} Items</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-blue-400">{percentage}%</span>
                </div>
              </div>
              
              {/* Progress Background */}
              <div className="absolute bottom-0 left-0 h-1 bg-blue-500/20 w-full">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  className="h-full bg-blue-500"
                />
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
