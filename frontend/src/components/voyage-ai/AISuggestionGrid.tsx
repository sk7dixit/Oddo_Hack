import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Compass, Zap, Map } from 'lucide-react';

interface SuggestionProps {
  onSelect: (prompt: string) => void;
}

const suggestions = [
  { 
    title: "Hidden Gems in Kyoto", 
    desc: "Experience quiet temple paths & tea houses.",
    prompt: "Show me hidden gems in Kyoto",
    icon: Map,
    color: "from-cyan-500/10 to-blue-500/10"
  },
  { 
    title: "Osaka Food Explorer", 
    desc: "Best street food spots & night markets.",
    prompt: "What are the best food spots in Osaka?",
    icon: Zap,
    color: "from-purple-500/10 to-pink-500/10"
  },
  { 
    title: "Alpine Switzerland", 
    desc: "Scenic train routes & mountain escapes.",
    prompt: "Plan a scenic 5-day trip to Switzerland",
    icon: Compass,
    color: "from-blue-500/10 to-indigo-500/10"
  },
  { 
    title: "Bali Surf & Soul", 
    desc: "Tropical beaches & spiritual retreats.",
    prompt: "Suggest a 7-day Bali itinerary",
    icon: Sparkles,
    color: "from-green-500/10 to-emerald-500/10"
  }
];

export const AISuggestionGrid = ({ onSelect }: SuggestionProps) => {
  return (
    <div className="max-w-[800px] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {suggestions.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onSelect(item.prompt)}
              className="p-5 rounded-[22px] bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/5 text-left transition-all group relative overflow-hidden"
            >
              <div className="relative z-10 space-y-3">
                <div className="h-9 w-9 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 transition-colors">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">{item.title}</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
