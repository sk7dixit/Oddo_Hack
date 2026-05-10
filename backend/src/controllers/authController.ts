import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { getAuth } from '@clerk/express';

export const syncUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const auth = getAuth(req);
    const clerkId = auth.userId;

    if (!clerkId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const { email, name, profileImage } = req.body;

    if (!email) {
      res.status(400).json({ message: 'Email is required' });
      return;
    }

    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: { clerkId }
    });

    if (!user) {
      // Create new user
      user = await prisma.user.create({
        data: {
          clerkId,
          email,
          name,
          profileImage
        }
      });
      res.status(201).json({ message: 'User created successfully', user });
      return;
    }

    // Optionally update user info if needed
    if (user.email !== email || user.name !== name || user.profileImage !== profileImage) {
      user = await prisma.user.update({
        where: { clerkId },
        data: { email, name, profileImage }
      });
    }

    res.status(200).json({ message: 'User already exists', user });
  } catch (error) {
    console.error('Error syncing user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
