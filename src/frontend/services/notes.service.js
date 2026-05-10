import api from "./api";

export const getNotes = async (tripId) => {
  return await api.get(`/notes/${tripId}`);
};

export const createNote = async (data) => {
  return await api.post("/notes", data);
};
