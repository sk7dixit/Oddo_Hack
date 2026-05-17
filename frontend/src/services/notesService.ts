import api from "./api";

export const getNotes = async (tripId: string) => {
  const response = await api.get(`/notes/${tripId}`);
  return response.data;
};

export const createNote = async (data: any) => {
  const response = await api.post("/notes", data);
  return response.data;
};

export const updateNote = async (tripId: string, noteId: string, data: any) => {
  const response = await api.put(`/notes/${tripId}/notes/${noteId}`, data);
  return response.data;
};

export const deleteNote = async (tripId: string, noteId: string) => {
  const response = await api.delete(`/notes/${tripId}/notes/${noteId}`);
  return response.data;
};
