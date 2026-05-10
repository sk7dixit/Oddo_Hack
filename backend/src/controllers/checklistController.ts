import { Request, Response } from 'express';

export const getChecklist = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tripId } = req.params;
    // TODO: fetch checklist for tripId
    res.status(200).json({ tripId, items: [] });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const addChecklistItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tripId } = req.params;
    const { item } = req.body;
    // TODO: add checklist item
    res.status(201).json({ message: 'Item added', tripId, item });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const toggleChecklistItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tripId, itemId } = req.params;
    // TODO: toggle checklist item
    res.status(200).json({ message: 'Item toggled', tripId, itemId });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteChecklistItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tripId, itemId } = req.params;
    // TODO: delete checklist item
    res.status(200).json({ message: 'Item deleted', tripId, itemId });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
