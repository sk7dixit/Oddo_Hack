import { Request, Response } from 'express';

export const getStats = async (_req: Request, res: Response): Promise<void> => {
  try {
    // TODO: aggregate stats (users, trips, etc.)
    res.status(200).json({ totalUsers: 0, totalTrips: 0 });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    // TODO: fetch all users from DB
    res.status(200).json([]);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllTrips = async (_req: Request, res: Response): Promise<void> => {
  try {
    // TODO: fetch all trips from DB
    res.status(200).json([]);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getTopCities = async (_req: Request, res: Response): Promise<void> => {
  try {
    // TODO: aggregate top cities from trips
    res.status(200).json([]);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
