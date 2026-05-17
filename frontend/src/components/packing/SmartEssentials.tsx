import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Plus, MapPin } from 'lucide-react';

export const SmartEssentials = ({ essentials }: { essentials: any[] }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-violet-400" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Smart Essentials</h2>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">
          <MapPin className="h-3 w-3" />
          Based on Japan
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {essentials.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * i }}
            className="p-6 rounded-[32px] bg-white/5 border border-white/10 group cursor-pointer hover:border-violet-400/30 transition-all flex flex-col justify-between h-full"
          >
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white">{item.name}</h4>
              <p className="text-[10px] text-slate-500 leading-relaxed italic">"{item.reason}"</p>
            </div>
            
            <button className="mt-6 flex items-center gap-2 text-[10px] font-bold text-violet-400 uppercase tracking-widest group-hover:text-violet-300 transition-colors">
              <Plus className="h-3.5 w-3.5" /> Add to List
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
