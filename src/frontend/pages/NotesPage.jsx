import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";

const NotesPage = () => {
  const { tripId } = useParams();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, [tripId]);

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/notes/${tripId}`);
      if (res.data && res.data.length > 0) {
        setContent(res.data[res.data.length - 1].content);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setLoading(false);
    }
  };

  const saveNote = async () => {
    setSaving(true);
    try {
      await axios.post(`http://localhost:5000/api/notes`, {
        tripId,
        content,
      });
      setSaving(false);
      // We could use a toast here
      alert("Note saved successfully!");
    } catch (error) {
      console.error("Error saving note:", error);
      setSaving(false);
    }
  };

  if (loading) return <Loader fullPage />;

  return (
    <div style={{ maxWidth: "1000px" }}>
      <header style={{ marginBottom: "30px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "2rem", color: "#333", margin: 0 }}>Travel Journal</h1>
          <p style={{ color: "#666" }}>Capture your thoughts, memories, and important details.</p>
        </div>
        <Button onClick={saveNote} disabled={saving}>
          {saving ? "Saving..." : "Save Journal Entry"}
        </Button>
      </header>

      <Card>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind? Write about your day, the food, or places you visited..."
          style={{
            width: "100%",
            minHeight: "500px",
            padding: "20px",
            fontSize: "1.1rem",
            lineHeight: "1.6",
            border: "none",
            outline: "none",
            resize: "vertical",
            fontFamily: "inherit",
            backgroundColor: "#fff"
          }}
        />
      </Card>
      
      <div style={{ marginTop: "20px", color: "#888", fontSize: "0.9rem", textAlign: "right" }}>
        Last auto-saved: {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
};

export default NotesPage;
