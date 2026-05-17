import React from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, Wallet, ArrowRight } from 'lucide-react';

export const VotingPanel = ({ votes }: { votes: any[] }) => {
  return (
    <div className="p-8 rounded-[40px] bg-white/5 border border-white/10 space-y-8 h-full">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
          <ThumbsUp className="h-5 w-5 text-purple-400" />
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">Active Voting</h2>
      </div>

      <div className="space-y-8">
        {votes.map((vote) => (
          <div key={vote.id} className="space-y-4">
            <h3 className="text-sm font-bold text-slate-300">{vote.title}</h3>
            <div className="space-y-3">
              {vote.options.map((opt: any) => (
                <div key={opt.name} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest px-1">
                    <span className="text-white">{opt.name}</span>
                    <span className="text-purple-400">{opt.votes} Votes</span>
                  </div>
                  <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${opt.percentage}%` }}
                      className="h-full bg-gradient-to-r from-purple-600 to-blue-500"
                    />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 hover:text-white transition-all uppercase tracking-widest">
              Cast Your Vote
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SharedExpenses = ({ expenses }: { expenses: any[] }) => {
  return (
    <div className="p-8 rounded-[40px] bg-white/5 border border-white/10 space-y-8 h-full">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
          <Wallet className="h-5 w-5 text-emerald-400" />
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">Shared Expenses</h2>
      </div>

      <div className="space-y-6">
        {expenses.map((exp, i) => (
          <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-emerald-500/30 transition-all">
            <div className="flex items-center gap-4">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${exp.user}`} className="h-10 w-10 rounded-full bg-white/5" alt="user" />
              <div>
                <h4 className="text-sm font-bold text-white">{exp.user}</h4>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  {exp.paid ? `Paid ₹${exp.paid}` : `Owes ₹${exp.owe} to ${exp.to}`}
                </p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-emerald-400 transition-colors" />
          </div>
        ))}
      </div>

      <button className="w-full py-4 rounded-2xl bg-emerald-600 text-white font-bold shadow-xl shadow-emerald-600/20 hover:scale-105 active:scale-95 transition-all">
        Settle All Balances
      </button>
    </div>
  );
};
