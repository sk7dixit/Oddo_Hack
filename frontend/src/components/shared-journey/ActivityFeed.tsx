import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Wallet, ThumbsUp, MapPin } from 'lucide-react';

const iconMap: any = { Image: ImageIcon, Wallet, ThumbsUp, MapPin };

export const ActivityFeed = ({ feed }: { feed: any[] }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xl font-bold text-white tracking-tight">Live Activity</h2>
        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>

      <div className="space-y-4">
        <AnimatePresence initial={false}>
          {feed.map((activity, i) => {
            const Icon = iconMap[activity.icon] || MapPin;
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4 group hover:bg-white/10 transition-all cursor-pointer"
              >
                <div className="h-10 w-10 rounded-xl bg-cyan-400/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-400 group-hover:text-black transition-all">
                  <Icon className="h-5 w-5" />
                </div>
                
                <div className="flex-1 space-y-1">
                  <p className="text-sm text-slate-300">
                    <span className="font-bold text-white">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{activity.time}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-all">
        View All History
      </button>
    </div>
  );
};
