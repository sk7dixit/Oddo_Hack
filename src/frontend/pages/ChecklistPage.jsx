import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getChecklist, createChecklist, updateChecklist } from "../services/checklist.service";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";

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

    // Optimistic Update
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
      toast.success("Added to your list!");
    } catch (err) {
      setItems(prevItems); // Rollback
      toast.error("Failed to add item. Reverting changes.");
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
      toast.success(updatedItems[index].packed ? "Item packed! 🎒" : "Unpacked item");
    } catch (err) {
      setItems(prevItems);
      toast.error("Sync failed. Reverting status.");
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
      toast.success("Item removed");
    } catch (err) {
      setItems(prevItems);
      toast.error("Failed to delete item.");
    } finally {
      setIsSyncing(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-40 bg-slate-200 rounded-[2rem] w-full"></div>
        <div className="h-20 bg-slate-100 rounded-[1.5rem] w-full"></div>
        <div className="h-20 bg-slate-100 rounded-[1.5rem] w-full"></div>
      </div>
    );
  }

  const packedCount = items.filter(i => i.packed).length;
  const progress = items.length > 0 ? (packedCount / items.length) * 100 : 0;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Card */}
        <div className="bg-white rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-50">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl">🎒</span>
            <div>
              <h1 className="text-4xl font-black text-slate-800 tracking-tighter">Packing Checklist</h1>
              <p className="text-slate-400 font-bold text-sm tracking-tight">Stay organized. Travel lighter.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddItem()}
              placeholder="Add your travel essential..."
              className="flex-1 bg-slate-50 border-none rounded-2xl px-6 py-4 text-lg font-bold text-slate-700 placeholder:text-slate-300 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
              autoFocus
            />
            <button 
              onClick={handleAddItem} 
              disabled={!text.trim() || isSyncing}
              className="bg-blue-600 hover:bg-blue-700 text-white font-black px-10 rounded-2xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50 shadow-lg shadow-blue-100"
            >
              {isSyncing ? "..." : "Add"}
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
           <div className="bg-white p-6 rounded-[2rem] border border-slate-50 shadow-sm flex flex-col items-center">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Total Items</span>
              <span className="text-3xl font-black text-slate-800">{items.length}</span>
           </div>
           <div className="bg-blue-600 p-6 rounded-[2rem] shadow-xl shadow-blue-100 flex flex-col items-center text-white">
              <span className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-1">Packed</span>
              <span className="text-3xl font-black">{packedCount}</span>
           </div>
           <div className="bg-white p-6 rounded-[2rem] border border-slate-50 shadow-sm flex flex-col items-center">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Remaining</span>
              <span className="text-3xl font-black text-slate-800">{items.length - packedCount}</span>
           </div>
           <div className="bg-white p-6 rounded-[2rem] border border-slate-50 shadow-sm flex flex-col items-center">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Readiness</span>
              <span className="text-3xl font-black text-blue-600">{Math.round(progress)}%</span>
           </div>
        </div>

        {/* Items List */}
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="bg-white p-20 rounded-[3rem] border-2 border-dashed border-slate-100 text-center">
              <div className="text-6xl mb-6 grayscale opacity-20">🧳</div>
              <h3 className="text-xl font-black text-slate-800 mb-2">Your list is empty</h3>
              <p className="text-slate-400 font-bold max-w-xs mx-auto leading-relaxed">Add items like your passport, charger, or sunscreen to get started.</p>
            </div>
          ) : (
            items.map((item, index) => (
              <div
                key={index}
                className={`group flex items-center gap-6 p-6 rounded-[2rem] border transition-all duration-500 ${
                  item.packed 
                    ? "bg-slate-50/50 border-slate-100 opacity-60" 
                    : "bg-white border-slate-50 hover:border-blue-100 hover:shadow-2xl hover:shadow-blue-50/20 hover:-translate-y-1"
                }`}
              >
                <div 
                  onClick={() => !isSyncing && togglePacked(index)}
                  className={`w-10 h-10 rounded-2xl border-2 flex items-center justify-center cursor-pointer transition-all duration-300 ${
                    item.packed ? "bg-blue-600 border-blue-600 text-white" : "border-slate-200 bg-white hover:border-blue-400"
                  }`}
                >
                  {item.packed && <span className="font-bold text-xl">✓</span>}
                </div>
                <span className={`flex-1 text-xl font-black tracking-tight transition-all duration-300 ${
                  item.packed ? "text-slate-400 line-through" : "text-slate-700"
                }`}>
                  {item.text}
                </span>
                <button
                  onClick={() => !isSyncing && removeItem(index)}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-200 hover:bg-rose-50 hover:text-rose-500 transition-all opacity-0 group-hover:opacity-100"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ChecklistPage;
