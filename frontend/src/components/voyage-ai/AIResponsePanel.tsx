import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Wallet, MapPin, CheckCircle2, ChevronRight, Share2, Download, UserCheck } from 'lucide-react';

interface AIResponseProps {
  data: {
    overview: string;
    highlights: string[];
    budget: string;
    bestTime: string;
    experiences: string[];
    suggestions: string[];
    personalityMatch: string;
    matchReason: string;
    personalizedPlan: {
      stay: string;
      transit: string;
      food: string;
    };
  };
  isStreaming: boolean;
}

export const AIResponsePanel = ({ data, isStreaming }: AIResponseProps) => {
  if (isStreaming || !data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[1000px] mx-auto space-y-8 pb-20 px-4"
    >
      {/* 1. PERSONAL MATCH BANNER (PHASE 3) */}
      <div className="flex items-center gap-4 p-6 rounded-[32px] bg-cyan-500/10 border border-cyan-500/20">
        <div className="h-12 w-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
          <UserCheck className="h-6 w-6" />
        </div>
        <div>
          <h4 className="text-sm font-black text-cyan-400 uppercase tracking-widest mb-1">Voyage Style Match: {data.personalityMatch}</h4>
          <p className="text-slate-300 text-sm font-medium">{data.matchReason}</p>
        </div>
      </div>

      {/* 2. HEADER INTELLIGENCE CARD */}
      <div className="relative p-10 rounded-[48px] bg-white/5 border border-white/10 overflow-hidden shadow-3xl">
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Intelligence Report</span>
          </div>
          
          <p className="text-2xl md:text-3xl font-bold text-white leading-tight">
            {data.overview}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-4 p-5 rounded-3xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all">
              <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Best Time to Visit</p>
                <p className="text-white font-bold">{data.bestTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 rounded-3xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all">
              <div className="h-12 w-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                <Wallet className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Estimated Budget</p>
                <p className="text-white font-bold">{data.budget}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] -mr-32 -mt-32" />
      </div>

      {/* 3. PERSONALIZED STRATEGY (PHASE 3) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(data.personalizedPlan).map(([key, val], i) => (
          <motion.div 
            key={key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className="p-6 rounded-[32px] bg-[#070B14] border border-white/5 space-y-3"
          >
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{key} Strategy</span>
            </div>
            <p className="text-slate-300 text-sm font-medium leading-relaxed">{val}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="p-8 rounded-[40px] bg-[#070B14] border border-white/5 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <MapPin className="h-5 w-5 text-cyan-400" />
              Tailored Destinations
            </h3>
            <div className="space-y-4">
              {data.highlights.map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/5">
                  <div className="h-8 w-8 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-xs font-bold">{i + 1}</div>
                  <span className="text-slate-200 font-medium">{item}</span>
                  <ChevronRight className="ml-auto h-4 w-4 text-slate-600" />
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-[40px] bg-[#070B14] border border-white/5 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-400" />
              Recommended for Your Style
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.experiences.map((exp, i) => (
                <div key={i} className="flex gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm font-medium leading-relaxed">{exp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="p-8 rounded-[40px] bg-gradient-to-br from-cyan-600/10 to-blue-600/10 border border-cyan-400/20 space-y-6">
            <h3 className="text-lg font-bold text-white uppercase tracking-widest text-center border-b border-white/5 pb-4">Guidance</h3>
            <div className="space-y-6">
              {data.suggestions.map((tip, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    <span className="text-xs font-black text-cyan-400 uppercase tracking-widest">Personal Tip</span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed font-medium">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              <Share2 className="h-4 w-4" /> Share Intelligence
            </button>
            <button className="w-full py-4 rounded-2xl bg-white text-slate-900 font-black text-sm hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
              <Download className="h-4 w-4" /> Export Report
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
