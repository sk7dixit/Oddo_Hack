import prisma from '../config/prisma.js';
import type { TripStatus } from '@prisma/client';

export interface CreateTripDTO {
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  status?: TripStatus;
  image?: string;
}

export const tripService = {
  getAllTrips: async (userId: string) => {
    return await prisma.trip.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  },

  getTripById: async (id: string, userId: string) => {
    return await prisma.trip.findFirst({
      where: { id, userId },
      include: { stops: { include: { city: true } } }
    });
  },

  createTrip: async (userId: string, data: CreateTripDTO) => {
    return await prisma.trip.create({
      data: {
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        userId
      }
    });
  },

  updateTrip: async (id: string, userId: string, data: Partial<CreateTripDTO>) => {
    return await prisma.trip.updateMany({
      where: { id, userId },
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
      }
    });
  },

  deleteTrip: async (id: string, userId: string) => {
    return await prisma.trip.deleteMany({
      where: { id, userId }
    });
  }
};
