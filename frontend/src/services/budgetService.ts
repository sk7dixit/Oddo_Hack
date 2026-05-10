import axios from 'axios';

const API_URL = '/api/budget';

export const getBudget = async (tripId: string) => {
  const response = await axios.get(`${API_URL}/${tripId}`);
  return response.data;
};

export const addExpense = async (tripId: string, data: object) => {
  const response = await axios.post(`${API_URL}/${tripId}/expenses`, data);
  return response.data;
};

export const searchActivities = async (city: string) => {
  const response = await axios.get(`${API_URL}/activities?city=${city}`);
  return response.data;
};
