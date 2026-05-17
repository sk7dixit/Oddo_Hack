import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

export const DailyExpenseTimeline = ({ expenses }: { expenses: any[] }) => {
  const formatINR = (val: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="p-8 rounded-[40px] bg-white/5 border border-white/10 space-y-8">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
          <Calendar className="h-5 w-5 text-blue-400" />
        </div>
        <h3 className="text-xl font-bold text-white tracking-tight">Daily Expenses Timeline</h3>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {expenses.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i }}
            className="w-48 shrink-0 p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col gap-4 relative group hover:border-cyan-400/30 transition-all"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{exp.date}</span>
              <h4 className="text-lg font-bold text-white">{exp.day}</h4>
            </div>
            
            <div className="space-y-2">
              <p className="text-xl font-bold text-cyan-400 tabular-nums">{formatINR(exp.amount)}</p>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-cyan-400/40" />
              </div>
            </div>

            <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
