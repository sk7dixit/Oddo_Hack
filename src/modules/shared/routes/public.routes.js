import express from "express";
import { getPublicTrip } from "../controllers/public.controller.js";

const router = express.Router();

router.get("/:tripId", getPublicTrip);

export default router;
