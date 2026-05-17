import React from 'react';
import { motion } from 'framer-motion';
import { CloudRain, Sun, Users, Calendar, AlertCircle, Zap, TrendingDown, Clock } from 'lucide-react';
import { liveConditions, agentInsights } from '@/data/ai/agent';

export const LiveIntelligencePanel = ({ country }: { country: string }) => {
  const data = liveConditions[country] || liveConditions.Japan;
  const isRainy = data.status === 'rainy';

  return (
    <div className="max-w-[1000px] mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-4 mb-20">
      <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex flex-col items-center justify-center text-center space-y-2">
        {isRainy ? <CloudRain className="h-6 w-6 text-cyan-400" /> : <Sun className="h-6 w-6 text-yellow-400" />}
        <span className="text-xl font-bold text-white">{data.temp}</span>
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{data.weather}</span>
      </div>
      <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex flex-col items-center justify-center text-center space-y-2">
        <Users className="h-6 w-6 text-purple-400" />
        <span className="text-xl font-bold text-white">{data.crowds.split(' ')[0]}</span>
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tourism Density</span>
      </div>
      <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex flex-col items-center justify-center text-center space-y-2 col-span-1 md:col-span-2">
        <Calendar className="h-6 w-6 text-pink-400" />
        <span className="text-lg font-bold text-white line-clamp-1">{data.events[0]}</span>
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live Event Active</span>
      </div>
    </div>
  );
};

export const AgentInsights = () => {
  return (
    <div className="max-w-[1000px] mx-auto px-4 space-y-6 mb-20">
      <div className="flex items-center gap-3">
        <Zap className="h-5 w-5 text-yellow-400" />
        <h3 className="text-xl font-bold text-white uppercase tracking-widest text-sm">Autonomous AI Insights</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {agentInsights.map((insight) => (
          <motion.div 
            key={insight.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-[32px] bg-white/5 border border-white/10 hover:border-yellow-400/30 transition-all group"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-2xl bg-yellow-400/10 flex items-center justify-center text-yellow-400">
                {insight.id === 'fatigue' ? <Clock className="h-5 w-5" /> : insight.id === 'weather' ? <AlertCircle className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
              </div>
              <h4 className="text-sm font-black text-white uppercase tracking-widest">{insight.title}</h4>
            </div>
            <p className="text-slate-400 text-sm font-medium leading-relaxed group-hover:text-slate-200 transition-colors">
              {insight.desc}
            </p>
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest">Proactive Fix</span>
              <button className="text-[10px] font-black text-white uppercase tracking-widest hover:text-yellow-400 transition-all">
                Apply Optimization
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
