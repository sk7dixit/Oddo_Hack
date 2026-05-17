import api from "./api";

export const getPublicTrip = async (tripId: string) => {
  const response = await api.get(`/public/${tripId}`);
  return response.data;
};
