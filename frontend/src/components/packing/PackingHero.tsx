import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

export const PackingHero = () => {
  return (
    <div className="space-y-4">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-bold text-blue-400 border border-blue-500/20"
      >
        <Briefcase className="h-3.5 w-3.5" />
        <span className="uppercase tracking-widest">Travel Readiness</span>
      </motion.div>
      
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-white lg:text-5xl">
          Packing Center <span className="text-blue-500">🎒</span>
        </h1>
        <p className="text-lg text-slate-400 font-medium max-w-2xl">
          Stay organized and prepared for every adventure. Track your essentials with cinematic precision.
        </p>
      </div>
    </div>
  );
};
