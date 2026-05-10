import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getChecklist, createChecklist, updateChecklist } from "../services/checklist.service";

const TRIP_ID = "507f1f77bcf86cd799439011";

const ChecklistPage = () => {
  const [checklist, setChecklist] = useState(null);
  const [items, setItems] = useState(() => {
    const cached = localStorage.getItem(`checklist_${TRIP_ID}`);
    return cached ? JSON.parse(cached) : [];
  });
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const fetchChecklist = async (showLoader = false) => {
    try {
      if (showLoader) setLoading(true);
      const response = await getChecklist(TRIP_ID);
      const data = response.data;
      setChecklist(data);
      const fetchedItems = data?.items || [];
      setItems(fetchedItems);
      localStorage.setItem(`checklist_${TRIP_ID}`, JSON.stringify(fetchedItems));
    } catch (err) {} finally {
      if (showLoader) setLoading(false);
    }
  };

  useEffect(() => {
    fetchChecklist(items.length === 0);
  }, []);

  const handleAddItem = async () => {
    if (!text.trim()) return;
    const newItem = { text: text.trim(), packed: false };
    const prevItems = [...items];
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    setText("");
    setIsSyncing(true);
    try {
      let response;
      if (!checklist) {
        response = await createChecklist({ tripId: TRIP_ID, items: updatedItems });
      } else {
        response = await updateChecklist(checklist._id, { items: updatedItems });
      }
      setChecklist(response.data);
      localStorage.setItem(`checklist_${TRIP_ID}`, JSON.stringify(response.data.items));
      toast.success("Ready for takeoff 🚀");
    } catch (err) {
      setItems(prevItems);
      toast.error("Cloud sync failed");
    } finally {
      setIsSyncing(false);
    }
  };

  const togglePacked = async (index) => {
    const prevItems = [...items];
    const updatedItems = [...items];
    updatedItems[index].packed = !updatedItems[index].packed;
    setItems(updatedItems);
    setIsSyncing(true);
    try {
      const response = await updateChecklist(checklist._id, { items: updatedItems });
      setChecklist(response.data);
      localStorage.setItem(`checklist_${TRIP_ID}`, JSON.stringify(response.data.items));
    } catch (err) {
      setItems(prevItems);
    } finally {
      setIsSyncing(false);
    }
  };

  const removeItem = async (index) => {
    const prevItems = [...items];
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    setIsSyncing(true);
    try {
      const response = await updateChecklist(checklist._id, { items: updatedItems });
      setChecklist(response.data);
      localStorage.setItem(`checklist_${TRIP_ID}`, JSON.stringify(response.data.items));
    } catch (err) {
      setItems(prevItems);
    } finally {
      setIsSyncing(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div></div>;

  const packedCount = items.filter(i => i.packed).length;
  const progress = items.length > 0 ? (packedCount / items.length) * 100 : 0;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000 pb-40">
      
      {/* 1. Immersive Hero Section */}
      <section className="relative mb-24 px-4 text-center">
        <span className="inline-block text-[10px] font-black text-white/40 uppercase tracking-[0.5em] mb-8">Travel Itinerary</span>
        <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-none mb-12">
          Trip Essentials
        </h1>
        
        {/* Floating Input Dock */}
        <div className="max-w-2xl mx-auto relative group">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddItem()}
            placeholder="What else are you taking?"
            className="w-full h-24 px-10 rounded-[2.5rem] bg-white/10 backdrop-blur-3xl border border-white/20 text-3xl font-black text-white placeholder:text-white/20 focus:bg-white/20 focus:ring-8 focus:ring-white/5 outline-none transition-all duration-500 shadow-2xl"
          />
          <button 
            onClick={handleAddItem}
            disabled={!text.trim() || isSyncing}
            className="absolute right-4 top-4 bottom-4 w-16 h-16 rounded-[1.5rem] bg-blue-600 text-white flex items-center justify-center text-3xl hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-900/40"
          >
            +
          </button>
        </div>

        {/* Floating Circular Progress - Overlapping Hero */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 md:left-[80%] md:translate-x-0 w-32 h-32 bg-white/10 backdrop-blur-3xl rounded-full border border-white/20 flex flex-col items-center justify-center shadow-2xl group hover:scale-110 transition-transform">
           <svg className="absolute inset-0 w-full h-full -rotate-90">
             <circle cx="64" cy="64" r="54" className="stroke-white/5 fill-none" strokeWidth="8" />
             <circle cx="64" cy="64" r="54" className="stroke-blue-500 fill-none transition-all duration-1000 ease-out" strokeWidth="8" strokeDasharray="339.29" strokeDashoffset={339.29 - (339.29 * progress) / 100} strokeLinecap="round" />
           </svg>
           <span className="text-2xl font-black text-white relative z-10">{Math.round(progress)}%</span>
           <span className="text-[8px] font-black text-white/40 uppercase tracking-widest relative z-10">Ready</span>
        </div>
      </section>

      {/* 2. Interactive Checklist Chips Area */}
      <section className="max-w-6xl mx-auto px-6">
        {items.length === 0 ? (
          <div className="text-center py-20 grayscale opacity-20">
             <h3 className="text-3xl font-black text-white mb-2">No essentials yet.</h3>
             <p className="text-white/40 font-bold">Start building your perfect trip.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => (
              <div 
                key={index}
                onClick={() => !isSyncing && togglePacked(index)}
                className={`group travel-chip ${item.packed ? "bg-blue-600/90 border-blue-400 shadow-blue-500/20" : "bg-white/80 border-white/40"}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <span className={`text-2xl transition-transform group-hover:scale-125 ${item.packed ? "grayscale-0" : "grayscale opacity-30"}`}>✈️</span>
                    <span className={`text-xl font-black tracking-tight truncate ${item.packed ? "text-white" : "text-slate-800"}`}>
                      {item.text}
                    </span>
                  </div>
                  <div className={`shrink-0 w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${item.packed ? "bg-white border-white text-blue-600" : "border-slate-200"}`}>
                     {item.packed && <span className="font-bold text-sm">✓</span>}
                  </div>
                </div>
                
                {/* Micro Actions */}
                <div className="mt-6 pt-6 border-t border-black/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                   <span className={`text-[10px] font-black uppercase tracking-widest ${item.packed ? "text-white/60" : "text-slate-300"}`}>
                     {item.packed ? "Packed & Ready" : "Pending Item"}
                   </span>
                   <button 
                    onClick={(e) => { e.stopPropagation(); removeItem(index); }}
                    className={`text-lg hover:scale-125 transition-transform ${item.packed ? "text-white/40 hover:text-white" : "text-slate-200 hover:text-rose-500"}`}
                   >
                    🗑️
                   </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 3. Floating Quick Actions Strip */}
      <section className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50">
         <div className="flex items-center gap-2 p-2 bg-slate-900/80 backdrop-blur-3xl rounded-[2rem] border border-white/10 shadow-2xl">
            {[
              { label: "Share Itinerary", icon: "🔗", action: () => { navigator.clipboard.writeText(window.location.href); toast.success("Link copied!"); } },
              { label: "Cloud Sync", icon: "☁️", action: () => fetchChecklist(true) },
              { label: "Trip Rules", icon: "⚙️", action: () => toast("Settings coming soon!") }
            ].map((tool, i) => (
              <button 
                key={i}
                onClick={tool.action}
                className="flex items-center gap-3 px-6 py-3.5 rounded-[1.5rem] hover:bg-white/10 text-white transition-all group"
              >
                <span className="text-xl group-hover:scale-125 transition-transform">{tool.icon}</span>
                <span className="text-[10px] font-black uppercase tracking-widest leading-none hidden md:block">{tool.label}</span>
              </button>
            ))}
         </div>
      </section>

    </div>
  );
};

export default ChecklistPage;
