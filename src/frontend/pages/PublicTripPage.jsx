import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { getPublicTrip } from "../services/public.service";

const PublicTripPage = () => {
  const { tripId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center"><div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>;

  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-black mb-4">404 Trip Not Found</h1>
      <Link to="/checklist" className="text-blue-600 font-bold">Back to App</Link>
    </div>
  );

  const { trip, checklist, notes } = data;

  return (
    <div className="min-h-screen bg-[#FDFDFE] selection:bg-blue-600 selection:text-white">
      
      {/* Cinematic Header */}
      <nav className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-2xl z-50 px-8 py-6 flex items-center justify-between border-b border-slate-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center text-white text-lg shadow-xl shadow-slate-200">✈️</div>
          <span className="text-xl font-black tracking-tighter">Traveloop Shared</span>
        </div>
        <button 
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied!");
          }}
          className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-8 py-3 rounded-full hover:scale-105 transition-all shadow-xl shadow-slate-200"
        >
          Share Itinerary
        </button>
      </nav>

      <div className="max-w-6xl mx-auto pt-40 px-6 pb-40">
        
        <header className="mb-32 text-center">
           <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-10 block">Explorer Itinerary</span>
           <h1 className="text-8xl md:text-[10rem] font-black tracking-tighter leading-[0.8] mb-12 text-slate-900">
             {trip?.title || "Exploring The World"}
           </h1>
           <div className="flex flex-wrap items-center justify-center gap-12 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
             <span className="flex items-center gap-3">📍 {trip?.destinations?.join(", ")}</span>
             <span className="w-1.5 h-1.5 bg-slate-200 rounded-full"></span>
             <span>📅 {trip?.startDate ? new Date(trip.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' }) : "Dates TBD"}</span>
           </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          
          {/* Left: Journal Entries (Span 7) */}
          <div className="lg:col-span-7 space-y-24">
             <div className="flex items-center gap-6">
                <h2 className="text-[10px] font-black text-slate-200 uppercase tracking-[0.5em]">The Journal</h2>
                <div className="flex-1 h-[1px] bg-slate-50"></div>
             </div>
             
             {notes?.map((note) => (
               <div key={note._id} className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
                  <p className="text-4xl md:text-5xl font-black text-slate-800 tracking-tighter leading-[1.05] mb-8">
                    "{note.content}"
                  </p>
                  <div className="flex items-center gap-4 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                    <span>Verified Memory</span>
                    <span>•</span>
                    <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                  </div>
               </div>
             ))}
          </div>

          {/* Right: Checklist (Span 5) */}
          <div className="lg:col-span-5 sticky top-32">
             <div className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl shadow-slate-200 overflow-hidden relative">
                <div className="absolute top-[-20%] left-[-20%] w-60 h-60 bg-blue-600/20 blur-[80px] rounded-full"></div>
                <h3 className="text-2xl font-black mb-12 relative z-10 flex items-center gap-4">
                  <span className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center text-sm">✓</span>
                  Gear Status
                </h3>
                <div className="space-y-4 relative z-10">
                   {checklist?.items?.map((item, index) => (
                     <div key={index} className="flex items-center gap-5 opacity-80 group">
                        <div className={`w-5 h-5 rounded-lg flex items-center justify-center transition-all ${item.packed ? "bg-blue-500" : "bg-white/10"}`}>
                           {item.packed && <span className="text-[10px]">✓</span>}
                        </div>
                        <span className={`text-lg font-bold tracking-tight ${item.packed ? "text-slate-500 line-through" : "text-white"}`}>{item.text}</span>
                     </div>
                   ))}
                </div>
                <div className="mt-16 pt-10 border-t border-white/5 relative z-10 flex items-center justify-between">
                   <div>
                      <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Packed</p>
                      <p className="text-3xl font-black">{checklist?.items?.filter(i => i.packed).length || 0}<span className="text-white/20 text-xl">/{checklist?.items?.length || 0}</span></p>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Ready</p>
                      <p className="text-3xl font-black text-blue-500">{Math.round((checklist?.items?.filter(i => i.packed).length / checklist?.items?.length) * 100 || 0)}%</p>
                   </div>
                </div>
             </div>
          </div>

        </div>

        <footer className="mt-64 pt-32 border-t border-slate-50 flex flex-col items-center gap-8">
           <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-xl grayscale opacity-20">✈️</div>
           <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.6em]">Traveloop AI</p>
        </footer>

      </div>
    </div>
  );
};

export default PublicTripPage;
