import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import checklistRoutes from "./modules/checklist/routes/checklist.routes.js";
import notesRoutes from "./modules/checklist/routes/notes.routes.js";
import publicRoutes from "./modules/shared/routes/public.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";

dotenv.config();

const app = express();

// Security & Logging Middleware
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes with Versioning
app.use("/api/v1/checklist", checklistRoutes);
app.use("/api/v1/notes", notesRoutes);
app.use("/api/v1/public", publicRoutes);

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Traveloop API v1 is running..." });
});

// Global Error Handler (MUST BE LAST)
app.use(errorMiddleware);

export default app;
