import { getPublicTripService } from "../services/public.service.js";
import asyncHandler from "../../../utils/asyncHandler.js";
import ApiResponse from "../../../utils/ApiResponse.js";
import ApiError from "../../../utils/ApiError.js";

export const getPublicTrip = asyncHandler(async (req, res) => {
  const data = await getPublicTripService(req.params.tripId);
  
  if (!data.trip) {
    throw new ApiError(404, "Trip not found");
  }

  res.status(200).json(new ApiResponse(200, data));
});
