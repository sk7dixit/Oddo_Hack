import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Star, MapPin, Thermometer, Banknote, 
  Utensils, Calendar, Clock, ShieldCheck, Languages, 
  Globe2, Heart, Share2, Navigation, Compass, Info
} from 'lucide-react';
import { countriesData } from '@/data/countries';

const DestinationDetail = () => {
  const { country, cityId } = useParams();
  const navigate = useNavigate();

  // Find destination data
  const countryName = Object.keys(countriesData).find(
    name => name.toLowerCase() === country?.toLowerCase()
  );
  const cityData = countryName 
    ? countriesData[countryName].cities.find((c: any) => c.id === cityId)
    : null;

  if (!cityData) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-white space-y-4 bg-[#070B14]">
        <h2 className="text-2xl font-bold">Destination Not Found</h2>
        <button 
          onClick={() => navigate('/discover')}
          className="px-6 py-2 bg-cyan-400 text-slate-900 rounded-xl font-bold"
        >
          Back to Explore
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070B14] pb-20 selection:bg-cyan-400/30">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] w-full overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img 
            src={cityData.image} 
            alt={cityData.name} 
            className="h-full w-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-[#070B14]" />
        
        {/* Navigation Bar */}
        <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-10">
          <motion.button 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="h-14 w-14 rounded-2xl bg-black/20 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-black/40 hover:scale-105 transition-all"
          >
            <ArrowLeft className="h-6 w-6" />
          </motion.button>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-4"
          >
            <button className="h-14 w-14 rounded-2xl bg-black/20 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-black/40 hover:scale-105 transition-all">
              <Heart className="h-5 w-5" />
            </button>
            <button className="h-14 w-14 rounded-2xl bg-black/20 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-black/40 hover:scale-105 transition-all">
              <Share2 className="h-5 w-5" />
            </button>
          </motion.div>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-16 left-8 md:left-20 right-8 max-w-5xl space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <span className="px-4 py-1.5 rounded-full bg-cyan-400 text-slate-900 font-black text-xs uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(34,211,238,0.4)]">
              {cityData.bestTime}
            </span>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/40 backdrop-blur-xl border border-white/10 text-amber-400 font-bold text-sm">
              <Star className="h-4 w-4 fill-amber-400" />
              {cityData.rating}
            </div>
          </motion.div>
          
          <div className="space-y-2">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-7xl md:text-9xl font-bold text-white tracking-tighter leading-[0.85]"
            >
              {cityData.name}
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 text-2xl text-slate-300 font-semibold opacity-90"
            >
              <MapPin className="h-7 w-7 text-cyan-400" />
              {cityData.country}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Deep Reveal Content */}
      <div className="max-w-[1400px] mx-auto px-8 md:px-20 grid grid-cols-1 lg:grid-cols-3 gap-20 mt-20">
        {/* Left: Detailed Storytelling */}
        <div className="lg:col-span-2 space-y-20">
          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="h-10 w-1 bg-cyan-400 rounded-full" />
              <h2 className="text-4xl font-bold text-white tracking-tight">The Story</h2>
            </div>
            <p className="text-slate-400 text-xl leading-relaxed font-medium">
              {cityData.description}
            </p>
          </section>

          {/* Attractions - Visual Grid */}
          <section className="space-y-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-10 w-1 bg-cyan-400 rounded-full" />
                <h2 className="text-4xl font-bold text-white tracking-tight">Must Visit</h2>
              </div>
              <button className="text-cyan-400 font-bold text-sm uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                View All <ArrowLeft className="h-4 w-4 rotate-180" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cityData.attractions?.map((place: string, i: number) => (
                <motion.div 
                  key={place}
                  whileHover={{ y: -8 }}
                  className="group relative h-64 rounded-[40px] overflow-hidden border border-white/5 bg-slate-900/40 backdrop-blur-3xl p-10 flex flex-col justify-end"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Compass className="absolute top-8 right-8 h-8 w-8 text-cyan-400/20 group-hover:text-cyan-400/60 transition-colors" />
                  <h4 className="text-2xl font-bold text-white mb-2">{place}</h4>
                  <p className="text-slate-500 text-sm font-medium group-hover:text-slate-300 transition-colors">Legendary landmark in {cityData.name}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Local Secrets */}
          <section className="bg-white/5 rounded-[48px] p-12 border border-white/10 space-y-8 relative overflow-hidden group">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-400/10 blur-[100px] rounded-full group-hover:bg-cyan-400/20 transition-all duration-1000" />
            <div className="flex items-center gap-5">
              <div className="h-14 w-14 rounded-2xl bg-cyan-400/20 flex items-center justify-center">
                <Utensils className="h-7 w-7 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white tracking-tight">Local Secrets</h2>
                <p className="text-slate-500 text-sm font-medium">Authentic tastes and hidden experiences</p>
              </div>
            </div>
            <div className="space-y-6 relative z-10">
              <p className="text-slate-300 text-xl font-semibold leading-relaxed">
                You haven't truly seen {cityData.name} until you try <span className="text-cyan-400 underline decoration-cyan-400/30 underline-offset-8">{cityData.famousFood}</span> at a local spot.
              </p>
              <div className="flex flex-wrap gap-3">
                {cityData.tags.map((tag: string) => (
                  <span key={tag} className="px-6 py-3 rounded-2xl bg-slate-950/60 text-slate-300 text-sm font-bold border border-white/5 backdrop-blur-md">
                    # {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Right: Deep Intel Sidebar */}
        <div className="space-y-10">
          {/* Quick Stats Rail */}
          <div className="bg-slate-900/40 backdrop-blur-3xl rounded-[48px] p-10 border border-white/10 space-y-10 shadow-2xl">
            <div className="flex items-center gap-3">
              <Info className="h-6 w-6 text-cyan-400" />
              <h3 className="text-2xl font-bold text-white tracking-tight">Vital Intel</h3>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-orange-400/10 flex items-center justify-center">
                    <Thermometer className="h-5 w-5 text-orange-400" />
                  </div>
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Temperature</span>
                </div>
                <span className="text-white font-black text-xl">{cityData.weather}</span>
              </div>

              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-blue-400/10 flex items-center justify-center">
                    <Globe2 className="h-5 w-5 text-blue-400" />
                  </div>
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Currency</span>
                </div>
                <span className="text-white font-black text-xl">{cityData.currency}</span>
              </div>

              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-emerald-400/10 flex items-center justify-center">
                    <Languages className="h-5 w-5 text-emerald-400" />
                  </div>
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Language</span>
                </div>
                <span className="text-white font-black text-xl">{cityData.language}</span>
              </div>

              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-rose-400/10 flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5 text-rose-400" />
                  </div>
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Safety</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#10b981]" />
                  <span className="text-white font-black text-xl">{cityData.safetyIndex}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Budget Breakdown */}
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-[48px] p-10 border border-white/5 space-y-8 shadow-2xl">
            <div className="flex items-center gap-3">
              <Banknote className="h-7 w-7 text-cyan-400" />
              <h3 className="text-2xl font-bold text-white tracking-tight">Trip Budget</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-6 rounded-3xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-colors">
                <div className="flex flex-col">
                  <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Backpacker</span>
                  <span className="text-white font-bold text-lg">{cityData.budgetBreakdown?.backpacking || '₹50k'}</span>
                </div>
                <span className="text-slate-600 text-[10px] group-hover:text-slate-400 font-bold transition-colors">Per Head</span>
              </div>
              <div className="flex justify-between items-center p-6 rounded-3xl bg-cyan-400/20 border-2 border-cyan-400/40 group hover:bg-cyan-400/30 transition-colors">
                <div className="flex flex-col">
                  <span className="text-cyan-400 text-[10px] font-black uppercase tracking-widest">Standard</span>
                  <span className="text-white font-bold text-lg">{cityData.budget}</span>
                </div>
                <span className="text-cyan-400 text-[10px] font-black">POPULAR</span>
              </div>
              <div className="flex justify-between items-center p-6 rounded-3xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-colors">
                <div className="flex flex-col">
                  <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Luxury</span>
                  <span className="text-white font-bold text-lg">{cityData.budgetBreakdown?.luxury || '₹3L+'}</span>
                </div>
                <span className="text-slate-600 text-[10px] group-hover:text-slate-400 font-bold transition-colors">Premium</span>
              </div>
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full h-20 rounded-[32px] bg-cyan-400 text-slate-950 font-black text-xl hover:bg-cyan-300 transition-all shadow-[0_20px_50px_rgba(34,211,238,0.3)] flex items-center justify-center gap-3"
          >
            Start Planning
            <Compass className="h-6 w-6 animate-spin-slow" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
