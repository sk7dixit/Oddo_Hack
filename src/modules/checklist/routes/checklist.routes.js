import express from "express";

import {
  createChecklist,
  getChecklist,
  updateChecklist,
} from "../controllers/checklist.controller.js";

const router = express.Router();

router.post("/", createChecklist);

router.get("/:tripId", getChecklist);

router.put("/:id", updateChecklist);

export default router;
