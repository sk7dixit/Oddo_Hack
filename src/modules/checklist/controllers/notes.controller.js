import mongoose from "mongoose";
import Notes from "../models/notes.model.js";
import {
  createNoteService,
} from "../services/notes.service.js";
import { demoNotes } from "../../../utils/demoData.js";
import asyncHandler from "../../../utils/asyncHandler.js";
import ApiResponse from "../../../utils/ApiResponse.js";

export const createNote = asyncHandler(async (req, res) => {
  const { tripId, content, mood, location, imageUrl, coverUrl } = req.body;

  if (!tripId || !content) {
    return res.status(400).json({
      success: false,
      message: "Trip ID and content are required",
    });
  }

  const note = await createNoteService({
    tripId,
    content,
    mood,
    location,
    imageUrl,
    coverUrl
  });

  res.status(201).json(new ApiResponse(201, note, "Note created successfully"));
});

export const getNotes = async (req, res) => {
  try {
    const { tripId } = req.params;

    // Fallback if DB is not connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json({
        success: true,
        data: demoNotes,
      });
    }

    const notes = await Notes.find({ tripId }).sort({ createdAt: -1 });

    if (!notes || notes.length === 0) {
      return res.status(200).json({
        success: true,
        data: demoNotes, // Return demo notes as fallback
      });
    }

    res.status(200).json({
      success: true,
      data: notes,
    });

  } catch (error) {
    console.error("GET NOTES ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch notes",
      error: error.message
    });
  }
};
