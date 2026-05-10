import { Request, Response } from 'express';

export const getAllTrips = async (_req: Request, res: Response): Promise<void> => {
  try {
    // TODO: fetch all trips for user
    res.status(200).json([]);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getTripById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    // TODO: fetch trip by id
    res.status(200).json({ id });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createTrip = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;
    // TODO: create trip in DB
    res.status(201).json({ message: 'Trip created', data });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateTrip = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const data = req.body;
    // TODO: update trip in DB
    res.status(200).json({ message: 'Trip updated', id, data });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteTrip = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    // TODO: delete trip from DB
    res.status(200).json({ message: 'Trip deleted', id });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
