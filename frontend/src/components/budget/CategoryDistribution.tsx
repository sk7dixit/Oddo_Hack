import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Plane, Hotel, Utensils, Ticket, TrainFront, ShoppingBag } from 'lucide-react';
import { financeIntelligence } from '@/data/finance';

const iconMap: any = {
  Plane: Plane,
  Hotel: Hotel,
  Utensils: Utensils,
  Ticket: Ticket,
  TrainFront: TrainFront,
  ShoppingBag: ShoppingBag
};

export const CategoryDistribution = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-32">
      {/* Left: Donut Chart Visualization */}
      <div className="lg:col-span-5 flex flex-col items-center justify-center p-8">
        <div className="relative h-64 w-64 md:h-80 md:w-80 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {financeIntelligence.categories.map((cat, i) => {
              // Calculate accurate stroke positioning for a standard solid donut
              const total = financeIntelligence.categories.reduce((sum, c) => sum + c.percentage, 0);
              const normalizedPercentage = (cat.percentage / total) * 100;
              const offset = financeIntelligence.categories.slice(0, i).reduce((sum, c) => sum + (c.percentage / total) * 100, 0);
              
              return (
                <motion.circle
                  key={cat.name}
                  cx="50" cy="50" r="40"
                  fill="transparent"
                  stroke={cat.color}
                  strokeWidth="14"
                  strokeDasharray={`${normalizedPercentage} ${100 - normalizedPercentage}`}
                  strokeDashoffset={-offset}
                  initial={{ strokeDasharray: "0 100", opacity: 0.5 }}
                  animate={{ strokeDasharray: `${normalizedPercentage} ${100 - normalizedPercentage}`, opacity: 0.8 }}
                  whileHover={{ strokeWidth: 18, opacity: 1 }}
                  transition={{ duration: 1.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="cursor-pointer transition-all duration-300"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1">
            <PieChart className="h-8 w-8 text-slate-400 opacity-50" />
            <div className="flex flex-col items-center">
              <span className="text-3xl font-black text-white">₹{financeIntelligence.summary.spent.toLocaleString()}</span>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Total Spent</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Compact Category Rows */}
      <div className="lg:col-span-7 space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-xl font-bold text-white tracking-tight">Category Breakdown</h3>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Real-time spend</span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {financeIntelligence.categories.map((cat, i) => {
            const Icon = iconMap[cat.icon];
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-5 rounded-[22px] bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/[0.07] transition-all flex items-center gap-6 group"
              >
                <div className="h-12 w-12 rounded-[18px] bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors" style={{ color: cat.color }}>
                  <Icon className="h-5 w-5" />
                </div>
                
                <div className="flex-grow space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-bold text-white">{cat.name}</span>
                    <div className="text-right">
                      <span className="text-sm font-bold text-white">₹{cat.amount.toLocaleString()}</span>
                      <span className="text-[10px] font-black text-slate-600 ml-2 uppercase tracking-widest">{cat.percentage}%</span>
                    </div>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.percentage}%` }}
                      transition={{ duration: 1.2, delay: 0.5 + (i * 0.1) }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
