import axios from 'axios';

const API_URL = '/api/checklist';

export const getChecklist = async (tripId: string) => {
  const response = await axios.get(`${API_URL}/${tripId}`);
  return response.data;
};

export const addChecklistItem = async (tripId: string, item: string) => {
  const response = await axios.post(`${API_URL}/${tripId}`, { item });
  return response.data;
};

export const toggleChecklistItem = async (tripId: string, itemId: string) => {
  const response = await axios.patch(`${API_URL}/${tripId}/items/${itemId}/toggle`);
  return response.data;
};

export const deleteChecklistItem = async (tripId: string, itemId: string) => {
  const response = await axios.delete(`${API_URL}/${tripId}/items/${itemId}`);
  return response.data;
};
