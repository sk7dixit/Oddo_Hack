import mongoose from "mongoose";
import Trip from "../../trip/models/trip.model.js";
import Checklist from "../../checklist/models/checklist.model.js";
import Notes from "../../checklist/models/notes.model.js";
import { demoNotes, demoChecklist } from "../../../utils/demoData.js";

export const getPublicTripService = async (tripId) => {
  // Demo trip data fallback
  const demoTrip = {
    _id: "507f1f77bcf86cd799439011",
    title: "Dream Trip to Italy & Vietnam",
    destinations: ["Positano", "Sapa", "Hanoi"],
    startDate: new Date().toISOString(),
  };

  try {
    if (mongoose.connection.readyState !== 1) {
      return {
        trip: demoTrip,
        checklist: { items: demoChecklist },
        notes: demoNotes,
      };
    }

    const trip = await Trip.findById(tripId);
    
    if (!trip) {
      // If it's our demo ID, return demo data
      if (tripId === "507f1f77bcf86cd799439011") {
        return {
          trip: demoTrip,
          checklist: { items: demoChecklist },
          notes: demoNotes,
        };
      }
      return { trip: null };
    }

    const checklist = await Checklist.findOne({ tripId });
    const notes = await Notes.find({ tripId }).sort({ createdAt: -1 });

    return {
      trip,
      checklist,
      notes,
    };
  } catch (error) {
    console.error("Public Service Error:", error);
    // On any error (like CastError), return demo data if it's our test ID
    if (tripId === "507f1f77bcf86cd799439011") {
      return {
        trip: demoTrip,
        checklist: { items: demoChecklist },
        notes: demoNotes,
      };
    }
    return { trip: null };
  }
};
