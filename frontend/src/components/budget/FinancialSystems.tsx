import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, AlertCircle, TrendingDown, Target, BrainCircuit, Activity } from 'lucide-react';
import { financeIntelligence } from '@/data/finance';

export const AIIntelligenceRail = () => {
  return (
    <div className="space-y-8 mb-32">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
          <BrainCircuit className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">Financial Intelligence Rail</h3>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Autonomous Strategy recommendations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {financeIntelligence.insights.map((insight) => (
          <motion.div
            key={insight.id}
            whileHover={{ y: -5 }}
            className="p-8 rounded-[32px] bg-white/5 border border-white/5 hover:border-white/10 transition-all group flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className={`h-10 w-10 rounded-2xl flex items-center justify-center ${
                  insight.type === 'warning' ? 'bg-orange-500/10 text-orange-400' : 
                  insight.type === 'prediction' ? 'bg-purple-500/10 text-purple-400' : 'bg-emerald-500/10 text-emerald-400'
                }`}>
                  {insight.type === 'warning' ? <AlertCircle className="h-5 w-5" /> : 
                   insight.type === 'prediction' ? <TrendingDown className="h-5 w-5" /> : <Target className="h-5 w-5" />}
                </div>
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{insight.impact} impact</span>
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-white leading-tight group-hover:text-cyan-400 transition-colors">{insight.text}</h4>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">{insight.detail}</p>
              </div>
            </div>
            
            <button className="mt-8 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2">
              Review Strategy →
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export const FinancialHealth = () => {
  const { health } = financeIntelligence;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-40">
      {/* Left: Health Score Card */}
      <div className="lg:col-span-8 p-12 rounded-[48px] bg-gradient-to-br from-emerald-600/10 via-blue-600/5 to-cyan-600/5 border border-white/10 relative overflow-hidden flex flex-col md:flex-row items-center gap-12 shadow-2xl">
        <div className="relative h-48 w-48 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
            <motion.circle
              cx="50" cy="50" r="45"
              fill="transparent"
              stroke="#10b981"
              strokeWidth="8"
              strokeDasharray="283"
              initial={{ strokeDashoffset: 283 }}
              animate={{ strokeDashoffset: 283 - (283 * health.score / 100) }}
              transition={{ duration: 2, ease: "easeOut" }}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-black text-white">{health.score}</span>
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Health Score</span>
          </div>
        </div>

        <div className="flex-grow space-y-6 text-center md:text-left">
          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em]">{health.status}</span>
            </div>
            <h3 className="text-3xl font-black text-white tracking-tight uppercase italic">Financial <span className="not-italic text-slate-500">Integrity Analysis</span></h3>
          </div>
          <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-xl">
            {health.analysis}
          </p>
        </div>
      </div>

      {/* Right: Metric Meters */}
      <div className="lg:col-span-4 p-10 rounded-[48px] bg-white/5 border border-white/10 flex flex-col justify-between shadow-2xl">
        <div className="space-y-8">
          {health.metrics.map((metric, i) => (
            <div key={metric.label} className="space-y-3">
              <div className="flex justify-between text-[11px] font-black text-slate-500 uppercase tracking-widest">
                <span>{metric.label}</span>
                <span className="text-white">{metric.value}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.value}%` }}
                  transition={{ duration: 1.5, delay: i * 0.1 }}
                  className="h-full bg-emerald-500/50"
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="pt-10 flex items-center gap-3 text-emerald-400/50 text-[9px] font-bold uppercase tracking-widest">
          <Activity className="h-3 w-3" /> Predictive model active — 98% accuracy
        </div>
      </div>
    </div>
  );
};
