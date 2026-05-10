import React, { useEffect, useState } from "react";
import { getChecklist, createChecklist, updateChecklist } from "../services/checklist.service";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";

const TRIP_ID = "507f1f77bcf86cd799439011";

const ChecklistPage = () => {
  const [checklist, setChecklist] = useState(null);
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchChecklist = async () => {
    try {
      setLoading(true);
      const response = await getChecklist(TRIP_ID);
      const data = response.data;
      setChecklist(data);
      setItems(data?.items || []);
    } catch (err) {
      setError("Failed to load checklist.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChecklist();
  }, []);

  const handleAddItem = async () => {
    if (!text.trim()) return;
    try {
      const newItem = { text: text.trim(), packed: false };
      const updatedItems = [...items, newItem];
      let response;
      if (!checklist) {
        response = await createChecklist({ tripId: TRIP_ID, items: updatedItems });
      } else {
        response = await updateChecklist(checklist._id, { items: updatedItems });
      }
      setChecklist(response.data);
      setItems(response.data.items);
      setText("");
    } catch (err) {
      setError("Failed to add item.");
    }
  };

  const togglePacked = async (index) => {
    try {
      const updatedItems = [...items];
      updatedItems[index].packed = !updatedItems[index].packed;
      const response = await updateChecklist(checklist._id, { items: updatedItems });
      setChecklist(response.data);
      setItems(response.data.items);
    } catch (err) {
      setError("Failed to update item.");
    }
  };

  const removeItem = async (index) => {
    try {
      const updatedItems = items.filter((_, i) => i !== index);
      const response = await updateChecklist(checklist._id, { items: updatedItems });
      setChecklist(response.data);
      setItems(response.data.items);
    } catch (err) {
      setError("Failed to remove item.");
    }
  };

  if (loading) return <Loader fullPage />;

  const packedCount = items.filter(i => i.packed).length;
  const progress = items.length > 0 ? (packedCount / items.length) * 100 : 0;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Main Checklist Area */}
        <div className="flex-1">
          <Card title="Trip Essentials" subtitle="Items you need to pack for your journey.">
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddItem()}
                placeholder="Ex: Passport, Sunglasses, Swimwear..."
                className="flex-1"
              />
              <Button onClick={handleAddItem} disabled={!text.trim()} className="sm:w-48 h-[58px]">
                Add Item
              </Button>
            </div>

            <div className="space-y-4">
              {items.length === 0 ? (
                <EmptyState message="Nothing here yet" icon="🎒" />
              ) : (
                items.map((item, index) => (
                  <div
                    key={index}
                    className={`group flex items-center gap-5 p-6 rounded-[1.5rem] border transition-all ${
                      item.packed 
                        ? "bg-slate-50/50 border-slate-100 opacity-60" 
                        : "bg-white border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50/30"
                    }`}
                  >
                    <div 
                      onClick={() => togglePacked(index)}
                      className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center cursor-pointer transition-all ${
                        item.packed ? "bg-blue-600 border-blue-600 text-white" : "border-slate-200 bg-white"
                      }`}
                    >
                      {item.packed && <span>✓</span>}
                    </div>
                    <span className={`flex-1 text-lg font-bold tracking-tight transition-all ${
                      item.packed ? "text-slate-400 line-through" : "text-slate-700"
                    }`}>
                      {item.text}
                    </span>
                    <button
                      onClick={() => removeItem(index)}
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

        {/* Progress Sidebar */}
        <div className="w-full lg:w-80 space-y-6">
          <Card title="Progress" className="bg-blue-600 text-white border-none shadow-xl shadow-blue-200">
            <div className="flex flex-col items-center text-center">
              <div className="relative w-32 h-32 flex items-center justify-center mb-6">
                 <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="56" fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                    <circle cx="64" cy="64" r="56" fill="transparent" stroke="white" strokeWidth="8" 
                            strokeDasharray={351.85} strokeDashoffset={351.85 - (351.85 * progress) / 100}
                            className="transition-all duration-1000 ease-out" />
                 </svg>
                 <span className="absolute text-2xl font-black">{Math.round(progress)}%</span>
              </div>
              <p className="font-bold opacity-80 uppercase text-[10px] tracking-widest mb-1">Packed Status</p>
              <h4 className="text-xl font-black">{packedCount} / {items.length} Items</h4>
            </div>
          </Card>

          <Card className="bg-slate-800 text-white border-none">
            <h4 className="font-black mb-4 flex items-center gap-2">
              <span className="text-xl">💡</span> Quick Tips
            </h4>
            <ul className="space-y-3 text-sm font-medium text-slate-400 leading-relaxed">
              <li>• Keep digital copies of your passport.</li>
              <li>• Roll clothes to save space.</li>
              <li>• Pack a small medical kit.</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChecklistPage;
