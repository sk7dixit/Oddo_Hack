import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Cloud, Wallet } from 'lucide-react';

export const DestinationGrid = ({ destinations }: { destinations: any[] }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <Compass className="h-5 w-5 text-emerald-500" />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Discovery</h2>
        </div>
        <button className="text-xs font-bold uppercase tracking-widest text-emerald-400 hover:text-emerald-300 transition-colors">
          Explore All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((dest, i) => (
          <motion.div
            key={dest.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group relative h-[300px] overflow-hidden rounded-[24px] border border-white/8 bg-[#070B14]"
          >
            <img 
              src={dest.image} 
              alt={dest.name} 
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
            
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <div className="space-y-3">
                <div>
                  <h3 className="text-xl font-bold text-white">{dest.name}</h3>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{dest.country}</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-white bg-black/60 px-2 py-1 rounded-lg border border-white/10">
                    <Cloud className="h-3 w-3 text-cyan-400" />
                    {dest.weather}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-white bg-black/60 px-2 py-1 rounded-lg border border-white/10">
                    <Wallet className="h-3 w-3 text-emerald-400" />
                    {dest.budget}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {dest.tags.map((tag: string) => (
                    <span key={tag} className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md bg-white/5 text-slate-400 border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
