import React from "react";
import { useParams } from "react-router-dom";

const PublicTripPage = () => {
  const { tripId } = useParams();

  return (
    <div className="max-w-4xl mx-auto py-20 px-6 animate-in slide-in-from-bottom-10 duration-700">
      <header className="text-center mb-16">
        <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-bold mb-6">SHARED ITINERARY</div>
        <h1 className="text-5xl font-black text-gray-900 mb-4">Trip Details</h1>
        <p className="text-xl text-gray-500">Trip ID: {tripId}</p>
      </header>

      <div className="bg-white p-12 rounded-[40px] shadow-2xl shadow-blue-100/50 border border-gray-50 flex items-center justify-center text-gray-300 min-h-[400px]">
        <span className="text-lg font-medium italic">Public View coming soon...</span>
      </div>
    </div>
  );
};

export default PublicTripPage;
