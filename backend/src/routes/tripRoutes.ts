import { Router } from 'express';
import { tripController } from '../controllers/tripController.js';

const router = Router();

// GET /api/trips
router.get('/', tripController.getAllTrips);

// GET /api/trips/:id
router.get('/:id', tripController.getTripById);

// POST /api/trips
router.post('/', tripController.createTrip);

// PUT /api/trips/:id
router.put('/:id', tripController.updateTrip);

// DELETE /api/trips/:id
router.delete('/:id', tripController.deleteTrip);

export default router;
