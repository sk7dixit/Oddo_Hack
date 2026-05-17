import React from 'react';
import { motion } from 'framer-motion';
import { Plus, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateTrip = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070B14] p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full space-y-8 text-center"
      >
        <div className="h-20 w-20 rounded-3xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(59,130,246,0.15)]">
          <Plus className="h-10 w-10 text-blue-500" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-white tracking-tight">Create New Journey</h1>
          <p className="text-slate-400 text-lg max-w-lg mx-auto">
            Our AI is ready to help you engineer your next extraordinary adventure.
          </p>
        </div>

        <div className="bg-white/5 border border-white/8 rounded-3xl p-12 backdrop-blur-xl">
          <p className="text-cyan-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Module Status</p>
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-400/10 px-4 py-1.5 border border-cyan-400/20 text-cyan-400 text-xs font-bold mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            AI ENGINE INITIALIZING
          </div>
          
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />
          
          <button 
            onClick={() => navigate('/travel-hub')}
            className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-white text-black font-bold hover:bg-cyan-400 transition-all group"
          >
            Back to Command Center
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateTrip;
