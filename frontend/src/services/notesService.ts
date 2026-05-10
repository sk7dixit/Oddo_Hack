import axios from 'axios';

const API_URL = '/api/notes';

export const getNotes = async (tripId: string) => {
  const response = await axios.get(`${API_URL}/${tripId}`);
  return response.data;
};

export const createNote = async (tripId: string, data: object) => {
  const response = await axios.post(`${API_URL}/${tripId}`, data);
  return response.data;
};

export const updateNote = async (tripId: string, noteId: string, data: object) => {
  const response = await axios.put(`${API_URL}/${tripId}/notes/${noteId}`, data);
  return response.data;
};

export const deleteNote = async (tripId: string, noteId: string) => {
  const response = await axios.delete(`${API_URL}/${tripId}/notes/${noteId}`);
  return response.data;
};
