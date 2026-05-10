import {
  createChecklistService,
  getChecklistService,
  updateChecklistService,
} from "../services/checklist.service.js";
import asyncHandler from "../../../utils/asyncHandler.js";
import ApiResponse from "../../../utils/ApiResponse.js";
import ApiError from "../../../utils/ApiError.js";

export const createChecklist = asyncHandler(async (req, res) => {
  const checklist = await createChecklistService(req.body);
  res.status(201).json(new ApiResponse(201, checklist, "Checklist created successfully"));
});

export const getChecklist = asyncHandler(async (req, res) => {
  const checklist = await getChecklistService(req.params.tripId);
  if (!checklist) {
    throw new ApiError(404, "Checklist not found for this trip");
  }
  res.status(200).json(new ApiResponse(200, checklist));
});

export const updateChecklist = asyncHandler(async (req, res) => {
  const checklist = await updateChecklistService(req.params.id, req.body);
  if (!checklist) {
    throw new ApiError(404, "Checklist not found");
  }
  res.status(200).json(new ApiResponse(200, checklist, "Checklist updated successfully"));
});
