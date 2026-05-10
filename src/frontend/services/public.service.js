import api from "./api";

export const getPublicTrip = async (tripId) => {
  return await api.get(`/public/${tripId}`);
};
