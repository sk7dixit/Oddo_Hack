import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Users, MoreHorizontal, MapPin } from 'lucide-react';

interface HeaderProps {
  title: string;
  summary: string;
  dates: string;
  image: string;
  collaborators: string[];
  progress: number;
}

export const JourneyHeader = ({ title, summary, dates, image, collaborators, progress }: HeaderProps) => {
  return (
    <div className="relative h-[240px] w-full rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
      <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-[#070B14]/40 to-transparent" />
      
      <div className="absolute inset-0 p-8 flex items-end justify-between">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-400/10 px-3 py-1 text-[10px] font-bold text-cyan-400 border border-cyan-400/20 backdrop-blur-md">
            78% PLANNED
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-bold text-white tracking-tight">{title} <span className="text-blue-500 text-3xl">✈️</span></h1>
            <p className="flex items-center gap-2 text-slate-300 font-medium">
              <MapPin className="h-4 w-4 text-cyan-400" />
              {summary} • {dates}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex -space-x-3 pr-2 border-r border-white/10 mr-2">
            {collaborators.map((avatar, i) => (
              <img 
                key={i} 
                src={avatar} 
                alt="collab" 
                className="h-10 w-10 rounded-full border-2 border-[#070B14] hover:z-10 transition-all cursor-pointer"
              />
            ))}
            <div className="h-10 w-10 rounded-full bg-white/5 border-2 border-[#070B14] flex items-center justify-center text-xs text-white cursor-pointer hover:bg-white/10">
              +2
            </div>
          </div>
          
          <button className="h-12 w-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all">
            <Share2 className="h-5 w-5" />
          </button>
          <button className="h-12 w-12 rounded-2xl bg-cyan-400 text-black flex items-center justify-center font-bold hover:scale-105 transition-all">
            <MoreHorizontal className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
