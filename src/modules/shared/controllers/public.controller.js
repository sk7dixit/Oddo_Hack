import { getPublicTripService } from "../services/public.service.js";

export const getPublicTrip = async (req, res) => {
  try {
    const data = await getPublicTripService(req.params.tripId);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
