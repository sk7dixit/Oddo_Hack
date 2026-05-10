import express from "express";
import { getPublicTrip } from "../controllers/public.controller.js";
import validateObjectId from "../../../middleware/validateObjectId.js";

const router = express.Router();

router.get("/:tripId", validateObjectId, getPublicTrip);

export default router;
