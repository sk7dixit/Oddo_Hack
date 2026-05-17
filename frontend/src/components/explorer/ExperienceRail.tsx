import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight } from 'lucide-react';

interface Experience {
  id: string;
  name: string;
  image: string;
  description: string;
}

interface ExperienceRailProps {
  title?: string;
  subtitle?: string;
  experiences: Experience[];
}

export const ExperienceRail = ({ title, subtitle, experiences }: ExperienceRailProps) => {
  if (!experiences || experiences.length === 0) return null;

  return (
    <div className="space-y-10">
      {(title || subtitle) && (
        <div className="px-4 space-y-2">
          {title && <h3 className="text-2xl font-bold tracking-tight text-white uppercase">{title}</h3>}
          {subtitle && <p className="text-slate-500 text-sm font-medium">{subtitle}</p>}
        </div>
      )}
      
      <div className="flex gap-8 overflow-x-auto pb-8 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 snap-x scroll-smooth">
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ 
              duration: 0.5,
              delay: Math.min(i * 0.08, 0.2), 
              ease: "easeOut" 
            }}
            whileHover={{ y: -8 }}
            className="relative h-[340px] w-[280px] shrink-0 rounded-[40px] overflow-hidden border border-white/5 group snap-start cursor-pointer shadow-lg transition-all duration-500 hover:border-cyan-400/20 transform-gpu will-change-transform bg-slate-900"
          >
            <img 
              src={`${exp.image}&w=600&q=75`} 
              alt={exp.name} 
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 transform-gpu"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            
            <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3 w-3 text-cyan-400" />
                  <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Experience</span>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-white leading-tight group-hover:text-cyan-400 transition-colors duration-300">
                    {exp.name}
                  </h3>
                </div>

                <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  {exp.description}
                </p>

                <div className="pt-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex items-center gap-1 text-[10px] font-black text-white uppercase tracking-widest group/link">
                    Discover More
                    <ArrowUpRight className="h-3 w-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
