import mongoose from "mongoose";

const validateObjectId = (req, res, next) => {
  const { tripId, id } = req.params;
  const value = tripId || id;

  if (value && !mongoose.Types.ObjectId.isValid(value)) {
    return res.status(400).json({
      success: false,
      message: "Invalid ObjectId",
    });
  }

  next();
};

export default validateObjectId;
