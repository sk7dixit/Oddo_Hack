import api from "./api";

export const getChecklist = async (tripId) => {
  return await api.get(`/checklist/${tripId}`);
};

export const createChecklist = async (data) => {
  return await api.post("/checklist", data);
};

export const updateChecklist = async (id, data) => {
  return await api.put(`/checklist/${id}`, data);
};
