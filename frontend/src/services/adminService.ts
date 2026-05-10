import axios from "axios";
import { 
  MOCK_STATS, 
  MOCK_USERS, 
  MOCK_TRIPS, 
  MOCK_ANALYTICS 
} from "../constants/mockData";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// SET TO TRUE FOR HACKATHON DEMO STABILITY
const USE_MOCKS = true;

const getAuthHeader = () => {
  const token = localStorage.getItem("adminToken");
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const loginAdmin = async (credentials: any) => {
  if (USE_MOCKS) {
    console.log("Mock Login:", credentials);
    return { token: "mock_admin_token_2026", user: { name: "Shashwat Dixit", email: "shashwat@traveloop.com" } };
  }
  const res = await axios.post(`${API_URL}/admin/login`, credentials);
  return res.data;
};

export const getDashboardStats = async () => {
  if (USE_MOCKS) return MOCK_STATS;
  const res = await axios.get(`${API_URL}/admin/stats`, getAuthHeader());
  return res.data;
};

export const getAllUsers = async () => {
  if (USE_MOCKS) return MOCK_USERS;
  const res = await axios.get(`${API_URL}/admin/users`, getAuthHeader());
  return res.data;
};

export const deleteUser = async (id: string) => {
  if (USE_MOCKS) {
    console.log("Mock Delete User:", id);
    return { success: true };
  }
  const res = await axios.delete(`${API_URL}/admin/users/${id}`, getAuthHeader());
  return res.data;
};

export const getAllTrips = async () => {
  if (USE_MOCKS) return MOCK_TRIPS;
  const res = await axios.get(`${API_URL}/admin/trips`, getAuthHeader());
  return res.data;
};

export const deleteTrip = async (id: string) => {
  if (USE_MOCKS) {
    console.log("Mock Delete Trip:", id);
    return { success: true };
  }
  const res = await axios.delete(`${API_URL}/admin/trips/${id}`, getAuthHeader());
  return res.data;
};

export const getAnalyticsData = async () => {
  if (USE_MOCKS) return MOCK_ANALYTICS;
  const res = await axios.get(`${API_URL}/admin/analytics`, getAuthHeader());
  return res.data;
};

export const getAdminProfile = async () => {
  if (USE_MOCKS) return { name: "Shashwat Dixit", email: "shashwat@traveloop.com" };
  const res = await axios.get(`${API_URL}/admin/profile`, getAuthHeader());
  return res.data;
};

export const updateAdminProfile = async (data: { name: string; email: string }) => {
  if (USE_MOCKS) {
    console.log("Mock Update Profile:", data);
    return { success: true };
  }
  const res = await axios.put(`${API_URL}/admin/profile`, data, getAuthHeader());
  return res.data;
};
