import mongoose from "mongoose";
import dotenv from "dotenv";
import Checklist from "./src/modules/checklist/models/checklist.model.js";
import Notes from "./src/modules/checklist/models/notes.model.js";

dotenv.config();

const test = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for Testing");

    // Clear previous test data
    await Checklist.deleteMany({ tripId: "507f1f77bcf86cd799439011" });
    await Notes.deleteMany({ tripId: "507f1f77bcf86cd799439011" });

    // Test Checklist Creation
    const checklist = await Checklist.create({
      tripId: "507f1f77bcf86cd799439011",
      items: [
        { text: "Passport", packed: false },
        { text: "Camera", packed: true }
      ]
    });
    console.log("✅ Checklist Created:", checklist);

    // Test Notes Creation
    const note = await Notes.create({
      tripId: "507f1f77bcf86cd799439011",
      content: "Don't forget to visit the Eiffel Tower at sunset!"
    });
    console.log("✅ Note Created:", note);

    // Test Validation (should fail)
    try {
      await Checklist.create({ items: [] });
      console.log("❌ Validation failed: Created checklist without tripId");
    } catch (err) {
      console.log("✅ Validation worked: Caught missing tripId in Checklist");
    }

    try {
      await Notes.create({ tripId: "507f1f77bcf86cd799439011" });
      console.log("❌ Validation failed: Created note without content");
    } catch (err) {
      console.log("✅ Validation worked: Caught missing content in Notes");
    }

    await mongoose.connection.close();
    console.log("Testing Complete.");
    process.exit(0);
  } catch (error) {
    console.error("Test failed:", error.message);
    process.exit(1);
  }
};

test();
