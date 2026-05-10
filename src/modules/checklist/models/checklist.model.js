import mongoose from "mongoose";

const checklistItemSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    packed: {
      type: Boolean,
      default: false,
    },
  },
  { _id: true }
);

const checklistSchema = new mongoose.Schema(
  {
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },

    items: [checklistItemSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Checklist", checklistSchema);
