import { Router } from 'express';
import { getStats, getAllUsers, getAllTrips, getTopCities } from '../controllers/adminController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.use(protect);

router.get('/stats', getStats);
router.get('/users', getAllUsers);
router.get('/trips', getAllTrips);
router.get('/top-cities', getTopCities);

export default router;
