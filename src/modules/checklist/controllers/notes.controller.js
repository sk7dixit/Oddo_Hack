import Notes from "../models/notes.model.js";

export const createNote = async (req, res) => {
  try {
    const note = await Notes.create(req.body);

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNotes = async (req, res) => {
  try {
    const notes = await Notes.find({
      tripId: req.params.tripId,
    });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
