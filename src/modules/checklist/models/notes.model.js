import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
  {
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },
    content: {
      type: String,
      required: [true, "Note content is required"],
      trim: true,
    },
    mood: {
      type: String,
      default: "😊",
    },
    location: {
      type: String,
      default: "Untethered",
    },
    imageUrl: {
      type: String,
    },
    coverUrl: {
      type: String,
    },
    weather: {
      type: String,
      default: "☀️",
    }
  },
  {
    timestamps: true,
  }
);

// Step 6: Model Optimization
notesSchema.index({ tripId: 1 });

export default mongoose.model("Notes", notesSchema);
