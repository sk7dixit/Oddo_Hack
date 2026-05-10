import api from './api';
import type { Trip, CreateTripInput } from '../types/trip';

export const tripService = {
  getTrips: async (): Promise<Trip[]> => {
    const response = await api.get('/trips');
    return response.data;
  },

  getTripById: async (id: string): Promise<Trip> => {
    const response = await api.get(`/trips/${id}`);
    return response.data;
  },

  createTrip: async (data: CreateTripInput): Promise<Trip> => {
    const response = await api.post('/trips', data);
    return response.data;
  },

  updateTrip: async (id: string, data: Partial<CreateTripInput>): Promise<void> => {
    await api.put(`/trips/${id}`, data);
  },

  deleteTrip: async (id: string): Promise<void> => {
    await api.delete(`/trips/${id}`);
  }
};
