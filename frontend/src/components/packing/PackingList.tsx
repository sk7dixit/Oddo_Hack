import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, MoreVertical, Plus, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export const PackingItem = ({ item, onToggle }: { item: any, onToggle: (id: string) => void }) => {
  return (
    <motion.div 
      layout
      className={cn(
        "group flex items-center justify-between p-4 rounded-[24px] border transition-all duration-300",
        item.packed ? "bg-emerald-500/5 border-emerald-500/20" : "bg-white/5 border-white/10 hover:border-white/20"
      )}
    >
      <div className="flex items-center gap-5">
        {/* Custom Checkbox */}
        <button 
          onClick={() => onToggle(item.id)}
          className={cn(
            "h-7 w-7 rounded-lg border-2 flex items-center justify-center transition-all duration-300",
            item.packed 
              ? "bg-emerald-500 border-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]" 
              : "bg-transparent border-white/20 hover:border-white/40"
          )}
        >
          <AnimatePresence>
            {item.packed && (
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0 }}
              >
                <Check className="h-4 w-4 stroke-[3px]" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        <div className="space-y-1">
          <h4 className={cn(
            "text-sm font-bold tracking-tight transition-all",
            item.packed ? "text-slate-500 line-through" : "text-white"
          )}>
            {item.name}
          </h4>
          <div className="flex items-center gap-3">
            <span className={cn(
              "text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded",
              item.priority === 'Essential' ? "bg-amber-500/10 text-amber-400" : 
              item.priority === 'Urgent' ? "bg-red-500/10 text-red-400" : "bg-blue-500/10 text-blue-400"
            )}>
              {item.priority}
            </span>
            {item.notes && <span className="text-[9px] text-slate-500 flex items-center gap-1 italic"><Info className="h-2.5 w-2.5" /> {item.notes}</span>}
          </div>
        </div>
      </div>

      <button className="text-slate-600 hover:text-white transition-colors">
        <MoreVertical className="h-4 w-4" />
      </button>
    </motion.div>
  );
};

export const PackingList = ({ items, onToggle }: { items: any[], onToggle: (id: string) => void }) => {
  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">Active List</h2>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{items.length} Total</span>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 hover:text-white transition-all">
            Hide Packed
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {items.length > 0 ? (
          items.map((item) => (
            <PackingItem key={item.id} item={item} onToggle={onToggle} />
          ))
        ) : (
          <div className="py-20 text-center space-y-6 rounded-[32px] border border-dashed border-white/10 bg-white/5">
            <div className="h-16 w-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto">
              <Plus className="h-6 w-6 text-slate-500" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">Your list is empty</h3>
              <p className="text-sm text-slate-500 max-w-xs mx-auto">Start adding items or use a template to prepare for your journey.</p>
            </div>
          </div>
        )}
        
        <button className="w-full py-5 rounded-[24px] border border-dashed border-white/10 text-xs font-bold text-slate-500 hover:text-white hover:border-white/20 transition-all flex items-center justify-center gap-2">
          <Plus className="h-4 w-4" /> Add Custom Item
        </button>
      </div>
    </div>
  );
};
