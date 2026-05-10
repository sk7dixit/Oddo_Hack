import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";

const ChecklistPage = () => {
  const { tripId } = useParams();
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [checklistId, setChecklistId] = useState(null);

  useEffect(() => {
    fetchChecklist();
  }, [tripId]);

  const fetchChecklist = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/checklist/${tripId}`);
      if (res.data) {
        setItems(res.data.items || []);
        setChecklistId(res.data._id);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching checklist:", error);
      setLoading(false);
    }
  };

  const saveChecklist = async (updatedItems) => {
    try {
      if (checklistId) {
        await axios.put(`http://localhost:5000/api/checklist/${checklistId}`, {
          items: updatedItems,
        });
      } else {
        const res = await axios.post(`http://localhost:5000/api/checklist`, {
          tripId,
          items: updatedItems,
        });
        setChecklistId(res.data._id);
      }
    } catch (error) {
      console.error("Error saving checklist:", error);
    }
  };

  const addItem = () => {
    if (!text.trim()) return;
    const updated = [...items, { text, packed: false }];
    setItems(updated);
    setText("");
    saveChecklist(updated);
  };

  const togglePacked = (index) => {
    const updated = [...items];
    updated[index].packed = !updated[index].packed;
    setItems(updated);
    saveChecklist(updated);
  };

  const removeItem = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
    saveChecklist(updated);
  };

  if (loading) return <Loader fullPage />;

  return (
    <div>
      <header style={{ marginBottom: "30px" }}>
        <h1 style={{ fontSize: "2rem", color: "#333", margin: 0 }}>Packing Checklist</h1>
        <p style={{ color: "#666" }}>Stay organized and never forget your essentials.</p>
      </header>

      <Card>
        <div style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addItem()}
            placeholder="Add something to pack..."
            style={{
              flex: 1,
              padding: "12px 16px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "1rem"
            }}
          />
          <Button onClick={addItem}>Add Item</Button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {items.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                padding: "12px",
                borderRadius: "8px",
                background: item.packed ? "#f8f9fa" : "white",
                border: "1px solid #eee",
                transition: "all 0.2s ease"
              }}
            >
              <input
                type="checkbox"
                checked={item.packed}
                onChange={() => togglePacked(index)}
                style={{ width: "20px", height: "20px", cursor: "pointer" }}
              />
              <span style={{
                flex: 1,
                fontSize: "1.1rem",
                color: item.packed ? "#888" : "#333",
                textDecoration: item.packed ? "line-through" : "none"
              }}>
                {item.text}
              </span>
              <button
                onClick={() => removeItem(index)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#ff4d4f",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                  padding: "5px"
                }}
                title="Remove item"
              >
                🗑️
              </button>
            </div>
          ))}
          {items.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px", color: "#aaa" }}>
              <span style={{ fontSize: "3rem", display: "block", marginBottom: "10px" }}>📦</span>
              <p>Your checklist is empty. Start adding items above!</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ChecklistPage;
