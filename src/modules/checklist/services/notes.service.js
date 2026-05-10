import mongoose from "mongoose";
import Notes from "../models/notes.model.js";
import { demoNotes } from "../../../utils/demoData.js";

let inMemoryNotes = [];

export const createNoteService = async (data) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const newNote = { ...data, _id: Date.now().toString(), createdAt: new Date() };
      inMemoryNotes.push(newNote);
      return newNote;
    }
    return await Notes.create(data);
  } catch (err) {
    const newNote = { ...data, _id: Date.now().toString(), createdAt: new Date() };
    inMemoryNotes.push(newNote);
    return newNote;
  }
};

export const getNotesService = async (tripId) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return [...inMemoryNotes, ...demoNotes];
    }
    const notes = await Notes.find({ tripId }).sort({ createdAt: -1 });
    return notes.length > 0 ? notes : demoNotes;
  } catch (err) {
    return [...inMemoryNotes, ...demoNotes];
  }
};
