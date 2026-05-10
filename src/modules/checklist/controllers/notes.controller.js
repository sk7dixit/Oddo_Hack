import {
  createNoteService,
  getNotesService,
} from "../services/notes.service.js";
import asyncHandler from "../../../utils/asyncHandler.js";
import ApiResponse from "../../../utils/ApiResponse.js";

export const createNote = asyncHandler(async (req, res) => {
  const note = await createNoteService(req.body);
  res.status(201).json(new ApiResponse(201, note, "Note created successfully"));
});

export const getNotes = asyncHandler(async (req, res) => {
  const notes = await getNotesService(req.params.tripId);
  res.status(200).json(new ApiResponse(200, notes));
});
