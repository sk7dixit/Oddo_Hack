import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Image as ImageIcon, MapPin, Smile, Send, Sparkles, Flame, Plus, X } from "lucide-react";
import { getNotes, createNote } from "../services/notes.service";
import { uploadImage } from "../services/upload.service";

const TRIP_ID = "507f1f77bcf86cd799439011";

const NotesPage = () => {
  const [notes, setNotes] = useState(() => {
    const cached = localStorage.getItem(`notes_${TRIP_ID}`);
    return cached ? JSON.parse(cached) : [];
  });
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const [mood, setMood] = useState("😊");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [coverUrl, setCoverUrl] = useState("");

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

  const handleImageUpload = async (e, type = "memory") => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    const id = toast.loading("Processing photo...");
    try {
      const url = await uploadImage(file);
      if (type === "cover") setCoverUrl(url);
      else setImageUrl(url);
      toast.success("Image added to journal", { id });
    } catch (err) {
      toast.error("Upload failed", { id });
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddNote = async () => {
    if (!content.trim()) return;
    const tempId = Date.now().toString();
    const newNote = {
      _id: tempId,
      content: content.trim(),
      createdAt: new Date().toISOString(),
      isOptimistic: true,
      mood,
      location: location || "Untethered",
      imageUrl,
      coverUrl
    };
    const prevNotes = [...notes];
    setNotes([newNote, ...notes]);
    setContent("");
    setImageUrl("");
    setCoverUrl("");
    setIsSaving(true);
    try {
      const response = await createNote(newNote);
      const savedNote = response.data;
      setNotes(prev => prev.map(n => n._id === tempId ? savedNote : n));
      localStorage.setItem(`notes_${TRIP_ID}`, JSON.stringify([savedNote, ...prevNotes]));
      toast.success("Entry archived");
    } catch (err) {
      setNotes(prevNotes);
      toast.error("Cloud sync failed");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePromptClick = (p) => {
    const prefix = p === "What moment do you want to remember forever?" ? "If I could freeze time, I'd choose the moment when " : 
                   p === "What food did you love?" ? "Today's culinary highlight was definitely " : 
                   "Looking back at today, I'm most grateful for ";
    setContent(prefix);
  };

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><div className="w-10 h-10 border-2 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div></div>;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-7xl mx-auto px-10 pb-40">
      
      {/* 1. Soft Editorial Header */}
      <header className="mb-16">
        <h1 className="text-5xl font-semibold text-slate-900 tracking-tight mb-4">Capture Your Journey</h1>
        <p className="text-lg text-slate-500 font-medium max-w-2xl leading-relaxed">
          Document experiences, thoughts, and fleeting memories from every destination in your own reflective space.
        </p>
      </header>

      {/* 2. Light Interaction Grid */}
      <div className="grid grid-cols-12 gap-10 items-start">
        
        {/* Left Side: Floating Canvas (8 cols) */}
        <section className="col-span-12 lg:col-span-8 space-y-10">
          
          <div className="rounded-[32px] bg-white/70 backdrop-blur-xl border border-slate-200/60 shadow-[0_10px_40px_rgba(15,23,42,0.06)] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            
            {/* Journal Cover Image */}
            {coverUrl && (
              <div className="relative h-72 w-full group overflow-hidden">
                <img src={coverUrl} alt="Cover" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <button onClick={() => setCoverUrl("")} className="absolute top-6 right-6 bg-white/40 backdrop-blur-md p-2 rounded-full text-slate-900/60 hover:text-slate-900 transition-colors shadow-sm">
                   <X size={18} />
                </button>
              </div>
            )}

            {/* Floating Editorial Toolbar */}
            <div className="px-10 py-6 border-b border-slate-200/60 flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all cursor-pointer group">
                <ImageIcon size={16} />
                <span className="text-xs font-semibold">{coverUrl ? "Change Cover" : "Add Cover"}</span>
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, "cover")} />
              </label>

              <label className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all cursor-pointer group">
                <Sparkles size={16} />
                <span className="text-xs font-semibold">Attach Memory</span>
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, "memory")} />
              </label>

              <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-slate-100 border border-transparent focus-within:bg-white focus-within:border-slate-200 transition-all">
                <MapPin size={16} className="text-slate-400" />
                <input 
                  placeholder="Location" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-transparent border-none text-xs font-semibold text-slate-700 p-0 focus:ring-0 w-28 placeholder:text-slate-400"
                />
              </div>

              <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-slate-100">
                <Smile size={16} className="text-slate-400" />
                <select 
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="bg-transparent border-none text-xs font-semibold text-slate-700 p-0 focus:ring-0 cursor-pointer"
                >
                  <option value="😊">Grateful</option>
                  <option value="✈️">Explorer</option>
                  <option value="🌊">Calm</option>
                  <option value="🍕">Inspired</option>
                </select>
              </div>
            </div>

            {/* Inline Memory Preview */}
            {imageUrl && (
              <div className="px-10 pt-10 group relative">
                <div className="relative aspect-video rounded-[24px] overflow-hidden border border-slate-200/60 shadow-lg">
                  <img src={imageUrl} alt="Memory" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <button onClick={() => setImageUrl("")} className="absolute top-4 right-4 bg-white/60 backdrop-blur-md p-2 rounded-full text-slate-900/60 hover:text-slate-900 shadow-sm transition-colors">
                     <X size={16} />
                  </button>
                </div>
              </div>
            )}

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind today?"
              className="w-full min-h-[380px] p-12 bg-transparent outline-none resize-none text-lg leading-8 font-normal text-slate-700 placeholder:text-slate-400 transition-all"
            />

            <div className="px-12 py-10 bg-slate-50/50 flex items-center justify-between border-t border-slate-200/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Syncing to Traveloop Cloud</span>
              <button 
                onClick={handleAddNote}
                disabled={!content.trim() || isSaving || isUploading}
                className="flex items-center gap-3 px-10 h-14 rounded-2xl bg-blue-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-blue-600/20 disabled:opacity-50"
              >
                {isSaving ? "Archiving..." : "Archive Entry"}
                <Send size={14} />
              </button>
            </div>
          </div>

          {/* History Feed */}
          <div className="space-y-12">
            <div className="flex items-center gap-6">
               <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.5em]">The Archive</span>
               <div className="flex-1 h-[1px] bg-slate-200/60"></div>
            </div>

            <div className="space-y-12">
              {notes.map((note) => (
                <div key={note._id} className="group relative">
                  <div className="bg-white/70 backdrop-blur-xl p-10 rounded-[32px] border border-slate-200/60 shadow-sm hover:shadow-xl hover:bg-white transition-all duration-500 hover:-translate-y-1">
                    <div className="flex flex-col md:flex-row gap-10">
                       
                       <div className="flex-1 space-y-8">
                          <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                             <span className="flex items-center gap-1.5"><MapPin size={10} /> {note.location}</span>
                             <span>•</span>
                             <span>{new Date(note.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
                          </div>
                          
                          <p className="text-xl font-medium text-slate-800 leading-relaxed tracking-tight">{note.content}</p>
                          
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-lg">{note.mood || "📝"}</div>
                             <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Cloud Verified Entry</span>
                          </div>
                       </div>

                       {(note.imageUrl || note.coverUrl) && (
                         <div className="w-full md:w-64 h-48 rounded-[24px] overflow-hidden border border-slate-200/60">
                            <img src={note.imageUrl || note.coverUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                         </div>
                       )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Right Side: Assistant Panel (4 cols) */}
        <aside className="col-span-12 lg:col-span-4 space-y-8 sticky top-28">
           
           {/* Streak Visualizer */}
           <div className="relative p-10 rounded-[32px] border border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-sm group">
              <div className="flex items-center justify-between mb-8">
                 <div className="w-14 h-14 rounded-[20px] bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
                    <Flame size={28} />
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Consistency</p>
                    <p className="text-3xl font-bold text-slate-900 tracking-tighter">7 Days</p>
                 </div>
              </div>
              <p className="text-sm font-medium text-slate-500 leading-relaxed">
                You're building a beautiful tapestry of memories. Your streak is growing strong.
              </p>
              <div className="mt-8 pt-8 border-t border-slate-100">
                 <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>Next Milestone: 10 Days</span>
                    <span className="text-blue-600">70%</span>
                 </div>
              </div>
           </div>

           {/* Conversational Prompts */}
           <div className="p-10 rounded-[32px] border border-slate-200/60 bg-white/70 backdrop-blur-xl">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-10">Need inspiration?</h3>
              <div className="space-y-4">
                 {[
                   "What moment do you want to remember forever?",
                   "What food did you love?",
                   "A conversation that made you smile"
                 ].map((p, i) => (
                   <button 
                    key={i}
                    onClick={() => handlePromptClick(p)}
                    className="w-full p-6 bg-slate-50 rounded-2xl text-left border border-transparent hover:border-slate-200 hover:bg-white hover:shadow-lg transition-all group"
                   >
                     <p className="text-sm font-semibold text-slate-500 group-hover:text-slate-900 transition-colors leading-relaxed">{p}</p>
                   </button>
                 ))}
              </div>
           </div>

           {/* Editorial Card */}
           <div className="p-10 rounded-[32px] bg-slate-900 text-white shadow-2xl">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                 <Sparkles size={20} className="text-blue-400" />
              </div>
              <p className="text-sm font-medium leading-relaxed mb-6 italic">
                "Traveling – it leaves you speechless, then turns you into a storyteller."
              </p>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">— Ibn Battuta</p>
           </div>

        </aside>

      </div>

    </div>
  );
};

export default NotesPage;
