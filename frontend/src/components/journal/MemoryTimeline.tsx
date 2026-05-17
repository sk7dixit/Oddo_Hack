import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

export const MemoryTimeline = ({ timeline }: { timeline: any[] }) => {
  return (
    <div className="w-80 shrink-0 space-y-8">
      <div className="flex items-center gap-3 px-2">
        <div className="h-10 w-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
          <Clock className="h-5 w-5 text-violet-400" />
        </div>
        <h3 className="text-xl font-bold text-white tracking-tight">Timeline</h3>
      </div>

      <div className="relative pl-8 space-y-12">
        {/* Glowing Line */}
        <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-violet-500 via-violet-500/20 to-transparent" />
        
        {timeline.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i }}
            className="relative"
          >
            {/* Dot */}
            <div className="absolute left-[-21px] top-1 h-3 w-3 rounded-full border-2 border-violet-500 bg-[#070B14] z-10" />
            
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest">{item.date}</span>
              <h4 className="text-sm font-semibold text-white tracking-tight">{item.event}</h4>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
