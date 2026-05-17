import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, PieChart, TrendingUp, Info } from 'lucide-react';

export const BudgetSidebar = ({ budget }: { budget: any }) => {
  return (
    <div className="w-80 shrink-0 space-y-6">
      <div className="premium-card space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <Wallet className="h-5 w-5 text-emerald-400" />
            Trip Budget
          </h3>
          <Info className="h-4 w-4 text-slate-600" />
        </div>

        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
            <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Estimated Total</p>
            <h4 className="text-3xl font-bold text-white tracking-tight">₹97,000</h4>
          </div>

          <div className="space-y-4">
            {Object.entries(budget).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-cyan-400" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest capitalize">{key}</span>
                </div>
                <span className="text-sm font-bold text-white tabular-nums group-hover:text-cyan-400 transition-colors">
                  {value as string}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-black font-bold shadow-xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition-all text-sm">
          Optimize Costs
        </button>
      </div>

      <div className="premium-card bg-gradient-to-br from-blue-600/20 to-cyan-500/10 p-6 flex flex-col items-center text-center gap-4">
        <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
          <TrendingUp className="h-6 w-6 text-cyan-400" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-white mb-1">AI Recommendation</h4>
          <p className="text-[10px] text-slate-400 leading-relaxed">
            "Your budget for Activities is slightly higher than average for Tokyo. Try booking museum tickets 2 weeks in advance."
          </p>
        </div>
      </div>
    </div>
  );
};
