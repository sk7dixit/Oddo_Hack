import { Request, Response } from 'express';

export const getNotes = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tripId } = req.params;
    // TODO: fetch notes for tripId
    res.status(200).json({ tripId, notes: [] });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tripId } = req.params;
    const data = req.body;
    // TODO: create note
    res.status(201).json({ message: 'Note created', tripId, data });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tripId, noteId } = req.params;
    const data = req.body;
    // TODO: update note
    res.status(200).json({ message: 'Note updated', tripId, noteId, data });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tripId, noteId } = req.params;
    // TODO: delete note
    res.status(200).json({ message: 'Note deleted', tripId, noteId });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
