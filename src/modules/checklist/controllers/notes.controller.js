import {
  createNoteService,
  getNotesService,
} from "../services/notes.service.js";

export const createNote = async (req, res) => {
  try {
    const note = await createNoteService(req.body);

    res.status(201).json({
      success: true,
      data: note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getNotes = async (req, res) => {
  try {
    const notes = await getNotesService(req.params.tripId);

    res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
