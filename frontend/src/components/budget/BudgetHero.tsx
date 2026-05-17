import React from 'react';
import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';

export const BudgetHero = () => {
  return (
    <div className="space-y-4">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-400 border border-emerald-500/20"
      >
        <Wallet className="h-3.5 w-3.5" />
        <span className="uppercase tracking-widest">Financial Intelligence</span>
      </motion.div>
      
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-white lg:text-5xl">
          Smart Travel Budget <span className="text-emerald-500">💰</span>
        </h1>
        <p className="text-lg text-slate-400 font-medium max-w-2xl">
          Track every expense with precision. Visualize your journey's financial footprint before you even pack.
        </p>
      </div>
    </div>
  );
};
