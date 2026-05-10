import mongoose from "mongoose";

const checklistItemSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Checklist item text is required"],
      trim: true,
    },
    packed: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: true,
  }
);

const checklistSchema = new mongoose.Schema(
  {
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },
    items: {
      type: [checklistItemSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Step 6: Model Optimization
checklistSchema.index({ tripId: 1 });

export default mongoose.model("Checklist", checklistSchema);
