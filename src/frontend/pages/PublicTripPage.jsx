import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPublicTrip } from "../services/public.service";
import Loader from "../components/common/Loader";
import Button from "../components/common/Button";

const PublicTripPage = () => {
  const { tripId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPublicData = async () => {
    try {
      setLoading(true);
      const response = await getPublicTrip(tripId);
      setData(response.data);
    } catch (err) {
      console.error(err);
      setError("This itinerary is private or could not be found.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicData();
  }, [tripId]);

  if (loading) return <Loader fullPage />;

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 text-center">
        <span className="text-6xl mb-6">🕵️‍♂️</span>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Itinerary Not Found</h1>
        <p className="text-gray-500 mb-8 max-w-md">{error}</p>
        <Link to="/">
          <Button>Return to Dashboard</Button>
        </Link>
      </div>
    );
  }

  const { trip, checklist, notes } = data;

  return (
    <div className="min-h-screen bg-[#fafbfc] py-20 px-6 font-sans text-[#1a1a1a]">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-20 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-bold mb-6 tracking-wide uppercase">
            Traveloop Shared Itinerary
          </div>
          <h1 className="text-6xl font-black mb-6 tracking-tight">{trip?.title || "Summer Adventure"}</h1>
          <div className="flex items-center justify-center gap-6 text-gray-500 font-medium">
            <span className="flex items-center gap-2">📍 {trip?.destinations?.join(", ") || "Multiple Locations"}</span>
            <span className="text-gray-200">|</span>
            <span className="flex items-center gap-2">📅 {trip?.startDate ? new Date(trip.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "Dates TBD"}</span>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-12">
          {/* Checklist Section */}
          <section className="bg-white p-12 rounded-[40px] shadow-2xl shadow-blue-100/30 border border-gray-50 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
              <span className="p-2 bg-green-50 rounded-xl">✅</span>
              Packing Checklist
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {checklist?.items?.length > 0 ? (
                checklist.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/50 border border-transparent">
                    <span className={`text-xl ${item.packed ? "grayscale-0" : "grayscale opacity-20"}`}>✅</span>
                    <span className={`text-lg font-medium ${item.packed ? "text-gray-400 line-through" : "text-gray-700"}`}>
                      {item.text}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 italic">No checklist items shared.</p>
              )}
            </div>
          </section>

          {/* Journal Section */}
          <section className="bg-white p-12 rounded-[40px] shadow-2xl shadow-blue-100/30 border border-gray-50 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
            <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
              <span className="p-2 bg-amber-50 rounded-xl">📝</span>
              Travel Journal
            </h2>
            <div className="space-y-8">
              {notes?.length > 0 ? (
                notes.map((note) => (
                  <div key={note._id} className="relative pl-8 border-l-4 border-blue-500 py-2">
                    <p className="text-xl text-gray-700 leading-relaxed whitespace-pre-wrap font-medium">
                      {note.content}
                    </p>
                    <div className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                      {new Date(note.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 italic">No journal entries shared yet.</p>
              )}
            </div>
          </section>
        </div>

        <footer className="mt-24 text-center pb-12">
          <p className="text-gray-300 font-bold uppercase tracking-widest text-xs mb-8">Generated by Traveloop</p>
          <div className="flex justify-center gap-4">
             {/* Small social-style share visual */}
             <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">f</div>
             <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white">t</div>
             <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white">i</div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PublicTripPage;
