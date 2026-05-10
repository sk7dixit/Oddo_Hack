import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import checklistRoutes from "./modules/checklist/routes/checklist.routes.js";
import notesRoutes from "./modules/checklist/routes/notes.routes.js";
import publicRoutes from "./modules/shared/routes/public.routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/checklist", checklistRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/public", publicRoutes);

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Traveloop API is running..." });
});

export default app;
