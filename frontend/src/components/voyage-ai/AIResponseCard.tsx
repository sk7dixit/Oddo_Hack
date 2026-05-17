import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Wallet, CloudRain, MapPin, Zap, ArrowRight, Save } from 'lucide-react';
import { cn } from '@/lib/utils';

export const AIResponseCard = ({ data, isStreaming }: { data: any, isStreaming: boolean }) => {
  if (isStreaming) {
    return (
      <div className="max-w-4xl mx-auto premium-card p-12 space-y-8 animate-pulse">
        <div className="h-8 w-1/3 bg-white/5 rounded-lg" />
        <div className="h-4 w-2/3 bg-white/5 rounded-lg" />
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 w-full bg-white/5 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-12"
    >
      {/* Response Header */}
      <div className="premium-card p-12 space-y-8 border-cyan-500/20 shadow-[0_0_50px_rgba(34,211,238,0.1)]">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-[10px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-400/20">
              <Zap className="h-3 w-3 fill-cyan-400" /> AI Optimized Strategy
            </div>
            <h2 className="text-4xl font-bold text-white tracking-tight">{data.title}</h2>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white hover:bg-white/10 transition-all">
            <Save className="h-4 w-4" /> Save to Itinerary
          </button>
        </div>

        <p className="text-lg text-slate-400 leading-relaxed italic">
          "{data.summary}"
        </p>

        {/* Itinerary Timeline */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-purple-400" />
            <h3 className="text-xl font-bold text-white tracking-tight">Smart Timeline</h3>
          </div>
          
          <div className="space-y-4">
            {data.itinerary.map((day: any, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                className="group flex items-center gap-6 p-5 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all cursor-pointer"
              >
                <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">
                  D{day.day}
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="text-sm font-bold text-white">{day.activity}</h4>
                  <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    <span className="flex items-center gap-1"><Zap className="h-3 w-3" /> {day.type}</span>
                    <span>{day.duration}</span>
                    <span className="text-emerald-400">{day.cost}</span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-white transition-all" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dual Insight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          {/* Budget Insight */}
          <div className="p-8 rounded-[32px] bg-emerald-500/10 border border-emerald-500/20 space-y-4">
            <div className="flex items-center gap-3">
              <Wallet className="h-5 w-5 text-emerald-400" />
              <h4 className="text-sm font-bold text-white">Budget Optimization</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {data.budgetAnalysis.insight}
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-emerald-500/20">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Est. Savings</span>
              <span className="text-lg font-bold text-emerald-400">{data.budgetAnalysis.savings}</span>
            </div>
          </div>

          {/* Weather Insight */}
          <div className="p-8 rounded-[32px] bg-blue-500/10 border border-blue-500/20 space-y-4">
            <div className="flex items-center gap-3">
              <CloudRain className="h-5 w-5 text-blue-400" />
              <h4 className="text-sm font-bold text-white">Weather Intelligence</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {data.weatherAlert.suggestion}
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-blue-500/20">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current Condition</span>
              <span className="text-lg font-bold text-blue-400">{data.weatherAlert.condition}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
