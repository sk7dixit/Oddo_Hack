import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor for auth
apiClient.interceptors.request.use((config) => {
  const userEmail = localStorage.getItem('user_email');
  if (userEmail) {
    config.headers['X-User-Email'] = userEmail;
  }
  return config;
});

export const tripService = {
  getAll: () => apiClient.get('/trips'),
  create: (data: any) => apiClient.post('/trips/create', data),
  getById: (id: string) => apiClient.get(`/trips/${id}`),
};

export const aiService = {
  generateTrip: (prompt: string) => apiClient.post('/ai/generate-trip', { prompt }),
  optimizeBudget: (data: any) => apiClient.post('/ai/optimize-budget', data),
};
