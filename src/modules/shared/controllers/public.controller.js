import Trip from "../../trip/models/trip.model.js";
import Checklist from "../../checklist/models/checklist.model.js";
import Notes from "../../checklist/models/notes.model.js";

export const getPublicTrip = async (req, res) => {
  try {
    const { tripId } = req.params;

    const trip = await Trip.findById(tripId);

    const checklist = await Checklist.findOne({ tripId });

    const notes = await Notes.find({ tripId });

    res.status(200).json({
      trip,
      checklist,
      notes,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
