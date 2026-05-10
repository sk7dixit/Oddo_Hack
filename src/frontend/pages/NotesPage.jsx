import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getNotes, createNote } from "../services/notes.service";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";

const TRIP_ID = "507f1f77bcf86cd799439011";

const NotesPage = () => {
  const [notes, setNotes] = useState(() => {
    const cached = localStorage.getItem(`notes_${TRIP_ID}`);
    return cached ? JSON.parse(cached) : [];
  });
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fetchNotes = async (showLoader = false) => {
    try {
      if (showLoader) setLoading(true);
      const response = await getNotes(TRIP_ID);
      const fetchedNotes = response.data || [];
      setNotes(fetchedNotes);
      localStorage.setItem(`notes_${TRIP_ID}`, JSON.stringify(fetchedNotes));
    } catch (err) {
      console.error(err);
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes(notes.length === 0);
  }, []);

  const handleAddNote = async () => {
    if (!content.trim()) return;

    const tempId = Date.now().toString();
    const newNote = {
      _id: tempId,
      content: content.trim(),
      createdAt: new Date().toISOString(),
      isOptimistic: true
    };

    const prevNotes = [...notes];
    setNotes([newNote, ...notes]);
    setContent("");
    setIsSaving(true);
    toast.success("Memory captured! ✨");

    try {
      const response = await createNote({ tripId: TRIP_ID, content: content.trim() });
      const savedNote = response.data;
      
      // Update the optimistic note with the real one from backend
      setNotes(prev => prev.map(n => n._id === tempId ? savedNote : n));
      
      // Update cache
      const updatedNotes = [savedNote, ...prevNotes];
      localStorage.setItem(`notes_${TRIP_ID}`, JSON.stringify(updatedNotes));
    } catch (err) {
      setNotes(prevNotes); // Rollback
      toast.error("Failed to sync note. Reverting.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-12 animate-pulse">
        <div className="h-64 bg-slate-200 rounded-[2.5rem]"></div>
        <div className="space-y-6">
          <div className="h-40 bg-slate-100 rounded-[2.5rem]"></div>
          <div className="h-40 bg-slate-100 rounded-[2.5rem]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="w-full space-y-16">
        
        <section>
          <Card className="p-0 overflow-hidden border-none shadow-[0_20px_50px_rgba(59,130,246,0.12)]">
            <div className="bg-blue-600 px-10 py-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center text-xl">✍️</div>
                 <h2 className="text-white text-xl font-black tracking-tight">Journal Your Trip</h2>
              </div>
              <div className="hidden sm:block text-blue-200 text-xs font-black uppercase tracking-[0.3em]">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </div>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What made you smile today? Write it down before you forget..."
              className="w-full min-h-[250px] p-10 text-2xl font-bold text-slate-700 leading-relaxed placeholder:text-slate-200 border-none focus:ring-0 resize-none bg-white"
            />
            <div className="px-10 py-6 bg-slate-50 flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">Syncing to Traveloop Cloud</span>
              <Button onClick={handleAddNote} disabled={!content.trim() || isSaving} className="px-12">
                {isSaving ? "Syncing..." : "Save Memory"}
              </Button>
            </div>
          </Card>
        </section>

        <section className="space-y-10">
          <div className="flex items-center gap-4 px-2">
             <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em]">The Timeline</h3>
             <div className="flex-1 h-[1px] bg-slate-100"></div>
          </div>

          {notes.length === 0 ? (
            <EmptyState message="Your journal is empty" icon="📔">
              <p className="text-slate-400 font-medium max-w-xs mx-auto">Start documenting your adventures, thoughts, and memories here.</p>
            </EmptyState>
          ) : (
            <div className="space-y-8">
              {notes.map((note) => (
                <div 
                  key={note._id} 
                  className={`group relative bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/40 transition-all duration-500 hover:-translate-y-2 ${note.isOptimistic ? "opacity-50 grayscale" : ""}`}
                >
                  <div className="flex flex-col md:flex-row gap-10 items-start">
                    <div className="flex-shrink-0 flex flex-col items-center">
                       <div className="w-20 h-20 rounded-3xl bg-slate-50 border border-slate-100 text-slate-400 flex flex-col items-center justify-center font-black">
                          <span className="text-[10px] uppercase tracking-widest mb-1">{new Date(note.createdAt).toLocaleDateString('en-US', { month: 'short' })}</span>
                          <span className="text-3xl leading-none text-slate-800">{new Date(note.createdAt).getDate()}</span>
                       </div>
                    </div>
                    <div className="flex-1 space-y-6">
                      <p className="text-3xl font-black text-slate-800 leading-tight tracking-tighter">
                        {note.content}
                      </p>
                      <div className="flex items-center gap-6">
                         <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
                            <span>🕒 {new Date(note.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            <span>•</span>
                            <span className="text-blue-500">Verified Memory</span>
                         </div>
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
