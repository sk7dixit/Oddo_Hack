import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const VoyageHero = () => {
  return (
    <div className="relative pt-10 pb-20 overflow-hidden text-center space-y-8">
      {/* Background AI Effects */}
      <div className="absolute inset-0 pointer-events-none z-[-1]">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-500/20 blur-[100px] rounded-full"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="inline-flex items-center gap-3 rounded-full bg-white/5 border border-white/10 px-6 py-2 backdrop-blur-xl"
      >
        <div className="flex -space-x-2">
          <div className="h-6 w-6 rounded-full bg-cyan-500 blur-[4px] animate-pulse" />
          <div className="h-6 w-6 rounded-full bg-purple-500 blur-[4px] animate-pulse delay-75" />
        </div>
        <span className="text-xs font-bold text-white uppercase tracking-[0.2em]">Voyage AI Engine Active</span>
        <Sparkles className="h-4 w-4 text-cyan-400" />
      </motion.div>

      <div className="space-y-4 relative">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-light tracking-tighter text-white"
        >
          Voyage <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400">AI</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed"
        >
          Your intelligent travel concierge. Plan smarter, explore deeper, and experience the world with precision.
        </motion.p>
      </div>
    </div>
  );
};
