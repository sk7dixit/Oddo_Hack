import express from "express";
import {
  createNote,
  getNotes,
} from "../controllers/notes.controller.js";

const router = express.Router();

router.post("/", createNote);
router.get("/:tripId", getNotes);

export default router;
