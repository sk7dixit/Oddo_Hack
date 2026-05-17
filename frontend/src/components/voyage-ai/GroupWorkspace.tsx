import React from 'react';
import { motion } from 'framer-motion';
import { Users, Vote, Wallet, MessageSquare, Presentation, Heart } from 'lucide-react';
import { mockGroupData } from '@/data/ai/agent';

export const GroupWorkspace = () => {
  return (
    <div className="max-w-[1000px] mx-auto px-4 space-y-12 mb-20">
      {/* Group Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-[48px] bg-white/5 border border-white/10 shadow-3xl overflow-hidden relative">
        <div className="relative z-10 flex items-center gap-6">
          <div className="flex -space-x-4">
            {mockGroupData.members.map((m, i) => (
              <div 
                key={i} 
                className="h-14 w-14 rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-600 border-4 border-[#070B14] flex items-center justify-center text-white font-black text-xl shadow-xl"
              >
                {m.avatar}
              </div>
            ))}
            <div className="h-14 w-14 rounded-2xl bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center text-slate-500 hover:text-white cursor-pointer transition-all">
              +
            </div>
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-white tracking-tight">{mockGroupData.tripName}</h2>
            <div className="flex items-center gap-2 text-cyan-400 text-[10px] font-black uppercase tracking-widest">
              <Users className="h-3 w-3" /> Collaborative Workspace
            </div>
          </div>
        </div>

        <div className="relative z-10 flex gap-3">
          <button className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all">
            <MessageSquare className="h-5 w-5" />
          </button>
          <button className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all">
            <Presentation className="h-5 w-5" />
          </button>
        </div>
        
        {/* Ambient background glow */}
        <div className="absolute -right-20 -top-20 h-64 w-64 bg-cyan-600/10 blur-[100px] rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Voting System */}
        <div className="md:col-span-2 p-8 rounded-[40px] bg-[#070B14] border border-white/5 space-y-6 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <Vote className="h-5 w-5 text-purple-400" />
              Destination Voting
            </h3>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Decisions</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.entries(mockGroupData.votes).map(([country, count], i) => (
              <motion.div 
                key={country}
                whileHover={{ y: -5 }}
                className={`p-6 rounded-[32px] border transition-all duration-500 cursor-pointer ${
                  count > 2 ? 'bg-cyan-500/10 border-cyan-400/30' : 'bg-white/5 border-white/5'
                }`}
              >
                <span className="text-3xl mb-4 block">
                  {country === 'Japan' ? '🇯🇵' : country === 'Italy' ? '🇮🇹' : '🇮🇩'}
                </span>
                <h4 className="text-white font-bold text-lg mb-1">{country}</h4>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{count} Votes</span>
                  {count > 2 && <Heart className="h-3 w-3 text-cyan-400 fill-cyan-400" />}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Group Budget Tracker */}
        <div className="p-8 rounded-[40px] bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-white/10 space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-3">
            <Wallet className="h-5 w-5 text-cyan-400" />
            Group Budget
          </h3>
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white/5 space-y-2">
              <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span>Total Estimate</span>
                <span>₹8,50,000</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: '65%' }} className="h-full bg-cyan-400" />
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed font-medium">
              Voyage AI suggests a mid-range budget to balance Sarah's backpacker style with Aman's luxury preferences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
