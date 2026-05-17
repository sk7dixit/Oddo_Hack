import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send } from 'lucide-react';

export const GroupChatPreview = ({ messages }: { messages: any[] }) => {
  return (
    <div className="p-8 rounded-[40px] bg-white/5 border border-white/10 space-y-8">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-blue-400" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Trip Talk</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">3 Active</span>
        </div>
      </div>

      <div className="space-y-6">
        {messages.map((msg, i) => (
          <div key={i} className="flex gap-4">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.user}`} className="h-10 w-10 rounded-full border border-white/10 shrink-0" alt="user" />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{msg.user}</span>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{msg.time}</span>
              </div>
              <div className="px-4 py-2 rounded-2xl rounded-tl-none bg-white/5 border border-white/10 text-sm text-slate-300">
                {msg.text}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative">
        <input 
          type="text" 
          placeholder="Send a quick message..." 
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-all pr-14"
        />
        <button className="absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:scale-110 transition-all">
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
