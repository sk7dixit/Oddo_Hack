import Trip from "../../trip/models/trip.model.js";
import Checklist from "../../checklist/models/checklist.model.js";
import Notes from "../../checklist/models/notes.model.js";

export const getPublicTripService = async (tripId) => {
  const trip = await Trip.findById(tripId);
  const checklist = await Checklist.findOne({ tripId });
  const notes = await Notes.find({ tripId });

  return {
    trip,
    checklist,
    notes,
  };
};
