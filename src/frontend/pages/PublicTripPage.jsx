import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPublicTrip } from "../services/public.service";
import Loader from "../components/common/Loader";
import Button from "../components/common/Button";
import Card from "../components/common/Card";

const PublicTripPage = () => {
  const { tripId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

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

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return <Loader fullPage />;

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 text-center">
        <div className="w-24 h-24 bg-rose-50 text-rose-500 rounded-[2rem] flex items-center justify-center text-5xl mb-8">⚠️</div>
        <h1 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">Access Restricted</h1>
        <p className="text-slate-500 mb-10 max-w-md font-medium leading-relaxed">{error}</p>
        <Link to="/">
          <Button variant="outline">Back to Safety</Button>
        </Link>
      </div>
    );
  }

  const { trip, checklist, notes } = data;

  return (
    <div className="min-h-screen bg-[#FDFDFE] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 pb-20">
      
      {/* Floating Share Header */}
      <nav className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-xl border-b border-slate-100 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xs">✈️</div>
            <span className="text-lg font-black tracking-tighter">Traveloop</span>
          </div>
          <Button onClick={handleShare} variant={copied ? "secondary" : "primary"} className="px-6 py-2 rounded-full h-auto text-xs lowercase">
            {copied ? "Link Copied! ✓" : "Copy Share Link"}
          </Button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto pt-32 px-6">
        
        {/* Hero Section */}
        <header className="mb-24 text-center animate-in fade-in slide-in-from-top-8 duration-1000">
          <div className="inline-block px-5 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-black mb-10 tracking-widest uppercase">
            Public Itinerary
          </div>
          <h1 className="text-7xl md:text-8xl font-black mb-10 tracking-tighter text-slate-900 leading-[0.9]">
            {trip?.title || "Exploring The World"}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-slate-400 font-bold uppercase tracking-[0.15em] text-xs">
            <span className="flex items-center gap-3">📍 {trip?.destinations?.join(", ") || "Global Destination"}</span>
            <span className="w-2 h-2 bg-slate-200 rounded-full hidden md:block"></span>
            <span className="flex items-center gap-3">📅 {trip?.startDate ? new Date(trip.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' }) : "Dates TBD"}</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main Feed */}
          <div className="lg:col-span-7 space-y-16">
            
            {/* Journal Feed */}
            <section className="space-y-10">
              <div className="flex items-center gap-4">
                 <h2 className="text-sm font-black text-slate-300 uppercase tracking-[0.2em]">Travel Log</h2>
                 <div className="flex-1 h-[1px] bg-slate-100"></div>
              </div>
              
              {notes?.length > 0 ? (
                notes.map((note) => (
                  <div key={note._id} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <p className="text-3xl font-bold text-slate-800 leading-tight tracking-tight mb-6">
                      "{note.content}"
                    </p>
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-slate-100"></div>
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Captured {new Date(note.createdAt).toLocaleDateString()}
                       </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-300 italic font-medium">No log entries shared yet.</p>
              )}
            </section>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 space-y-10">
              
              {/* Checklist Card */}
              <Card className="bg-slate-900 text-white border-none p-10 overflow-hidden relative">
                <div className="absolute top-[-10%] right-[-10%] w-40 h-40 bg-blue-600/20 blur-[80px] rounded-full"></div>
                <h3 className="text-2xl font-black mb-8 relative z-10 flex items-center gap-3">
                  <span className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center text-lg">✓</span>
                  Gear Status
                </h3>
                <div className="space-y-4 relative z-10">
                  {checklist?.items?.length > 0 ? (
                    checklist.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 py-1">
                        <div className={`w-5 h-5 rounded-lg flex items-center justify-center transition-all ${item.packed ? "bg-blue-500" : "bg-white/10"}`}>
                          {item.packed && <span className="text-[10px] font-bold">✓</span>}
                        </div>
                        <span className={`text-sm font-bold tracking-tight ${item.packed ? "text-slate-500 line-through" : "text-slate-300"}`}>
                          {item.text}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-600 text-sm italic font-bold">Checklist is private.</p>
                  )}
                </div>
              </Card>

              {/* Trip Stats */}
              <div className="grid grid-cols-2 gap-6">
                 <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">Logs</p>
                    <p className="text-3xl font-black text-slate-800 tracking-tighter">{notes?.length || 0}</p>
                 </div>
                 <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">Packed</p>
                    <p className="text-3xl font-black text-slate-800 tracking-tighter">
                      {Math.round((checklist?.items?.filter(i => i.packed).length / checklist?.items?.length) * 100 || 0)}%
                    </p>
                 </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-40 pt-16 border-t border-slate-50 text-center">
           <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-8">Plan your next trip with Traveloop</p>
           <div className="flex justify-center gap-8 text-slate-300 text-2xl">
              <span className="hover:text-blue-500 cursor-pointer transition-colors">𝕏</span>
              <span className="hover:text-pink-500 cursor-pointer transition-colors">📸</span>
              <span className="hover:text-blue-700 cursor-pointer transition-colors">💼</span>
           </div>
        </footer>
      </div>
    </div>
  );
};

export default PublicTripPage;
