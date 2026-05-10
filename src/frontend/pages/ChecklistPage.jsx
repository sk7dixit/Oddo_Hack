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
    } catch (err) {
      // Handled silently
    } finally {
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
      toast.success("Added!");
    } catch (err) {
      setItems(prevItems);
      toast.error("Failed to sync");
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
      toast.error("Failed to sync");
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
      toast.success("Removed");
    } catch (err) {
      setItems(prevItems);
      toast.error("Failed to delete");
    } finally {
      setIsSyncing(false);
    }
  };

  if (loading) return <div className="animate-pulse space-y-6"><div className="h-40 bg-white rounded-3xl"></div></div>;

  const packedCount = items.filter(i => i.packed).length;
  const progress = items.length > 0 ? (packedCount / items.length) * 100 : 0;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Optimized Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Core Flow (Span 8) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Compact Header Card */}
          <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-4xl opacity-5 grayscale group-hover:scale-110 transition-transform">🎒</div>
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl font-black text-slate-800 tracking-tighter mb-1">Packing List</h1>
                <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[9px] mb-6">Trip Management Mode</p>
                
                <div className="flex gap-2">
                  <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddItem()}
                    placeholder="Add an essential..."
                    className="w-full sm:w-64 bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-700 placeholder:text-slate-200 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                  />
                  <button 
                    onClick={handleAddItem}
                    disabled={!text.trim() || isSyncing}
                    className="bg-blue-600 text-white text-xs font-black px-6 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-50 disabled:opacity-50"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Mini Stats Line */}
              <div className="flex gap-6 pt-4 sm:pt-0 border-t sm:border-t-0 sm:border-l border-slate-50 sm:pl-8">
                 <div className="text-center">
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Items</p>
                    <p className="text-xl font-black text-slate-800">{items.length}</p>
                 </div>
                 <div className="text-center">
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Packed</p>
                    <p className="text-xl font-black text-blue-600">{packedCount}</p>
                 </div>
              </div>
            </div>
          </div>

          {/* Denser Items List */}
          <div className="space-y-3">
            {items.length === 0 ? (
              <div className="bg-slate-50/50 border-2 border-dashed border-white rounded-[2rem] py-16 text-center">
                 <span className="text-2xl mb-2 block grayscale opacity-20">🧳</span>
                 <p className="text-xs font-black text-slate-300 uppercase tracking-widest">List is empty</p>
              </div>
            ) : (
              items.map((item, index) => (
                <div 
                  key={index}
                  className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                    item.packed ? "bg-slate-50/50 border-slate-100 opacity-60" : "bg-white border-white shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  }`}
                >
                  <div 
                    onClick={() => !isSyncing && togglePacked(index)}
                    className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center cursor-pointer transition-all ${
                      item.packed ? "bg-blue-600 border-blue-600 text-white" : "border-slate-100 bg-slate-50 hover:border-blue-200"
                    }`}
                  >
                    {item.packed && <span className="font-bold text-sm">✓</span>}
                  </div>
                  <span className={`flex-1 text-base font-bold tracking-tight ${item.packed ? "text-slate-400 line-through" : "text-slate-700"}`}>
                    {item.text}
                  </span>
                  <button 
                    onClick={() => !isSyncing && removeItem(index)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-100 hover:text-rose-500 hover:bg-rose-50 transition-all opacity-0 group-hover:opacity-100"
                  >
                    🗑️
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Side: Compressed Tools (Span 4) */}
        <div className="lg:col-span-4 space-y-6 sticky top-28">
          
          {/* More Compact Readiness Card */}
          <div className="bg-[#0A0D1E] rounded-[2rem] p-8 text-white shadow-2xl shadow-slate-200 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-[60px] rounded-full"></div>
            <div className="relative z-10">
              <p className="text-[9px] font-black opacity-40 uppercase tracking-[0.2em] mb-6">Readiness Status</p>
              <div className="flex items-end justify-between mb-4">
                <span className="text-5xl font-black tracking-tighter">{Math.round(progress)}%</span>
                <div className="text-right">
                   <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest leading-none mb-1">Live Sync</p>
                   <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse ml-auto"></div>
                </div>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                 <div className="bg-blue-600 h-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(37,99,235,0.5)]" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="mt-6 flex justify-between text-[8px] font-black uppercase tracking-widest text-white/20">
                 <span>{packedCount} / {items.length} COMPLETED</span>
                 <span className="text-white/40">{Math.round(100 - progress)}% LEFT</span>
              </div>
            </div>
          </div>

          {/* High-Density Action List */}
          <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm">
             <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-6">Dashboard Tools</h3>
             <div className="grid grid-cols-1 gap-3">
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.origin + `/public/${TRIP_ID}`);
                    toast.success("Link copied!");
                  }}
                  className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all group"
                >
                  <div className="flex items-center gap-3">
                     <span className="text-lg">🔗</span>
                     <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Share Link</span>
                  </div>
                  <span className="text-slate-200 group-hover:text-slate-400 transition-colors">→</span>
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all group">
                   <div className="flex items-center gap-3">
                     <span className="text-lg">🖨️</span>
                     <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Export PDF</span>
                  </div>
                  <span className="text-slate-200 group-hover:text-slate-400 transition-colors">→</span>
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all group">
                   <div className="flex items-center gap-3">
                     <span className="text-lg">⚙️</span>
                     <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Settings</span>
                  </div>
                  <span className="text-slate-200 group-hover:text-slate-400 transition-colors">→</span>
                </button>
             </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default ChecklistPage;
