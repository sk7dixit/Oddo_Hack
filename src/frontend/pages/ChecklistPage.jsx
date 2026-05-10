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
      const fetchedItems = response.data?.items || [];
      setItems(fetchedItems);
      setChecklist(response.data);
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
      toast.success("Added to itinerary");
    } catch (err) {
      toast.error("Cloud sync failed");
    } finally {
      setIsSyncing(false);
    }
  };

  const togglePacked = async (index) => {
    const updatedItems = [...items];
    updatedItems[index].packed = !updatedItems[index].packed;
    setItems(updatedItems);
    try {
      await updateChecklist(checklist._id, { items: updatedItems });
      localStorage.setItem(`checklist_${TRIP_ID}`, JSON.stringify(updatedItems));
    } catch (err) {}
  };

  const removeItem = async (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    try {
      await updateChecklist(checklist._id, { items: updatedItems });
      localStorage.setItem(`checklist_${TRIP_ID}`, JSON.stringify(updatedItems));
    } catch (err) {}
  };

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><div className="w-10 h-10 border-2 border-white/10 border-t-white rounded-full animate-spin"></div></div>;

  const packedCount = items.filter(i => i.packed).length;
  const progress = items.length > 0 ? (packedCount / items.length) * 100 : 0;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000">
      
      {/* Professional Hero Section */}
      <section className="py-16 text-center max-w-4xl mx-auto px-4">
        <span className="inline-block text-xs font-bold text-blue-500 uppercase tracking-[0.4em] mb-4">Itinerary Planner</span>
        <h1 className="text-6xl font-black text-white tracking-tighter leading-[0.9] mb-8">
          Trip Essentials
        </h1>
        
        <p className="text-sm font-medium text-white/40 mb-10">
          {items.length} Items • <span className="text-blue-400">{Math.round(progress)}% Packed</span>
        </p>

        {/* Compact Input Dock */}
        <div className="max-w-xl mx-auto relative group">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddItem()}
            placeholder="Passport, charger, sunglasses..."
            className="w-full h-16 px-6 rounded-2xl bg-white/5 backdrop-blur-3xl border border-white/10 text-xl font-bold text-white placeholder:text-white/10 focus:bg-white/10 focus:ring-4 focus:ring-blue-600/20 outline-none transition-all duration-300"
          />
          <button 
            onClick={handleAddItem}
            disabled={!text.trim() || isSyncing}
            className="absolute right-2 top-2 bottom-2 px-6 rounded-xl bg-blue-600 text-white font-black text-xs hover:bg-blue-500 active:scale-95 transition-all shadow-lg shadow-blue-900/20"
          >
            ADD
          </button>
        </div>
      </section>

      {/* Modern Chip Grid */}
      <section className="max-w-6xl mx-auto px-8 pb-32">
        {items.length === 0 ? (
          <div className="text-center py-20 bg-white/[0.02] border border-dashed border-white/5 rounded-3xl">
             <h3 className="text-lg font-bold text-white/60 mb-1">Your journey starts here.</h3>
             <p className="text-xs text-white/20 uppercase tracking-widest font-black">Build your perfect trip</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item, index) => (
              <div 
                key={index}
                onClick={() => togglePacked(index)}
                className={`travel-chip group flex flex-col justify-between h-40 ${item.packed ? "bg-blue-600 border-blue-500" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <span className={`text-xl ${item.packed ? "grayscale-0" : "grayscale opacity-20"}`}>✈️</span>
                  <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${item.packed ? "bg-white border-white text-blue-600" : "border-white/10"}`}>
                     {item.packed && <span className="font-bold text-[10px]">✓</span>}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <h4 className={`text-lg font-bold tracking-tight truncate ${item.packed ? "text-white" : "text-white"}`}>
                    {item.text}
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className={`text-[9px] font-black uppercase tracking-widest ${item.packed ? "text-white/60" : "text-white/20"}`}>
                      {item.packed ? "Ready" : "Pending"}
                    </span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); removeItem(index); }}
                      className={`text-sm opacity-0 group-hover:opacity-100 transition-opacity ${item.packed ? "text-white/40 hover:text-white" : "text-white/10 hover:text-rose-500"}`}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Compact Bottom Strip */}
      <section className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
         <div className="flex items-center gap-1.5 p-1.5 bg-slate-900/90 backdrop-blur-3xl rounded-2xl border border-white/5 shadow-2xl">
            {[
              { label: "Share", icon: "🔗", action: () => { navigator.clipboard.writeText(window.location.href); toast.success("Link copied!"); } },
              { label: "Sync", icon: "☁️", action: () => fetchChecklist(true) },
              { label: "Preferences", icon: "⚙️", action: () => toast("Settings coming soon!") }
            ].map((tool, i) => (
              <button 
                key={i}
                onClick={tool.action}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl hover:bg-white/5 text-white transition-all group"
              >
                <span className="text-base group-hover:scale-110 transition-transform">{tool.icon}</span>
                <span className="text-[9px] font-black uppercase tracking-widest leading-none hidden sm:block">{tool.label}</span>
              </button>
            ))}
         </div>
      </section>

    </div>
  );
};

export default ChecklistPage;
