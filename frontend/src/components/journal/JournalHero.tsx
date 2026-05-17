import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export const JournalHero = () => {
  return (
    <div className="space-y-4">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-4 py-1.5 text-xs font-bold text-violet-400 border border-violet-500/20"
      >
        <BookOpen className="h-3.5 w-3.5" />
        <span className="uppercase tracking-widest">Memories & Stories</span>
      </motion.div>
      
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-white lg:text-5xl">
          Travel Journal <span className="text-violet-500">📖</span>
        </h1>
        <p className="text-lg text-slate-400 font-medium max-w-2xl">
          Capture every unforgettable moment. Turn your journey into a cinematic story that lasts forever.
        </p>
      </div>
    </div>
  );
};
