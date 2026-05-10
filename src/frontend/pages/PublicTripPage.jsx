import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PublicTripPage = () => {
  const { tripId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPublicData();
  }, [tripId]);

  const fetchPublicData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/public/${tripId}`);
      setData(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching public trip:", err);
      setError("Failed to load trip data. It might be private or doesn't exist.");
      setLoading(false);
    }
  };

  if (loading) return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading shared itinerary...</div>;
  if (error) return <div style={{ textAlign: "center", marginTop: "50px", color: "red" }}>{error}</div>;
  if (!data) return null;

  const { trip, checklist, notes } = data;

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <header style={{ marginBottom: "40px", borderBottom: "2px solid #f0f0f0", paddingBottom: "20px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>{trip?.title || "My Trip"}</h1>
        <div style={{ display: "flex", gap: "20px", color: "#666" }}>
          <span>📍 {trip?.destinations?.join(", ") || "No destinations"}</span>
          <span>📅 {trip?.startDate ? new Date(trip.startDate).toLocaleDateString() : "TBD"} - {trip?.endDate ? new Date(trip.endDate).toLocaleDateString() : "TBD"}</span>
        </div>
      </header>

      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "20px" }}>Checklist</h2>
        <div style={{ background: "#f9f9f9", padding: "20px", borderRadius: "12px" }}>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {checklist?.items?.map((item, index) => (
              <li key={index} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 0" }}>
                <span style={{ fontSize: "1.2rem" }}>{item.packed ? "✅" : "⬜"}</span>
                <span style={{ fontSize: "1.1rem", color: item.packed ? "#888" : "#333" }}>{item.text}</span>
              </li>
            ))}
            {(!checklist?.items || checklist.items.length === 0) && <p style={{ color: "#888" }}>No checklist items.</p>}
          </ul>
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "20px" }}>Notes & Journal</h2>
        <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", border: "1px solid #eee", minHeight: "200px", whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
          {notes && notes.length > 0 ? (
            notes.map((note, index) => (
              <div key={index} style={{ marginBottom: "20px" }}>
                {note.content}
              </div>
            ))
          ) : (
            <p style={{ color: "#888" }}>No notes added yet.</p>
          )}
        </div>
      </section>

      <footer style={{ marginTop: "60px", textAlign: "center", color: "#aaa", fontSize: "0.9rem" }}>
        Shared via Traveloop
      </footer>
    </div>
  );
};

export default PublicTripPage;
