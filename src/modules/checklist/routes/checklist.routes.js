import express from "express";
import {
  createChecklist,
  getChecklist,
  updateChecklist,
} from "../controllers/checklist.controller.js";
import validate from "../../../middleware/validate.middleware.js";
import { checklistValidation } from "../../../validations/checklist.validation.js";
import validateObjectId from "../../../middleware/validateObjectId.js";

const router = express.Router();

router.post("/", validate(checklistValidation), createChecklist);
router.get("/:tripId", validateObjectId, getChecklist);
router.put("/:id", validateObjectId, updateChecklist);

export default router;
