import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

// Response interceptor for clean data handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || "Something went wrong";
    return Promise.reject(message);
  }
);

export default api;
