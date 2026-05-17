import React from 'react';
import { motion } from 'framer-motion';
import { Layout, ChevronRight } from 'lucide-react';

export const PackingTemplates = ({ templates }: { templates: any[] }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 px-2">
        <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
          <Layout className="h-5 w-5 text-blue-400" />
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">Packing Templates</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {templates.map((template, i) => (
          <motion.button
            key={i}
            whileHover={{ y: -5 }}
            className="p-5 rounded-3xl bg-white/5 border border-white/10 text-left space-y-4 hover:bg-white/10 transition-all group"
          >
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{template.name}</h4>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">{template.items} Items</p>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
              Use Template <ChevronRight className="h-3 w-3" />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
