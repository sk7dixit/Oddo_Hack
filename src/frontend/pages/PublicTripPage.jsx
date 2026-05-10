import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { getPublicTrip } from "../services/public.service";
import Loader from "../components/common/Loader";
import Button from "../components/common/Button";
import Card from "../components/common/Card";

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
      setError("This itinerary could not be found or is set to private.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicData();
  }, [tripId]);

  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard! 🔗", {
      style: { borderRadius: '20px', background: '#333', color: '#fff' }
    });
  };

  const handleShareSummary = () => {
    if (!data) return;
    const { trip, checklist, notes } = data;
    const summary = `
🌍 Trip: ${trip?.title || "My Adventure"}
📍 Destination: ${trip?.destinations?.join(", ")}
✅ Packing: ${checklist?.items?.filter(i => i.packed).length}/${checklist?.items?.length} items ready
📝 Memories: ${notes?.length} entries shared
🔗 View full itinerary: ${window.location.href}
    `.trim();
    
    navigator.clipboard.writeText(summary);
    toast.success("Summary copied! Ready to paste in WhatsApp/Slack ✈️", {
      duration: 4000,
      icon: '📱'
    });
  };

  if (loading) return <Loader fullPage />;

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 text-center">
        <div className="w-24 h-24 bg-rose-50 text-rose-500 rounded-[2rem] flex items-center justify-center text-5xl mb-8">⚠️</div>
        <h1 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">Itinerary Not Found</h1>
        <p className="text-slate-500 mb-10 max-w-md font-medium leading-relaxed">{error}</p>
        <Link to="/">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  const { trip, checklist, notes } = data;

  return (
    <div className="min-h-screen bg-[#FDFDFE] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 pb-20">
      
      <nav className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-xl border-b border-slate-100 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xs">✈️</div>
            <span className="text-lg font-black tracking-tighter">Traveloop</span>
          </div>
          <div className="flex gap-3">
             <Button onClick={handleShareSummary} variant="secondary" className="px-5 py-2 rounded-full h-auto text-[10px] font-black uppercase tracking-widest hidden sm:flex">
               Share Summary
             </Button>
             <Button onClick={handleShareLink} variant="primary" className="px-6 py-2 rounded-full h-auto text-[10px] font-black uppercase tracking-widest">
               Copy Link
             </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto pt-32 px-6">
        <header className="mb-24 text-center animate-in fade-in slide-in-from-top-8 duration-1000">
          <div className="inline-block px-5 py-2 bg-blue-50/50 text-blue-600 rounded-full text-[10px] font-black mb-10 tracking-[0.3em] uppercase">
            Traveloop Shared Experience
          </div>
          <h1 className="text-7xl md:text-9xl font-black mb-10 tracking-tighter text-slate-900 leading-[0.85]">
            {trip?.title || "Exploring The World"}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">
            <span className="flex items-center gap-3">📍 {trip?.destinations?.join(", ") || "Global Destination"}</span>
            <span className="w-2 h-2 bg-slate-200 rounded-full hidden md:block"></span>
            <span className="flex items-center gap-3">📅 {trip?.startDate ? new Date(trip.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' }) : "Dates TBD"}</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7 space-y-24">
            <section className="space-y-12">
              <div className="flex items-center gap-6">
                 <h2 className="text-xs font-black text-slate-300 uppercase tracking-[0.4em]">The Journal</h2>
                 <div className="flex-1 h-[1px] bg-slate-100"></div>
              </div>
              
              {notes?.length > 0 ? (
                notes.map((note) => (
                  <div key={note._id} className="animate-in fade-in slide-in-from-bottom-6 duration-1000">
                    <p className="text-4xl md:text-5xl font-black text-slate-800 leading-[1.1] tracking-tighter mb-10">
                      "{note.content}"
                    </p>
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xs">📷</div>
                       <div className="flex flex-col">
                          <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest leading-none mb-1">Authenticated Memory</span>
                          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest leading-none">
                             {new Date(note.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </span>
                       </div>
                    </div>
                  </div>
                ))
              ) : (
                <EmptyState message="No journal entries shared." icon="📖" />
              )}
            </section>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-32 space-y-10">
              <Card className="bg-slate-900 text-white border-none p-12 overflow-hidden relative shadow-2xl shadow-slate-200">
                <div className="absolute top-[-20%] right-[-20%] w-60 h-60 bg-blue-600/30 blur-[100px] rounded-full"></div>
                <h3 className="text-2xl font-black mb-10 relative z-10 flex items-center gap-4">
                  <span className="w-12 h-12 bg-white/10 rounded-3xl flex items-center justify-center text-xl">✓</span>
                  Gear Status
                </h3>
                <div className="space-y-5 relative z-10">
                  {checklist?.items?.length > 0 ? (
                    checklist.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-5 py-1 group">
                        <div className={`w-6 h-6 rounded-xl flex items-center justify-center transition-all duration-500 ${item.packed ? "bg-blue-500 shadow-lg shadow-blue-500/50" : "bg-white/10 border border-white/5"}`}>
                          {item.packed && <span className="text-xs font-bold">✓</span>}
                        </div>
                        <span className={`text-lg font-bold tracking-tight transition-all duration-500 ${item.packed ? "text-slate-500 line-through" : "text-slate-200"}`}>
                          {item.text}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-600 text-sm font-black italic">Checklist remains private.</p>
                  )}
                </div>
                
                <div className="mt-12 pt-10 border-t border-white/5 relative z-10 flex items-end justify-between">
                   <div>
                      <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Packed Ratio</p>
                      <p className="text-4xl font-black">
                        {checklist?.items?.filter(i => i.packed).length || 0}<span className="text-white/20">/</span>{checklist?.items?.length || 0}
                      </p>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Readiness</p>
                      <p className="text-4xl font-black text-blue-500">
                        {Math.round((checklist?.items?.filter(i => i.packed).length / checklist?.items?.length) * 100 || 0)}%
                      </p>
                   </div>
                </div>
              </Card>

              <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 flex items-center justify-between">
                 <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Shared by</span>
                    <span className="text-sm font-black text-slate-800">Traveloop User</span>
                 </div>
                 <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black shadow-lg shadow-blue-100">U</div>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-48 pt-24 border-t border-slate-50 text-center flex flex-col items-center">
           <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center text-2xl mb-10 grayscale opacity-30">✈️</div>
           <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em] mb-12">Traveloop Shared Intelligence</p>
           <div className="flex gap-12 text-slate-200 text-3xl font-black">
              <span className="hover:text-slate-900 cursor-pointer transition-all hover:scale-110">𝕏</span>
              <span className="hover:text-slate-900 cursor-pointer transition-all hover:scale-110">📸</span>
              <span className="hover:text-slate-900 cursor-pointer transition-all hover:scale-110">💼</span>
           </div>
        </footer>
      </div>
    </div>
  );
};

export default PublicTripPage;
