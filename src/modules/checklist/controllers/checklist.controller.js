import mongoose from "mongoose";
import Checklist from "../models/checklist.model.js";
import {
  createChecklistService,
  updateChecklistService,
} from "../services/checklist.service.js";
import { demoChecklist } from "../../../utils/demoData.js";
import asyncHandler from "../../../utils/asyncHandler.js";
import ApiResponse from "../../../utils/ApiResponse.js";

export const createChecklist = asyncHandler(async (req, res) => {
  const checklist = await createChecklistService(req.body);
  res.status(201).json(new ApiResponse(201, checklist, "Checklist created successfully"));
});

export const getChecklist = async (req, res) => {
  try {
    const { tripId } = req.params;

    // Fallback if DB is not connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json({
        success: true,
        data: { items: demoChecklist },
      });
    }

    const checklist = await Checklist.findOne({ tripId });

    if (!checklist) {
      return res.status(200).json({
        success: true,
        data: { items: demoChecklist },
      });
    }

    res.status(200).json({
      success: true,
      data: checklist,
    });

  } catch (error) {
    console.error("GET CHECKLIST ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch checklist",
    });
  }
};

export const updateChecklist = asyncHandler(async (req, res) => {
  const checklist = await updateChecklistService(req.params.id, req.body);
  if (!checklist) {
    throw new ApiError(404, "Checklist not found");
  }
  res.status(200).json(new ApiResponse(200, checklist, "Checklist updated successfully"));
});
