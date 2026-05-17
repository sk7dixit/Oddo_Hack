import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Home, Utensils, Zap, Train, ShoppingBag, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: any = { Plane, Home, Utensils, Zap, Train, ShoppingBag, ShieldAlert };

export const CategoryCard = ({ category, index }: { category: any, index: number }) => {
  const Icon = iconMap[category.icon] || ShieldAlert;
  const formatINR = (val: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.05 * index }}
      whileHover={{ y: -5 }}
      className="p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col justify-between space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 text-slate-300" style={{ color: category.color }}>
          <Icon className="h-5 w-5" />
        </div>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{category.percentage}%</span>
      </div>

      <div>
        <h4 className="text-sm font-bold text-white mb-1">{category.name}</h4>
        <p className="text-lg font-bold text-white tabular-nums">{formatINR(category.amount)}</p>
      </div>

      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${category.percentage}%` }}
          transition={{ duration: 1, delay: 0.1 * index }}
          className="h-full rounded-full"
          style={{ backgroundColor: category.color }}
        />
      </div>
    </motion.div>
  );
};
