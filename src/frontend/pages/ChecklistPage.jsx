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
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          <Card 
            title="Packing Checklist" 
            subtitle={isSyncing ? "Syncing changes..." : "All changes saved locally and to cloud."}
          >
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddItem()}
                placeholder="What else do you need?"
                className="flex-1"
                autoFocus
              />
              <Button onClick={handleAddItem} disabled={!text.trim() || isSyncing} className="sm:w-48 h-[58px]">
                {isSyncing ? "..." : "Add Item"}
              </Button>
            </div>

            <div className="space-y-4">
              {items.length === 0 ? (
                <EmptyState message="Your packing list is empty" icon="🎒">
                   <p className="text-slate-400 font-medium">Add essentials like your passport, charger, or sunscreen.</p>
                </EmptyState>
              ) : (
                items.map((item, index) => (
                  <div
                    key={index}
                    className={`group flex items-center gap-5 p-6 rounded-[1.5rem] border transition-all duration-300 ${
                      item.packed 
                        ? "bg-slate-50/50 border-slate-100 opacity-60" 
                        : "bg-white border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50/30 hover:-translate-y-1"
                    }`}
                  >
                    <div 
                      onClick={() => !isSyncing && togglePacked(index)}
                      className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center cursor-pointer transition-all ${
                        item.packed ? "bg-blue-600 border-blue-600 text-white" : "border-slate-200 bg-white"
                      }`}
                    >
                      {item.packed && <span className="font-bold">✓</span>}
                    </div>
                    <span className={`flex-1 text-lg font-bold tracking-tight transition-all ${
                      item.packed ? "text-slate-400 line-through" : "text-slate-700"
                    }`}>
                      {item.text}
                    </span>
                    <button
                      onClick={() => !isSyncing && removeItem(index)}
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 hover:bg-rose-50 hover:text-rose-500 transition-all opacity-0 group-hover:opacity-100"
                    >
                      🗑️
                    </button>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        <div className="w-full lg:w-80 space-y-6">
          <Card title="Quick Stats" className="bg-blue-600 text-white border-none shadow-xl shadow-blue-200 overflow-hidden relative">
            <div className="absolute top-[-20%] left-[-20%] w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 flex flex-col items-center py-4">
              <div className="text-5xl font-black mb-2">{Math.round(progress)}%</div>
              <p className="font-bold opacity-60 uppercase text-[10px] tracking-[0.3em]">Completion</p>
              <div className="w-full bg-white/20 h-2 rounded-full mt-8 overflow-hidden">
                <div className="bg-white h-full transition-all duration-1000 ease-out" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          </Card>
          
          <div className="p-8 bg-slate-800 rounded-[2rem] text-white">
             <h4 className="font-black mb-4 flex items-center gap-2">🔗 Share List</h4>
             <p className="text-xs text-slate-400 font-bold mb-6 leading-relaxed">Let others know what you're bringing to avoid duplicates!</p>
             <Button variant="primary" fullWidth className="bg-white text-slate-900 hover:bg-slate-100 shadow-none h-12 text-xs" onClick={() => {
                navigator.clipboard.writeText(window.location.origin + `/public/${TRIP_ID}`);
                toast.success("Public link copied!");
             }}>
                Copy Public Link
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChecklistPage;
