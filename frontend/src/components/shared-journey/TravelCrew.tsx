import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export const CrewMemberCard = ({ member }: { member: any }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-6 rounded-[32px] bg-white/5 border border-white/10 flex flex-col items-center text-center gap-4 group cursor-pointer hover:border-cyan-400/30 transition-all"
    >
      <div className="relative">
        <div className="h-20 w-20 rounded-full border-2 border-white/10 p-1 group-hover:border-cyan-400/50 transition-all">
          <img src={member.avatar} alt={member.name} className="h-full w-full rounded-full bg-white/5" />
        </div>
        {member.online && (
          <div className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-emerald-500 border-4 border-[#070B14] animate-pulse" />
        )}
      </div>
      
      <div>
        <h4 className="text-lg font-bold text-white tracking-tight">{member.name}</h4>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{member.role}</p>
      </div>

      <div className="w-full pt-4 border-t border-white/5">
        <p className="text-[10px] font-medium text-slate-400 italic">
          Currently: <span className="text-cyan-400">{member.task}</span>
        </p>
      </div>
    </motion.div>
  );
};

export const TravelCrew = ({ crew }: { crew: any[] }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xl font-bold text-white tracking-tight">Active Travel Crew</h2>
        <div className="flex gap-2">
          <button className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all">
            <UserPlus className="h-4 w-4" />
          </button>
          <button className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {crew.map((member) => (
          <CrewMemberCard key={member.id} member={member} />
        ))}
        
        {/* Invite Card */}
        <motion.div 
          whileHover={{ scale: 0.98 }}
          className="p-6 rounded-[32px] border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-center gap-3 cursor-pointer hover:border-white/20 hover:bg-white/5 transition-all"
        >
          <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center text-slate-500">
            <UserPlus className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white">Invite Friends</h4>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Add to Journey</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
