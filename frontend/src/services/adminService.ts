import axios from 'axios';

const API_URL = '/api/admin';

export const getStats = async () => {
  const response = await axios.get(`${API_URL}/stats`);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const getAllTripsAdmin = async () => {
  const response = await axios.get(`${API_URL}/trips`);
  return response.data;
};

export const getTopCities = async () => {
  const response = await axios.get(`${API_URL}/top-cities`);
  return response.data;
};
