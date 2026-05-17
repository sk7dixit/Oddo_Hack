import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, AlertCircle, TrendingDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const BudgetInsights = ({ insights }: { insights: any[] }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 px-2">
        <div className="h-10 w-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
          <Lightbulb className="h-5 w-5 text-violet-400" />
        </div>
        <h3 className="text-xl font-bold text-white tracking-tight">Smart Budget Insights</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((insight, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * i }}
            className={cn(
              "p-6 rounded-[32px] border flex flex-col justify-between gap-6 group cursor-pointer transition-all",
              insight.type === 'warning' ? "bg-orange-500/10 border-orange-500/20" : 
              insight.type === 'tip' ? "bg-emerald-500/10 border-emerald-500/20" : "bg-blue-500/10 border-blue-500/20"
            )}
          >
            <div className="space-y-4">
              <div className={cn(
                "h-10 w-10 rounded-xl flex items-center justify-center",
                insight.type === 'warning' ? "bg-orange-500/20 text-orange-400" : 
                insight.type === 'tip' ? "bg-emerald-500/20 text-emerald-400" : "bg-blue-500/20 text-blue-400"
              )}>
                {insight.type === 'warning' ? <AlertCircle className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
              </div>
              <p className="text-sm font-medium text-slate-300 leading-relaxed">
                "{insight.text}"
              </p>
            </div>

            <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white group-hover:gap-3 transition-all">
              Apply Suggestion <ChevronRight className="h-3 w-3" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
