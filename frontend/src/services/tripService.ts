import axios from 'axios';

const API_URL = '/api/trips';

export const getAllTrips = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getTripById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createTrip = async (data: object) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const updateTrip = async (id: string, data: object) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteTrip = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
