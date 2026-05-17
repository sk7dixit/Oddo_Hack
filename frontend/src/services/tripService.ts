import api from './api';

export const getTrips = async () => {
  const response = await api.get('/trips');
  return response.data;
};

export const getTripById = async (id: string) => {
  const response = await api.get(`/trips/${id}`);
  return response.data;
};

export const createTrip = async (data: object) => {
  const response = await api.post('/trips', data);
  return response.data;
};

export const updateTrip = async (id: string, data: object) => {
  const response = await api.put(`/trips/${id}`, data);
  return response.data;
};

export const deleteTrip = async (id: string) => {
  const response = await api.delete(`/trips/${id}`);
  return response.data;
};

export const tripService = {
  getTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip
};
