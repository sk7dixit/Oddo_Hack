import api from "./api";

export const getChecklist = async (tripId: string) => {
  const response = await api.get(`/checklist/${tripId}`);
  return response.data;
};

export const createChecklist = async (data: any) => {
  const response = await api.post("/checklist", data);
  return response.data;
};

export const updateChecklist = async (id: string, data: any) => {
  const response = await api.put(`/checklist/${id}`, data);
  return response.data;
};

export const addChecklistItem = async (tripId: string, item: string) => {
  const response = await api.post(`/checklist/${tripId}`, { item });
  return response.data;
};

export const toggleChecklistItem = async (tripId: string, itemId: string) => {
  const response = await api.patch(`/checklist/${tripId}/items/${itemId}/toggle`);
  return response.data;
};

export const deleteChecklistItem = async (tripId: string, itemId: string) => {
  const response = await api.delete(`/checklist/${tripId}/items/${itemId}`);
  return response.data;
};
