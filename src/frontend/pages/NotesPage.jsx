import React, { useEffect, useState } from "react";
import { getNotes, createNote } from "../services/notes.service";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";

const TRIP_ID = "507f1f77bcf86cd799439011"; // For hackathon demo purposes

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await getNotes(TRIP_ID);
      setNotes(response.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load journal entries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAddNote = async () => {
    if (!content.trim()) return;

    try {
      const response = await createNote({
        tripId: TRIP_ID,
        content: content.trim(),
      });

      // Add new note to the top of the list
      setNotes([response.data, ...notes]);
      setContent("");
    } catch (err) {
      setError("Failed to save your note. Please try again.");
    }
  };

  if (loading) return <Loader fullPage />;

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <header className="mb-10 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Travel Journal</h1>
          <p className="text-gray-500 mt-2">Document your adventures and keep track of important details.</p>
        </div>
      </header>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 font-medium">
          {error}
        </div>
      )}

      <Card className="mb-10 p-0">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind? Write about a place you visited, a meal you loved, or a quick reminder..."
          className="w-100 min-h-[150px] p-8 text-xl leading-relaxed border-none focus:ring-0 placeholder:text-gray-300 resize-none rounded-t-[40px]"
        />
        <div className="px-8 py-4 bg-gray-50 flex justify-end rounded-b-[40px]">
          <Button onClick={handleAddNote} disabled={!content.trim()}>
            Save Entry
          </Button>
        </div>
      </Card>

      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 px-2">Past Entries</h2>
        {notes.length === 0 ? (
          <EmptyState message="No journal entries yet." icon="📝">
            <p className="text-gray-400 mt-2">Your thoughts and memories will appear here.</p>
          </EmptyState>
        ) : (
          notes.map((note) => (
            <div 
              key={note._id} 
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">{note.content}</p>
              <div className="mt-4 flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                <span>🕒 {new Date(note.createdAt).toLocaleDateString()}</span>
                <span>•</span>
                <span>{new Date(note.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesPage;
