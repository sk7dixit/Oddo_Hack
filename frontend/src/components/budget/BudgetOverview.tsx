import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface OverviewProps {
  total: number;
  spent: number;
  remaining: number;
}

export const BudgetOverview = ({ total, spent, remaining }: OverviewProps) => {
  const percentage = (spent / total) * 100;
  const formatINR = (val: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Stats Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="lg:col-span-2 relative p-8 rounded-[40px] bg-white/5 border border-white/10 overflow-hidden group shadow-2xl"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
          <TrendingUp className="h-40 w-40 text-emerald-400" />
        </div>

        <div className="relative z-10 space-y-10">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white tracking-tight">Total Trip Budget</h3>
            <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ArrowUpRight className="h-5 w-5" />
            </div>
          </div>

          <div className="space-y-2">
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-6xl font-bold text-white tracking-tighter"
            >
              {formatINR(total)}
            </motion.h2>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Base Estimate</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest">
              <span className="text-emerald-400">Spent: {formatINR(spent)}</span>
              <span className="text-slate-400">Progress: {percentage.toFixed(0)}%</span>
            </div>
            <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Remaining Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-8 rounded-[40px] bg-emerald-500/10 border border-emerald-500/20 flex flex-col justify-center items-center text-center space-y-4 shadow-xl"
      >
        <div className="h-16 w-16 rounded-3xl bg-emerald-500 flex items-center justify-center text-black shadow-lg shadow-emerald-500/20">
          <ArrowDownRight className="h-8 w-8" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1">Available Funds</p>
          <h3 className="text-4xl font-bold text-white tracking-tight">{formatINR(remaining)}</h3>
        </div>
        <button className="mt-4 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-white hover:bg-white/10 transition-all">
          Adjust Limit
        </button>
      </motion.div>
    </div>
  );
};
