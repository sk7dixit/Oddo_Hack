import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Camera, FileText, MapPin, Sparkles, ChevronRight, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useTravelStore, type MemoryItem } from '@/store/useTravelStore';
import { useNavigate } from 'react-router-dom';

const MemoryIcon = ({ type }: { type: MemoryItem['type'] }) => {
  switch (type) {
    case 'visa': return <FileText size={18} className="text-cyan-400" />;
    case 'hotel': return <MapPin size={18} className="text-emerald-400" />;
    case 'flight': return <Sparkles size={18} className="text-blue-400" />;
    case 'memory': return <Camera size={18} className="text-violet-400" />;
    default: return <Clock size={18} className="text-slate-400" />;
  }
};

const StatusBadge = ({ status }: { status: MemoryItem['status'] }) => {
  if (!status) return null;
  const config = {
    approved: { icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    confirmed: { icon: CheckCircle2, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    pending: { icon: Clock, color: 'text-amber-400', bg: 'bg-amber-400/10' },
    alert: { icon: AlertCircle, color: 'text-rose-400', bg: 'bg-rose-400/10' },
  }[status];

  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-white/5 ${config.bg} ${config.color} text-[8px] font-bold uppercase tracking-widest`}>
      <config.icon size={10} />
      {status}
    </div>
  );
};

export const JournalPreview = () => {
  const { memories } = useTravelStore();
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative flex flex-col p-8 rounded-[32px] bg-[#0F1428]/72 border border-white/8 backdrop-blur-xl shadow-2xl transition-all hover:border-violet-500/20 h-full"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-white tracking-tight">Travel Activity Log</h2>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Memory Stream</p>
        </div>
        <button 
          onClick={() => navigate('/journal')}
          className="group/btn flex items-center gap-2 text-xs font-bold text-violet-400 hover:text-white transition-all"
        >
          Open Journal
          <ChevronRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
        </button>
      </div>

      <div className="relative space-y-6">
        {/* Timeline Line */}
        <div className="absolute left-6 top-2 bottom-2 w-[1px] bg-gradient-to-b from-violet-500/30 via-white/5 to-transparent pointer-events-none" />

        {memories.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative flex gap-6 group/item cursor-pointer"
          >
            {/* Icon Circle */}
            <div className="relative z-10 h-12 w-12 shrink-0 rounded-2xl bg-[#0F1428] border border-white/10 flex items-center justify-center shadow-lg group-hover/item:border-violet-500/40 transition-colors">
              <MemoryIcon type={item.type} />
            </div>

            <div className="flex-1 space-y-3 pb-6">
              <div className="flex items-start justify-between">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-white tracking-tight leading-tight group-hover/item:text-violet-400 transition-colors">
                    {item.title}
                  </p>
                  <p className="text-[10px] font-medium text-slate-500">{item.timestamp}</p>
                </div>
                <StatusBadge status={item.status} />
              </div>

              {item.image && (
                <div className="relative h-24 w-full rounded-2xl overflow-hidden border border-white/5 group-hover/item:border-white/10 transition-colors">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover opacity-60 group-hover/item:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Entry Action */}
      <button className="mt-4 w-full py-4 rounded-2xl border border-dashed border-white/10 text-slate-500 text-xs font-bold hover:border-violet-500/40 hover:text-white transition-all flex items-center justify-center gap-2 group/entry">
        <Camera size={14} className="group-hover/entry:scale-110 transition-transform" />
        Record New Memory
      </button>
    </motion.div>
  );
};
