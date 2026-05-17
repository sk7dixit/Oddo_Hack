import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, Heart, MessageSquare, 
  Sparkles, Image as ImageIcon,
  ChevronRight, Check, Copy, Bookmark, 
  Share2, Clock, Globe, Zap, Camera, Star,
  TrendingUp, Compass, ArrowRight, Share as ShareIcon,
  Award, HeartHandshake, ShieldCheck, Download
} from "lucide-react";
import { FiLinkedin, FiTwitter, FiMessageCircle, FiInstagram, FiSend } from "react-icons/fi";
import { getPublicTrip } from "@/services/publicService";
import Navbar from "@/components/layout/Navbar";


const PublicTripPage = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedDay, setExpandedDay] = useState(0);
  
  // Interaction States
  const [isSaved, setIsSaved] = useState(() => localStorage.getItem(`saved-${tripId}`) === "true");
  const [saveCount, setSaveCount] = useState(248);
  const [copyCount, setCopyCount] = useState(31);
  const [isCloning, setIsCloning] = useState(false);

  const fetchPublicData = async () => {
    try {
      setLoading(true);
      const response = await getPublicTrip(tripId);
      setData(response.data);
    } catch (err) {
      setError("This itinerary could not be found.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicData();
  }, [tripId]);

  const handleCloneJourney = () => {
    setIsCloning(true);
    const id = toast.loading("Cloning journey into your workspace...");
    
    setTimeout(() => {
      localStorage.setItem("copiedTrip", JSON.stringify(data.trip));
      localStorage.setItem("copiedChecklist", JSON.stringify(data.checklist));
      setCopyCount(prev => prev + 1);
      toast.success("Journey successfully cloned!", { id });
      setIsCloning(false);
      navigate("/checklist");
    }, 1800);
  };

  const handleSave = () => {
    const newState = !isSaved;
    setIsSaved(newState);
    localStorage.setItem(`saved-${tripId}`, newState ? "true" : "false");
    setSaveCount(prev => newState ? prev + 1 : prev - 1);
    if (newState) toast.success("Journey saved to your inspirations ✨");
  };

  const shareToSocial = (platform) => {
    const url = window.location.href;
    const text = encodeURIComponent(`Check out this incredible journey: ${data?.trip?.title || "Traveloop Journey"}`);
    
    const platforms = {
      whatsapp: `https://wa.me/?text=${text}%20${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };

    if (platforms[platform]) {
      window.open(platforms[platform], "_blank", "width=600,height=400");
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: data?.trip?.title || "Traveloop Journey",
      text: "Check out this incredible shared journey on Traveloop.",
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Journey link copied to clipboard!");
      }
    } catch (err) {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied!");
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-10 h-10 border-4 border-blue-600/10 border-t-blue-600 rounded-full"
      />
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-[#f8fafc]">
      <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center text-4xl mb-10 shadow-2xl border border-slate-100">🏝️</div>
      <h1 className="text-5xl font-bold tracking-tight mb-6 text-slate-900">Itinerary Lost At Sea</h1>
      <Link to="/checklist" className="bg-slate-900 text-white text-xs font-black uppercase tracking-widest px-10 py-5 rounded-full hover:bg-blue-600 transition-all shadow-xl">Create Your Own</Link>
    </div>
  );

  const { trip, checklist, notes } = data;
  const packedPercent = 75;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-600/10 selection:text-blue-600 overflow-x-hidden relative">
      
      {/* Premium Background System */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-40" style={{ background: `radial-gradient(circle at top left, rgba(59,130,246,0.1), transparent 40%), radial-gradient(circle at bottom right, rgba(99,102,241,0.08), transparent 40%), linear-gradient(180deg, #f8fafc, #eef2ff)` }} />
      </div>

      <Navbar isPublic={true} />

      <div className="max-w-[1280px] mx-auto px-10 pb-40 relative z-10">
        
        {/* HERO */}
        <section className="py-[120px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-end">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-8 space-y-10"
            >
              <div className="flex items-center gap-4">
                <span className="px-5 py-2 bg-blue-600/10 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-[0.25em] border border-blue-600/10 backdrop-blur-md">Shared Experience</span>
                <span className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em]">
                   <TrendingUp size={14} className="text-green-500" /> Trending Platform
                </span>
              </div>
              <h1 className="text-[clamp(3rem,6vw,5rem)] font-bold tracking-[-0.04em] text-slate-900 leading-[0.95] max-w-4xl">
                {trip?.title || "Dream Trip to Italy & Vietnam"}
              </h1>
              <p className="text-lg text-slate-500 leading-[1.8] max-w-xl">
                 Explore a curated journey across coastal regions and urban food hubs. Inspired by intentional exploration and local culture.
              </p>
            </motion.div>

            {/* Redesigned Sidebar: Action & Share Center */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-4"
            >
              <div className="bg-white/80 backdrop-blur-2xl rounded-[48px] p-10 border border-white shadow-[0_32px_64px_rgba(0,0,0,0.06)] space-y-8 sticky top-36">
                
                {/* Core Action: Clone Trip */}
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.25em] mb-4">Journey Actions</h3>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleCloneJourney}
                    disabled={isCloning}
                    className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-slate-900/20 flex items-center justify-center gap-3 group relative overflow-hidden transition-all"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative flex items-center gap-2">
                      <Zap size={16} className={isCloning ? "animate-pulse" : ""} />
                      {isCloning ? "Cloning..." : "Clone This Journey"}
                    </span>
                  </motion.button>
                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={handleSave} className={`py-4 rounded-2xl border transition-all flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest ${isSaved ? "bg-red-50 border-red-100 text-red-500" : "bg-slate-50 border-slate-100 text-slate-400 hover:bg-white hover:border-slate-200"}`}>
                       <Heart size={14} className={isSaved ? "fill-red-500" : ""} /> {isSaved ? "Saved" : "Save"}
                    </button>
                    <button className="py-4 rounded-2xl bg-slate-50 border border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-white hover:border-slate-200 transition-all flex items-center justify-center gap-2">
                       <Download size={14} /> PDF
                    </button>
                  </div>
                </div>

                {/* Social Share Center */}
                <div className="pt-8 border-t border-slate-100 space-y-6">
                  <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.25em]">Share This Journey</h3>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { id: 'whatsapp', icon: <FiMessageCircle size={20} />, color: 'hover:bg-green-50 hover:text-green-600' },
                      { id: 'twitter', icon: <FiTwitter size={20} />, color: 'hover:bg-slate-900 hover:text-white' },
                      { id: 'linkedin', icon: <FiLinkedin size={20} />, color: 'hover:bg-blue-50 hover:text-blue-700' },
                      { id: 'copy', icon: <Copy size={20} />, color: 'hover:bg-slate-50 hover:text-slate-900' }
                    ].map((s) => (
                      <motion.button 
                        key={s.id}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => s.id === 'copy' ? handleShare() : shareToSocial(s.id)}
                        className={`aspect-square rounded-2xl border border-slate-100 bg-slate-50/50 flex items-center justify-center transition-all ${s.color}`}
                      >
                        {s.icon}
                      </motion.button>
                    ))}
                  </div>
                  <button 
                    onClick={handleShare}
                    className="w-full py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[9px] font-black text-slate-400 uppercase tracking-widest hover:bg-white hover:border-slate-200 transition-all flex items-center justify-center gap-2"
                  >
                    <ShareIcon size={14} /> Open Native Share
                  </button>
                </div>

                {/* Live Social Proof */}
                <div className="pt-8 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Public Engagement</p>
                     <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                            <img src={`https://i.pravatar.cc/100?img=${i + 30}`} alt="User" />
                          </div>
                        ))}
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-y-4">
                     <div className="space-y-1">
                        <p className="text-xl font-bold text-slate-900">{saveCount}</p>
                        <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Saves</p>
                     </div>
                     <div className="space-y-1">
                        <p className="text-xl font-bold text-slate-900">{copyCount}</p>
                        <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Clones</p>
                     </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* PHOTO MOSAIC */}
        <section className="py-[120px]">
           <div className="grid grid-cols-12 gap-6 h-[600px]">
              <motion.div whileHover={{ scale: 1.01 }} className="col-span-12 lg:col-span-8 rounded-[40px] overflow-hidden border-4 border-white shadow-2xl group relative">
                 <img src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=2000" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" alt="Gallery" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>
              <div className="hidden lg:flex lg:col-span-4 flex-col gap-6">
                 <motion.div whileHover={{ scale: 1.02 }} className="flex-1 rounded-[32px] overflow-hidden border-4 border-white shadow-xl">
                    <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000" className="w-full h-full object-cover" alt="Gallery" />
                 </motion.div>
                 <motion.div whileHover={{ scale: 1.02 }} className="flex-1 rounded-[32px] overflow-hidden border-4 border-white shadow-xl">
                    <img src="https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1000" className="w-full h-full object-cover" alt="Gallery" />
                 </motion.div>
              </div>
           </div>
        </section>

        {/* TIMELINE */}
        <section className="py-[120px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
            <div className="lg:col-span-8 space-y-12">
              <h2 className="text-sm font-bold text-slate-300 uppercase tracking-[0.25em] mb-12 flex items-center gap-4">Journey Narrative</h2>
              <div className="space-y-8">
                 {notes?.map((note, i) => (
                   <motion.div key={i} className={`bg-white transition-all duration-700 rounded-[48px] border overflow-hidden ${expandedDay === i ? "border-blue-200 shadow-2xl" : "border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1.5"}`}>
                      <button onClick={() => setExpandedDay(expandedDay === i ? -1 : i)} className="w-full px-10 py-10 flex items-center justify-between text-left">
                         <div className="flex items-center gap-8">
                            <div className={`w-16 h-16 rounded-[2rem] flex items-center justify-center font-black text-xs transition-all duration-500 ${expandedDay === i ? "bg-blue-600 text-white shadow-xl" : "bg-slate-50 text-slate-400"}`}>DAY {i + 1}</div>
                            <div>
                               <h3 className="text-2xl font-semibold text-slate-900 tracking-tight">{note.location || "Coast Exploration"}</h3>
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">{note.mood || "😊"} Memory</p>
                            </div>
                         </div>
                         <ChevronRight className={`text-slate-300 transition-transform duration-500 ${expandedDay === i ? "rotate-90 text-blue-600" : ""}`} size={20} />
                      </button>
                      <AnimatePresence>
                        {expandedDay === i && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-10 pb-12 space-y-10 overflow-hidden">
                             <div className="aspect-[21/9] w-full rounded-[32px] overflow-hidden border border-slate-100 shadow-lg">
                                <img src={note.imageUrl || `https://picsum.photos/seed/${i+3}/1200/600`} className="w-full h-full object-cover" alt="Day view" />
                             </div>
                             <p className="text-xl text-slate-600 leading-[1.8] font-medium max-w-2xl">{note.content || "Exploring the quiet corners of this region."}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                   </motion.div>
                 ))}
              </div>
            </div>

            <div className="lg:col-span-4 sticky top-36 space-y-12">
              {/* AI Section Combined with Smart Actions */}
              <motion.div whileHover={{ y: -5 }} className="bg-slate-900 rounded-[48px] p-12 text-white shadow-2xl relative overflow-hidden group border border-white/5">
                 <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/40 blur-[80px] rounded-full group-hover:scale-150 transition-transform duration-[2s]" />
                 <div className="relative z-10 space-y-8">
                    <div className="flex items-center gap-4">
                       <Sparkles size={20} className="text-blue-400 animate-pulse" />
                       <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Traveloop AI</h3>
                    </div>
                    <p className="text-xl font-medium leading-[1.6] text-slate-200">Ideal for travelers seeking a **slow, cinematic pace**. Focus: Visual culture & Local cuisine.</p>
                 </div>
              </motion.div>

              {/* Essentials */}
              <motion.div whileHover={{ y: -5 }} className="bg-white/80 backdrop-blur-xl rounded-[48px] p-12 border border-white shadow-sm space-y-10">
                 <div className="flex items-center justify-between">
                    <div>
                       <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">Preparation</h3>
                       <p className="text-xl font-bold">Trip Essentials</p>
                    </div>
                    <div className="relative w-14 h-14 flex items-center justify-center">
                       <svg className="w-full h-full -rotate-90">
                          <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100" />
                          <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-blue-600" strokeDasharray={150} strokeDashoffset={150 - (150 * packedPercent) / 100} strokeLinecap="round" />
                       </svg>
                       <span className="absolute text-[10px] font-black">{packedPercent}%</span>
                    </div>
                 </div>
                 <div className="space-y-4">
                    {[
                      { t: "Universal Adapter", i: <Zap size={14} /> },
                      { t: "Film Camera (35mm)", i: <Camera size={14} /> }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                         <div className="text-blue-500">{item.i}</div>
                         <span className="text-sm font-semibold text-slate-700">{item.t}</span>
                         <Check size={14} className="ml-auto text-green-500" />
                      </div>
                    ))}
                 </div>
                 <Link to="/checklist" className="flex items-center justify-center gap-3 w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all">
                    Open Checklist <ArrowRight size={14} />
                 </Link>
              </motion.div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default PublicTripPage;
