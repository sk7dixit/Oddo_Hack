import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    destinations: [String],
    startDate: Date,
    endDate: Date,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Trip", tripSchema);
