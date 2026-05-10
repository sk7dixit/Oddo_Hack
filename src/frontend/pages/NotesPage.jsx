import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getNotes, createNote } from "../services/notes.service";

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
    } catch (err) {} finally {
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
    try {
      const response = await createNote({ tripId: TRIP_ID, content: content.trim() });
      const savedNote = response.data;
      setNotes(prev => prev.map(n => n._id === tempId ? savedNote : n));
      localStorage.setItem(`notes_${TRIP_ID}`, JSON.stringify([savedNote, ...prevNotes]));
      toast.success("Memory captured");
    } catch (err) {
      setNotes(prevNotes);
      toast.error("Failed to sync memory");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><div className="w-10 h-10 border-2 border-white/10 border-t-white rounded-full animate-spin"></div></div>;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000 max-w-4xl mx-auto px-6">
      <div className="space-y-12 pb-32">
        
        {/* Compact Editor */}
        <section className="bg-white/[0.03] rounded-[2rem] border border-white/10 overflow-hidden group hover:bg-white/[0.05] transition-all duration-300">
          <div className="px-8 py-5 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-base shadow-lg">✍️</div>
              <h2 className="text-base font-bold tracking-tight text-white">Travel Journal</h2>
            </div>
          </div>
          
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Capture a thought..."
            className="w-full min-h-[200px] p-8 text-xl font-bold text-white placeholder:text-white/5 border-none focus:ring-0 resize-none bg-transparent"
          />
          
          <div className="px-8 py-5 bg-black/10 flex items-center justify-between">
            <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Ready to sync</span>
            <button 
              onClick={handleAddNote} 
              disabled={!content.trim() || isSaving}
              className="bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] uppercase tracking-widest px-8 py-3 rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Memory"}
            </button>
          </div>
        </section>

        {/* Timeline Grid */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
             <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Chronology</span>
             <div className="flex-1 h-[1px] bg-white/5"></div>
          </div>

          <div className="space-y-4">
            {notes.map((note) => (
              <div 
                key={note._id} 
                className="group relative bg-white/[0.02] p-8 rounded-[2rem] border border-white/5 hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-8">
                  <div className="w-16 text-center">
                    <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest block mb-1">
                      {new Date(note.createdAt).toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                    <span className="text-2xl font-black text-white leading-none block">
                      {new Date(note.createdAt).getDate()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xl font-bold text-white leading-tight tracking-tight mb-4">
                      {note.content}
                    </p>
                    <div className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">
                      🕒 {new Date(note.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Cloud Verified
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default NotesPage;
