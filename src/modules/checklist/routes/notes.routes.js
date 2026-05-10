import express from "express";
import {
  createNote,
  getNotes,
} from "../controllers/notes.controller.js";
import validate from "../../../middleware/validate.middleware.js";
import { notesValidation } from "../../../validations/notes.validation.js";
import validateObjectId from "../../../middleware/validateObjectId.js";

const router = express.Router();

router.post("/", validate(notesValidation), createNote);
router.get("/:tripId", validateObjectId, getNotes);

export default router;
