import express from "express";
import { adminLogin, getDashboardStats, getAllUsers, deleteUser, getAllTrips, deleteTrip, getAnalyticsData, getAdminProfile, updateAdminProfile } from "../controllers/adminController";
import { verifyAdmin } from "../middleware/adminMiddleware";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/stats", verifyAdmin, getDashboardStats);
router.get("/users", verifyAdmin, getAllUsers);
router.delete("/users/:id", verifyAdmin, deleteUser);
router.get("/trips", verifyAdmin, getAllTrips);
router.delete("/trips/:id", verifyAdmin, deleteTrip);
router.get("/analytics", verifyAdmin, getAnalyticsData);
router.get("/profile", verifyAdmin, getAdminProfile);
router.put("/profile", verifyAdmin, updateAdminProfile);

export default router;
