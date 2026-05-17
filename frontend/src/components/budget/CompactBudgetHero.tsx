import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, Sparkles, ArrowUpRight } from 'lucide-react';
import { financeIntelligence } from '@/data/finance';

export const CompactBudgetHero = () => {
  const { summary } = financeIntelligence;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
      {/* Left: Summary */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:col-span-7 p-10 rounded-[40px] bg-white/5 border border-white/10 relative overflow-hidden group shadow-2xl"
      >
        <div className="relative z-10 space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
              <Wallet className="h-5 w-5" />
            </div>
            <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">{summary.trip}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-1">
              <p className="text-[11px] font-black text-cyan-400 uppercase tracking-widest">Total Planned Budget</p>
              <h1 className="text-6xl font-black text-white tracking-tighter">
                ₹{summary.planned.toLocaleString()}
              </h1>
            </div>
            
            <div className="flex items-center gap-6 pb-2">
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Spent</p>
                <p className="text-xl font-bold text-white">₹{summary.spent.toLocaleString()}</p>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Remaining</p>
                <p className="text-xl font-bold text-cyan-400">₹{summary.remaining.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-[11px] font-black text-slate-500 uppercase tracking-widest">
              <span>Budget Utilization</span>
              <span className="text-cyan-400">{summary.utilized}% Spent</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${summary.utilized}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
              />
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute right-0 top-0 h-64 w-64 bg-cyan-500/5 blur-[100px] rounded-full group-hover:bg-cyan-500/10 transition-all duration-1000" />
      </motion.div>

      {/* Right: AI Quick Insights */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:col-span-5 p-10 rounded-[40px] bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-white/10 flex flex-col justify-between shadow-2xl"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-cyan-400">
            <Sparkles className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">AI Intelligence</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight leading-tight">
            You're currently spending <br/> <span className="text-cyan-400 italic">8% below</span> your average daily limit.
          </h3>
          <p className="text-slate-400 text-sm font-medium leading-relaxed">
            Optimization active: Suggesting lower-cost transport alternatives for Kyoto segment.
          </p>
        </div>

        <button className="w-full mt-8 py-4 rounded-[22px] bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
          Review Optimization Strategy <ArrowUpRight className="h-3 w-3" />
        </button>
      </motion.div>
    </div>
  );
};
