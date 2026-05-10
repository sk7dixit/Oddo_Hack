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
    } catch (err) {
      // Handled silently
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
      setNotes(prev => prev.map(n => n._id === tempId ? savedNote : n));
      const updatedNotes = [savedNote, ...prevNotes];
      localStorage.setItem(`notes_${TRIP_ID}`, JSON.stringify(updatedNotes));
    } catch (err) {
      setNotes(prevNotes);
      toast.error("Failed to sync memory");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div className="animate-pulse space-y-12"><div className="h-64 bg-white rounded-[2.5rem]"></div></div>;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-4xl mx-auto">
      <div className="space-y-16 pb-32">
        
        {/* Cinematic Editor Section */}
        <section className="bg-white rounded-[3rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-hidden group hover:shadow-xl transition-all duration-700">
          <div className="px-10 py-8 bg-[#0D1117] text-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-blue-900/40 group-hover:scale-110 transition-transform">✍️</div>
              <div>
                <h2 className="text-xl font-black tracking-tight leading-none">Travel Journal</h2>
                <p className="text-[9px] font-black uppercase tracking-[0.3em] opacity-30 mt-1.5">Preserving your journey</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,1)]"></div>
               <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Ready to sync</span>
            </div>
          </div>
          
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Capture a thought, a feeling, or a moment..."
            className="w-full min-h-[300px] p-12 text-3xl font-black text-slate-800 leading-tight placeholder:text-slate-100 border-none focus:ring-0 resize-none bg-white"
          />
          
          <div className="px-12 py-8 bg-slate-50/50 flex items-center justify-between border-t border-slate-100">
            <p className="text-xs font-bold text-slate-400">Word count: {content.trim().split(/\s+/).filter(Boolean).length}</p>
            <button 
              onClick={handleAddNote} 
              disabled={!content.trim() || isSaving}
              className="bg-blue-600 hover:bg-blue-700 text-white font-black px-12 py-4 rounded-2xl transition-all shadow-xl shadow-blue-50 active:scale-95 disabled:opacity-50"
            >
              {isSaving ? "Syncing..." : "Save Memory"}
            </button>
          </div>
        </section>

        {/* Cinematic Timeline */}
        <section className="space-y-12">
          <div className="flex items-center gap-6">
             <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">The Timeline</h3>
             <div className="flex-1 h-[1px] bg-slate-100"></div>
          </div>

          {notes.length === 0 ? (
            <div className="py-20 text-center grayscale opacity-10">
               <span className="text-6xl block mb-6">📖</span>
               <p className="text-xs font-black uppercase tracking-widest">Journal Empty</p>
            </div>
          ) : (
            <div className="space-y-10">
              {notes.map((note) => (
                <div 
                  key={note._id} 
                  className={`group relative bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/40 transition-all duration-700 hover:-translate-y-2 ${note.isOptimistic ? "opacity-50 grayscale" : ""}`}
                >
                  <div className="flex items-start gap-12">
                    <div className="flex-shrink-0 text-center pt-2">
                       <div className="w-20 h-20 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                          <span className="text-[10px] font-black text-slate-300 group-hover:text-blue-400 uppercase mb-1">{new Date(note.createdAt).toLocaleDateString('en-US', { month: 'short' })}</span>
                          <span className="text-3xl font-black text-slate-800 leading-none">{new Date(note.createdAt).getDate()}</span>
                       </div>
                    </div>
                    <div className="flex-1 space-y-6 pt-2">
                      <p className="text-4xl font-black text-slate-800 leading-[1.05] tracking-tighter">
                        {note.content}
                      </p>
                      <div className="flex items-center gap-4 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                         <span>🕒 {new Date(note.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                         <span>•</span>
                         <span className="text-blue-500">Cloud Verified</span>
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
