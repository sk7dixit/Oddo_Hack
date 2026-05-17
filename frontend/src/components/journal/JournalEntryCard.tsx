import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Smile, Share2, MoreVertical } from 'lucide-react';

export const JournalEntryCard = ({ entry }: { entry: any }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="premium-card space-y-6 group"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-bold text-white tracking-tight">{entry.title}</h3>
            <span className="px-2 py-0.5 rounded-md bg-violet-500/10 text-[10px] font-bold text-violet-400 border border-violet-500/20">
              {entry.mood}
            </span>
          </div>
          <p className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <MapPin className="h-3 w-3" />
            {entry.location} • {entry.date}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all">
            <Share2 className="h-4 w-4" />
          </button>
          <button className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      <p className="text-slate-400 leading-relaxed">
        {entry.description}
      </p>

      {entry.images && entry.images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 h-60">
          {entry.images.map((img: string, i: number) => (
            <div key={i} className="relative rounded-3xl overflow-hidden border border-white/10 h-full">
              <img src={img} alt="memory" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2 pt-2">
        {entry.tags.map((tag: string) => (
          <span key={tag} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 text-slate-400 border border-white/5">
            #{tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};
