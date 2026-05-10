import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import checklistRoutes from "./modules/checklist/routes/checklist.routes.js";
import notesRoutes from "./modules/checklist/routes/notes.routes.js";
import publicRoutes from "./modules/shared/routes/public.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/checklist", checklistRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/public", publicRoutes);

app.get("/", (req, res) => {
  res.send("Traveloop API is running...");
});

export default app;
