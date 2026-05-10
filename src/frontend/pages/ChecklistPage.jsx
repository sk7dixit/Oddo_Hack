import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Check, Trash2, Link as LinkIcon, RefreshCw, Sliders } from "lucide-react";
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
      toast.success("Essential added");
    } catch (err) {
      toast.error("Sync failed");
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

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><div className="w-10 h-10 border-2 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div></div>;

  const packedCount = items.filter(i => i.packed).length;
  const progress = items.length > 0 ? (packedCount / items.length) * 100 : 0;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* Light Hero Section */}
      <section className="py-20 text-center max-w-4xl mx-auto px-8">
        <span className="inline-block text-[10px] font-bold text-blue-600 uppercase tracking-[0.4em] mb-6">Preparation Suite</span>
        <h1 className="text-5xl font-semibold text-slate-900 tracking-tight leading-none mb-10">
          Trip Essentials
        </h1>
        
        <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto mb-12">
          {items.length} items catalogued • <span className="text-blue-600 font-bold">{Math.round(progress)}% prepared</span>
        </p>

        {/* Clean Input Interface */}
        <div className="max-w-xl mx-auto relative">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddItem()}
            placeholder="What else do you need?"
            className="w-full h-16 px-8 rounded-3xl bg-slate-100 border border-slate-200 text-lg font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-blue-600/5 outline-none transition-all duration-300"
          />
          <button 
            onClick={handleAddItem}
            disabled={!text.trim() || isSyncing}
            className="absolute right-2 top-2 bottom-2 px-8 rounded-2xl bg-blue-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-600/20"
          >
            Add
          </button>
        </div>
      </section>

      {/* Grid Canvas */}
      <section className="max-w-6xl mx-auto px-10 pb-40">
        {items.length === 0 ? (
          <div className="text-center py-24 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[32px]">
             <h3 className="text-xl font-semibold text-slate-900 mb-2">Your list is empty.</h3>
             <p className="text-sm text-slate-400 font-medium">Start building your perfect journey.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => (
              <div 
                key={index}
                onClick={() => togglePacked(index)}
                className={`travel-chip group flex flex-col justify-between h-44 ${item.packed ? "bg-blue-600 border-blue-600 shadow-blue-200" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg transition-all ${item.packed ? "bg-white/20 text-white" : "bg-slate-100 text-slate-400"}`}>
                     {item.packed ? <Check size={20} strokeWidth={3} /> : <Plus size={20} />}
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); removeItem(index); }}
                    className={`p-2 rounded-xl transition-all ${item.packed ? "hover:bg-white/10 text-white/40 hover:text-white" : "hover:bg-rose-50 text-slate-200 hover:text-rose-500"}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                
                <div className="space-y-1">
                  <h4 className={`text-lg font-semibold tracking-tight truncate ${item.packed ? "text-white" : "text-slate-900"}`}>
                    {item.text}
                  </h4>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${item.packed ? "text-white/60" : "text-slate-400"}`}>
                    {item.packed ? "Prepared" : "Pending"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Floating Productivity Strip */}
      <section className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
         <div className="flex items-center gap-1.5 p-1.5 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.1)] rounded-3xl border border-slate-200/60">
            {[
              { label: "Share Link", icon: <LinkIcon size={16} />, action: () => { navigator.clipboard.writeText(window.location.href); toast.success("Link copied!"); } },
              { label: "Sync Cloud", icon: <RefreshCw size={16} />, action: () => fetchChecklist(true) },
              { label: "View Modes", icon: <Sliders size={16} />, action: () => toast("Filters coming soon") }
            ].map((tool, i) => (
              <button 
                key={i}
                onClick={tool.action}
                className="flex items-center gap-2.5 px-6 py-3 rounded-2xl hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-all group"
              >
                <span className="group-hover:scale-110 transition-transform">{tool.icon}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:block">{tool.label}</span>
              </button>
            ))}
         </div>
      </section>

    </div>
  );
};

export default ChecklistPage;
