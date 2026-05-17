import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const TrendingCarousel = ({ trending }: { trending: any[] }) => {
  const navigate = useNavigate();

  // Helper to optimize Unsplash URLs without duplicating parameters
  const optimizeImage = (url: string, width: number) => {
    if (!url) return 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800';
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?auto=format&fit=crop&q=80&w=${width}`;
  };

  return (
    <div className="flex gap-8 overflow-x-auto pb-12 pt-4 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 snap-x scroll-smooth">
      {trending.map((dest, i) => (
        <motion.div
          key={dest.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ 
            duration: 0.5,
            delay: Math.min(i * 0.08, 0.3),
            ease: "easeOut" 
          }}
          whileHover={{ y: -8 }}
          onClick={() => navigate(`/discover/${dest.country.toLowerCase()}/${dest.id}`)}
          className="relative h-[480px] w-[340px] shrink-0 rounded-[48px] overflow-hidden border border-white/5 group snap-start cursor-pointer shadow-2xl transition-all duration-500 hover:border-cyan-400/20 transform-gpu will-change-transform bg-slate-900"
        >
          {/* Background Image */}
          <img 
            src={optimizeImage(dest.image, 800)} 
            alt={dest.name || dest.city} 
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 transform-gpu"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          
          <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
            <div className="space-y-4">
              <div>
                <h3 className="text-3xl font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors duration-300">
                  {dest.name || dest.city}
                </h3>
                <p className="flex items-center gap-1.5 text-slate-300 font-medium text-base mt-1 opacity-90">
                  <MapPin className="h-4 w-4 text-cyan-500" />
                  {dest.country}
                </p>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 max-w-[260px] font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                {dest.description}
              </p>

              <div className="pt-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300 shadow-xl">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
