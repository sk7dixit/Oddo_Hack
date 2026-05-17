import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Command, ArrowRight } from 'lucide-react';

interface AIInputProps {
  onPrompt: (prompt: string) => void;
}

const rotatingPrompts = [
  "Plan a hidden-gem journey in Japan...",
  "Best food spots in Osaka for 3 days?",
  "Suggest a cultural escape in Italy...",
  "Budget-friendly nature trip in Bali?"
];

export const AIInputPanel = ({ onPrompt }: AIInputProps) => {
  const [query, setQuery] = useState("");
  const [promptIndex, setPromptIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPromptIndex((prev) => (prev + 1) % rotatingPrompts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onPrompt(query);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[800px] mx-auto w-full relative group"
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="absolute inset-0 bg-cyan-500/10 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-700" />
        
        <div className="relative flex items-center h-[58px] rounded-[18px] bg-white/[0.03] border border-white/10 backdrop-blur-2xl px-5 gap-4 group-hover:border-cyan-500/30 transition-all duration-500 shadow-2xl">
          <Search className="h-4 w-4 text-slate-500" />
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={rotatingPrompts[promptIndex]}
            className="flex-grow bg-transparent border-none outline-none text-white text-sm placeholder:text-slate-600 font-medium"
          />

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10">
              <Command className="h-2.5 w-2.5 text-slate-500" />
              <span className="text-[9px] font-black text-slate-500">ENTER</span>
            </div>
            
            <button 
              type="submit"
              className="h-9 w-9 rounded-xl bg-cyan-500 flex items-center justify-center text-[#050816] hover:bg-white transition-all shadow-[0_0_15px_rgba(34,211,238,0.4)]"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </form>
      
      <div className="mt-4 flex items-center justify-center gap-4 text-[9px] font-black text-slate-600 uppercase tracking-widest">
        <div className="flex items-center gap-1.5"><Sparkles className="h-2.5 w-2.5 text-cyan-400" /> Sensory Descriptions</div>
        <div className="h-1 w-1 rounded-full bg-slate-800" />
        <div className="flex items-center gap-1.5"><Sparkles className="h-2.5 w-2.5 text-purple-400" /> Real-time Intel</div>
      </div>
    </motion.div>
  );
};
