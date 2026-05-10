import { Request, Response } from 'express';

export const getBudget = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tripId } = req.params;
    // TODO: fetch budget for tripId
    res.status(200).json({ tripId });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const addExpense = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tripId } = req.params;
    const data = req.body;
    // TODO: add expense to budget
    res.status(201).json({ message: 'Expense added', tripId, data });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const searchActivities = async (req: Request, res: Response): Promise<void> => {
  try {
    const { city } = req.query;
    // TODO: search activities by city
    res.status(200).json({ city, activities: [] });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
