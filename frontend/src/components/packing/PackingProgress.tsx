import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export const PackingProgress = ({ total, packed }: { total: number, packed: number }) => {
  const percentage = Math.round((packed / total) * 100);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 rounded-[40px] bg-white/5 border border-white/10 flex items-center justify-between shadow-2xl overflow-hidden relative group"
    >
      <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
        <CheckCircle2 className="h-40 w-40 text-blue-400" />
      </div>

      <div className="relative z-10 flex items-center gap-10">
        {/* Progress Ring */}
        <div className="relative h-32 w-32">
          <svg className="h-full w-full" viewBox="0 0 100 100">
            <circle 
              className="text-white/5 stroke-current" 
              strokeWidth="8" 
              cx="50" cy="50" r="40" fill="transparent" 
            />
            <motion.circle 
              className="text-blue-500 stroke-current" 
              strokeWidth="8" 
              strokeLinecap="round" 
              cx="50" cy="50" r="40" fill="transparent" 
              initial={{ strokeDasharray: "0, 251.2" }}
              animate={{ strokeDasharray: `${percentage * 2.512}, 251.2` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-white">{percentage}%</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Done</span>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white tracking-tight">Packing Progress</h3>
          <p className="text-slate-400 font-medium">
            <span className="text-blue-400 font-bold">{packed}</span> of <span className="text-white font-bold">{total}</span> items are ready for the journey.
          </p>
          <div className="flex gap-2 pt-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`h-1 w-8 rounded-full ${i < (percentage/20) ? 'bg-blue-500' : 'bg-white/10'}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="hidden lg:block">
        <button className="px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold shadow-xl shadow-blue-600/20 hover:scale-105 active:scale-95 transition-all">
          Mark All Ready
        </button>
      </div>
    </motion.div>
  );
};
