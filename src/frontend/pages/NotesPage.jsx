import React, { useEffect, useState } from "react";
import { getNotes, createNote } from "../services/notes.service";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";

const TRIP_ID = "507f1f77bcf86cd799439011";

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
      const response = await createNote({ tripId: TRIP_ID, content: content.trim() });
      setNotes([response.data, ...notes]);
      setContent("");
    } catch (err) {
      setError("Failed to save note.");
    }
  };

  if (loading) return <Loader fullPage />;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Entry Card */}
        <section>
          <Card className="p-0 overflow-hidden border-2 border-blue-50 shadow-2xl shadow-blue-100/50">
            <div className="bg-blue-600 px-10 py-6 flex items-center justify-between">
              <h2 className="text-white font-black tracking-tight flex items-center gap-2">
                <span className="text-xl">✍️</span> New Journal Entry
              </h2>
              <span className="text-blue-200 text-xs font-black uppercase tracking-widest">
                {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
              </span>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start typing your memories here..."
              className="w-full min-h-[220px] p-10 text-2xl font-medium text-slate-700 leading-relaxed placeholder:text-slate-200 border-none focus:ring-0 resize-none bg-white"
            />
            <div className="px-10 py-6 bg-slate-50 border-t border-slate-100 flex justify-end">
              <Button onClick={handleAddNote} disabled={!content.trim()} className="px-10">
                Save Memory
              </Button>
            </div>
          </Card>
        </section>

        {/* Timeline */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 px-2">
             <h3 className="text-lg font-black text-slate-800 uppercase tracking-widest">Memory Lane</h3>
             <div className="flex-1 h-[2px] bg-slate-100"></div>
          </div>

          {notes.length === 0 ? (
            <EmptyState message="Your journal is empty" icon="📝" />
          ) : (
            <div className="space-y-6">
              {notes.map((note) => (
                <div 
                  key={note._id} 
                  className="group relative bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-500"
                >
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex-shrink-0 flex flex-col items-center">
                       <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex flex-col items-center justify-center font-black">
                          <span className="text-xs uppercase leading-none mb-1">{new Date(note.createdAt).toLocaleDateString('en-US', { month: 'short' })}</span>
                          <span className="text-xl leading-none">{new Date(note.createdAt).getDate()}</span>
                       </div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <p className="text-2xl font-bold text-slate-800 leading-snug tracking-tight">
                        {note.content}
                      </p>
                      <div className="flex items-center gap-4 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
                        <span>🕒 {new Date(note.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        <span>•</span>
                        <span>Captured with Traveloop</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default NotesPage;
