import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, TrendingDown, Sparkles, ChevronRight, ArrowUpRight } from 'lucide-react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';
import { useTravelStore } from '@/store/useTravelStore';
import { useNavigate } from 'react-router-dom';

export const BudgetSnapshot = () => {
  const { budget } = useTravelStore();
  const navigate = useNavigate();

  // Prepare data for Recharts RadialBarChart
  // We reverse it so the largest is outside or inside depending on preference.
  const chartData = [...budget.categories].reverse().map(cat => ({
    name: cat.name,
    value: (cat.spent / cat.total) * 100,
    fill: cat.color,
  }));

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative flex flex-col p-8 rounded-[32px] bg-[#0F1428]/72 border border-white/8 backdrop-blur-xl shadow-2xl transition-all hover:border-emerald-500/20"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-white tracking-tight">Budget Intelligence</h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Financial Health</p>
        </div>
        <button 
          onClick={() => navigate('/finance-hub')}
          className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
        >
          <ArrowUpRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Radial Rings Area */}
        <div className="h-[200px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart 
              cx="50%" 
              cy="50%" 
              innerRadius="30%" 
              outerRadius="100%" 
              barSize={10} 
              data={chartData}
              startAngle={90} 
              endAngle={450}
            >
              <RadialBar
                background
                dataKey="value"
                cornerRadius={5}
              />
            </RadialBarChart>
          </ResponsiveContainer>
          
          {/* Central Percentage */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-bold text-white">
              {Math.round((budget.spent / budget.total) * 100)}%
            </span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Spent</span>
          </div>
        </div>

        {/* Categories & Legend */}
        <div className="space-y-4">
          <div className="space-y-3">
            {budget.categories.slice(0, 3).map((cat) => (
              <div key={cat.name} className="flex items-center justify-between group/item">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-xs font-bold text-slate-400 group-hover/item:text-white transition-colors">{cat.name}</span>
                </div>
                <span className="text-xs font-bold text-white">${cat.spent}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/5">
            <div className="flex items-center gap-2 text-emerald-400 mb-2">
              <TrendingDown size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Spending Insight</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
              {budget.aiInsight}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Spent</p>
          <p className="text-xl font-bold text-white">${budget.spent.toLocaleString()}</p>
        </div>
        <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
          <p className="text-[10px] font-bold text-emerald-500/60 uppercase tracking-widest mb-1">Optimization</p>
          <div className="flex items-center gap-2">
            <CheckCircle size={14} className="text-emerald-500" />
            <p className="text-xl font-bold text-emerald-500">82%</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CheckCircle = ({ size, className }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);
