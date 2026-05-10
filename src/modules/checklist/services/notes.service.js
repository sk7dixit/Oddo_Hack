import Notes from "../models/notes.model.js";

export const createNoteService = async (data) => {
  return await Notes.create(data);
};

export const getNotesService = async (tripId) => {
  return await Notes.find({ tripId });
};
