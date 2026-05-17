import React from 'react';
import { CardStack, CardStackItem } from '@/components/ui/card-stack';
import { Calendar, Wallet, Users, ChevronRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface JourneyItem extends CardStackItem {
  location: string;
  dates: string;
  progress: number;
  budget: string;
  collaborators: string[];
}

interface JourneyStackProps {
  items: JourneyItem[];
}

export const JourneyStack: React.FC<JourneyStackProps> = ({ items }) => {
  return (
    <CardStack
      items={items}
      cardWidth={380}
      cardHeight={480}
      overlap={0.65}
      spreadDeg={24}
      tiltXDeg={4}
      activeScale={1.02}
      inactiveScale={0.92}
      springStiffness={180}
      springDamping={22}
      autoAdvance={false}
      showDots={true}
      renderCard={(item, { active }) => (
        <div className="relative h-full w-full overflow-hidden bg-[#070B14]">
          {/* Background Image */}
          <img 
            src={item.imageSrc} 
            alt={item.title} 
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Cinematic Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
          
          {/* Card Content */}
          <div className="absolute inset-0 flex flex-col p-8">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-white border border-white/10 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                JOURNEY
              </div>
              
              <div className="flex -space-x-2">
                {item.collaborators.slice(0, 3).map((avatar, i) => (
                  <img 
                    key={i} 
                    src={avatar} 
                    className="h-7 w-7 rounded-full border-2 border-[#070B14] shadow-lg" 
                    alt="user"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>

            <div className="mt-auto space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-cyan-400">
                  <MapPin size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{item.location}</span>
                </div>
                <h3 className="text-3xl font-bold text-white tracking-tight leading-tight">
                  {item.title}
                </h3>
                <p className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                  <Calendar size={14} className="text-slate-500" />
                  {item.dates}
                </p>
              </div>

              {/* Info Section with specialized glass overlay */}
              <div className="rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wallet size={14} className="text-emerald-400" />
                    <span className="text-sm font-bold text-white">{item.budget}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={14} className="text-blue-400" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.collaborators.length} Crew</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold text-white uppercase tracking-widest">
                    <span>Progress</span>
                    <span>{item.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.4)]"
                    />
                  </div>
                </div>
              </div>

              {active && (
                <Link 
                  to={`/journeys/${item.id}`}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-white text-black font-bold text-sm hover:bg-cyan-400 hover:text-black transition-all group/btn"
                >
                  Enter Journey
                  <ChevronRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    />
  );
};
