import axios from 'axios';

const API_URL = '/api/auth';

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const signup = async (name: string, email: string, password: string) => {
  const response = await axios.post(`${API_URL}/signup`, { name, email, password });
  return response.data;
};

export const logout = async () => {
  const response = await axios.post(`${API_URL}/logout`);
  return response.data;
};

export const getProfile = async () => {
  const response = await axios.get(`${API_URL}/profile`);
  return response.data;
};
