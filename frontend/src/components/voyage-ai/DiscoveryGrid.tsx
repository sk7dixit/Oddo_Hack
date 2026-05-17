import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Sparkles } from 'lucide-react';

export const DiscoveryGrid = ({ discovery }: { discovery: any[] }) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 px-2">
        <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
          <Sparkles className="h-5 w-5 text-cyan-400" />
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">AI Smart Discovery</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {discovery.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group relative h-[400px] rounded-[40px] overflow-hidden border border-white/10 cursor-pointer shadow-2xl"
          >
            <img src={item.image} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.name} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-[#070B14]/20 to-transparent" />
            
            <div className="absolute inset-0 p-8 flex flex-col justify-end gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                  <Star className="h-3.5 w-3.5 fill-amber-400" /> {item.rating}
                </div>
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-400/10 px-2.5 py-1 rounded-full border border-cyan-400/20">
                  {item.vibe}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight">{item.name}</h3>
                <p className="text-sm font-medium text-slate-300 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-cyan-400" /> Tokyo, Japan
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-xs font-bold text-emerald-400">{item.cost} Cost</span>
                <button className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-cyan-500 transition-all">
                  <Sparkles className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
