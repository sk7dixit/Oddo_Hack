import React, { useEffect, useState } from "react";
import { getChecklist, createChecklist, updateChecklist } from "../services/checklist.service";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";

const TRIP_ID = "507f1f77bcf86cd799439011"; // For hackathon demo purposes

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
      
      // If checklist doesn't exist, we might need to create it later
      // But for now, we assume the backend returns null or data
      const data = response.data;
      setChecklist(data);
      setItems(data?.items || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load checklist. Please try again.");
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
        // Create new checklist if it doesn't exist
        response = await createChecklist({ tripId: TRIP_ID, items: updatedItems });
      } else {
        // Update existing checklist
        response = await updateChecklist(checklist._id, { items: updatedItems });
      }

      const updatedData = response.data;
      setChecklist(updatedData);
      setItems(updatedData.items);
      setText("");
    } catch (err) {
      setError("Failed to add item. Please try again.");
    }
  };

  const togglePacked = async (index) => {
    try {
      const updatedItems = [...items];
      updatedItems[index].packed = !updatedItems[index].packed;

      const response = await updateChecklist(checklist._id, { items: updatedItems });
      
      const updatedData = response.data;
      setChecklist(updatedData);
      setItems(updatedData.items);
    } catch (err) {
      setError("Failed to update item status.");
    }
  };

  const removeItem = async (index) => {
    try {
      const updatedItems = items.filter((_, i) => i !== index);

      const response = await updateChecklist(checklist._id, { items: updatedItems });
      
      const updatedData = response.data;
      setChecklist(updatedData);
      setItems(updatedData.items);
    } catch (err) {
      setError("Failed to remove item.");
    }
  };

  if (loading) return <Loader fullPage />;

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Packing Checklist</h1>
        <p className="text-gray-500 mt-2">Check off items as you pack them for your trip.</p>
      </header>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 font-medium">
          {error}
        </div>
      )}

      <Card>
        <div className="flex gap-3 mb-10">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddItem()}
            placeholder="Add something to pack (e.g. Passport, Charger)"
            className="flex-1 px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-gray-700"
          />
          <Button onClick={handleAddItem} disabled={!text.trim()}>
            Add Item
          </Button>
        </div>

        <div className="space-y-3">
          {items.length === 0 ? (
            <EmptyState message="Your checklist is empty." icon="🎒">
              <p className="text-gray-400 mt-2">Start by adding your first travel essential!</p>
            </EmptyState>
          ) : (
            items.map((item, index) => (
              <div
                key={index}
                className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                  item.packed 
                    ? "bg-gray-50 border-gray-100" 
                    : "bg-white border-gray-100 hover:border-blue-200 hover:shadow-sm"
                }`}
              >
                <input
                  type="checkbox"
                  checked={item.packed}
                  onChange={() => togglePacked(index)}
                  className="w-6 h-6 rounded-lg border-2 border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer transition-all"
                />
                <span 
                  className={`flex-1 text-lg transition-all ${
                    item.packed ? "text-gray-400 line-through" : "text-gray-700 font-medium"
                  }`}
                >
                  {item.text}
                </span>
                <button
                  onClick={() => removeItem(index)}
                  className="p-2 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  title="Remove item"
                >
                  <span className="text-xl">🗑️</span>
                </button>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default ChecklistPage;
