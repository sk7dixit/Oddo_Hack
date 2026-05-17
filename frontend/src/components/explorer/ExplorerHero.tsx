import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

interface ExplorerHeroProps {
  selectedCountry: string;
}

export const ExplorerHero = ({ selectedCountry }: ExplorerHeroProps) => {
  return (
    <div className="relative h-[45vh] min-h-[440px] w-full flex items-center justify-center overflow-hidden">
      {/* Background with cinematic overlay */}
      <div className="absolute inset-0 z-0">
        <motion.div
          key={selectedCountry}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="h-full w-full transform-gpu"
        >
          <img 
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2000"
            className="h-full w-full object-cover transform-gpu"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-[#070B14]" />
        </motion.div>

      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl px-6 flex flex-col items-center text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">
            Discover Your <span className="text-cyan-400">Next Story</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl font-medium opacity-80">
            Cinematic destinations curated for the modern explorer
          </p>
        </motion.div>

        {/* Glassmorphism Search */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-xl group"
        >
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
            <input 
              type="text"
              placeholder="Search by city, experience or vibe..."
              className="w-full h-16 pl-14 pr-6 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 focus:border-cyan-400/30 transition-all shadow-2xl"
            />
          </div>
          
          <div className="flex items-center justify-center gap-4 mt-6">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Popular</span>
            <div className="flex gap-3">
              {['India', 'Japan', 'Italy', 'Switzerland'].map((item) => (
                <button key={item} className="text-xs font-bold text-slate-300 hover:text-cyan-400 transition-colors">
                  {item}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
