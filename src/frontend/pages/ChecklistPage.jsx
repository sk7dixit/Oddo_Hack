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
      // Error handled silently or via toast in CRUD
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
      toast.success("Added to list");
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
      toast.success(updatedItems[index].packed ? "Packed! 🎒" : "Unpacked");
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

  if (loading) return <div className="p-12 animate-pulse space-y-6"><div className="h-40 bg-white rounded-3xl"></div></div>;

  const packedCount = items.filter(i => i.packed).length;
  const progress = items.length > 0 ? (packedCount / items.length) * 100 : 0;

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-10">
      
      {/* Header Section */}
      <div className="bg-white rounded-[2.5rem] p-12 shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-black text-slate-800 tracking-tighter mb-2">Packing Checklist</h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Trip to Destination • {items.length} Items Total</p>
        </div>
        <div className="flex items-center gap-6">
           <div className="text-right">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Progress</p>
              <p className="text-3xl font-black text-blue-600">{Math.round(progress)}%</p>
           </div>
           <div className="w-20 h-20 rounded-full border-8 border-slate-50 flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full border-8 border-blue-600 transition-all duration-1000" style={{ clipPath: `inset(${100 - progress}% 0 0 0)` }}></div>
              <span className="text-xl">✈️</span>
           </div>
        </div>
      </div>

      {/* Input Card */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
        <div className="flex gap-4">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddItem()}
            placeholder="Add an essential item..."
            className="flex-1 bg-slate-50 border-none rounded-2xl px-6 py-4 text-xl font-bold text-slate-700 placeholder:text-slate-200 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
          />
          <button 
            onClick={handleAddItem}
            disabled={!text.trim() || isSyncing}
            className="bg-blue-600 text-white font-black px-12 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 disabled:opacity-50"
          >
            Add
          </button>
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {items.length === 0 ? (
          <div className="col-span-full bg-slate-50 border-4 border-dashed border-white rounded-[3rem] p-24 text-center">
             <span className="text-6xl mb-6 block grayscale opacity-20">🧳</span>
             <h3 className="text-2xl font-black text-slate-400">Your list is empty</h3>
          </div>
        ) : (
          items.map((item, index) => (
            <div 
              key={index}
              className={`group flex items-center gap-6 p-8 rounded-[2.5rem] border transition-all duration-500 ${
                item.packed ? "bg-slate-50 border-slate-100 opacity-60" : "bg-white border-white shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1"
              }`}
            >
              <div 
                onClick={() => !isSyncing && togglePacked(index)}
                className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center cursor-pointer transition-all ${
                  item.packed ? "bg-blue-600 border-blue-600 text-white" : "border-slate-100 bg-slate-50"
                }`}
              >
                {item.packed && <span className="font-bold text-2xl">✓</span>}
              </div>
              <span className={`flex-1 text-2xl font-black tracking-tight ${item.packed ? "text-slate-400 line-through" : "text-slate-700"}`}>
                {item.text}
              </span>
              <button 
                onClick={() => !isSyncing && removeItem(index)}
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-100 hover:text-rose-500 hover:bg-rose-50 transition-all opacity-0 group-hover:opacity-100"
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default ChecklistPage;
