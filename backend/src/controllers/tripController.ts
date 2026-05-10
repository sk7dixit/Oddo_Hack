import type { Request, Response } from 'express';
import { tripService } from '../services/tripService.js';
import prisma from '../config/prisma.js';

// Helper to get userId (in real app, this comes from auth middleware)
const MOCK_USER_ID = 'u1'; 

const ensureMockUser = async () => {
  const user = await prisma.user.findUnique({ where: { id: MOCK_USER_ID } });
  if (!user) {
    await prisma.user.create({
      data: {
        id: MOCK_USER_ID,
        email: 'explorer.pro@traveloop.com',
        name: 'Explorer Pro',
      }
    });
  }
};

export const tripController = {
  getAllTrips: async (req: Request, res: Response) => {
    try {
      await ensureMockUser();
      const trips = await tripService.getAllTrips(MOCK_USER_ID);
      res.status(200).json(trips);
    } catch (error: any) {
      console.log("DATABASE ERROR:", error);
      console.error("Trip Fetch Error:", error);
      res.status(500).json({ error: 'Failed to fetch trips' });
    }
  },

  getTripById: async (req: Request<{ id: string }>, res: Response) => {
    try {
      await ensureMockUser();
      const trip = await tripService.getTripById(req.params.id, MOCK_USER_ID);
      if (!trip) return res.status(404).json({ error: 'Trip not found' });
      res.status(200).json(trip);
    } catch (error) {
      console.error("Trip Details Fetch Error:", error);
      res.status(500).json({ error: 'Failed to fetch trip details' });
    }
  },

  createTrip: async (req: Request, res: Response) => {
    try {
      await ensureMockUser();
      const trip = await tripService.createTrip(MOCK_USER_ID, req.body);
      res.status(201).json(trip);
    } catch (error: any) {
      console.error("Trip Create Error:", error);
      res.status(500).json({ error: 'Failed to create trip' });
    }
  },

  updateTrip: async (req: Request<{ id: string }>, res: Response) => {
    try {
      await ensureMockUser();
      await tripService.updateTrip(req.params.id, MOCK_USER_ID, req.body);
      res.status(200).json({ message: 'Trip updated successfully' });
    } catch (error) {
      console.error("Trip Update Error:", error);
      res.status(500).json({ error: 'Failed to update trip' });
    }
  },

  deleteTrip: async (req: Request<{ id: string }>, res: Response) => {
    try {
      await ensureMockUser();
      await tripService.deleteTrip(req.params.id, MOCK_USER_ID);
      res.status(200).json({ message: 'Trip deleted successfully' });
    } catch (error) {
      console.error("Trip Delete Error:", error);
      res.status(500).json({ error: 'Failed to delete trip' });
    }
  }
};
