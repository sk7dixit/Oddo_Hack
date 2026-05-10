import { 
  Users, 
  Map, 
  Wallet, 
  NotebookPen 
} from "lucide-react";
import type { AdminStats, AdminUser, AdminTrip, AnalyticsData } from "../types/admin";

export const MOCK_STATS: AdminStats = {
  totalUsers: 12540,
  totalTrips: 8420,
  activeTrips: 2150,
  pendingReports: 12,
  monthlyGrowth: [
    { month: "Jan", users: 4500 },
    { month: "Feb", users: 5200 },
    { month: "Mar", users: 6100 },
    { month: "Apr", users: 5800 },
    { month: "May", users: 7200 },
    { month: "Jun", users: 8500 },
  ],
  tripStats: [
    { date: "01/06", count: 120 },
    { date: "02/06", count: 150 },
    { date: "03/06", count: 180 },
    { date: "04/06", count: 140 },
    { date: "05/06", count: 210 },
    { date: "06/06", count: 250 },
  ],
  topCities: [
    { city: "Paris", count: 1200 },
    { city: "Bali", count: 950 },
    { city: "Tokyo", count: 820 },
    { city: "New York", count: 760 },
  ]
};

export const MOCK_USERS: AdminUser[] = [
  { id: "1", name: "Shashwat Dixit", email: "shashwat@traveloop.com", createdAt: "2026-05-10" },
  { id: "2", name: "Ananya Sharma", email: "ananya@gmail.com", createdAt: "2026-05-08" },
  { id: "3", name: "Rohan Verma", email: "rohan@outlook.com", createdAt: "2026-05-05" },
  { id: "4", name: "Sarah Miller", email: "sarah@yahoo.com", createdAt: "2026-05-01" },
  { id: "5", name: "Leon Kennedy", email: "leon@umbrella.com", createdAt: "2026-04-28" },
];

export const MOCK_TRIPS: AdminTrip[] = [
  { id: "1", title: "European Summer Tour", destination: "Paris, France", userName: "Shashwat Dixit", budget: 4500 },
  { id: "2", title: "Bali Zen Retreat", destination: "Ubud, Indonesia", userName: "Ananya Sharma", budget: 2800 },
  { id: "3", title: "Tokyo City Lights", destination: "Tokyo, Japan", userName: "Rohan Verma", budget: 5200 },
  { id: "4", title: "New York Christmas", destination: "New York, USA", userName: "Sarah Miller", budget: 3500 },
  { id: "5", title: "Swiss Alps Hiking", destination: "Zermatt, Switzerland", userName: "Shashwat Dixit", budget: 6100 },
];

export const MOCK_ANALYTICS: AnalyticsData = {
  totalRevenue: 458200,
  avgTripBudget: 3250,
  monthlyUsers: MOCK_STATS.monthlyGrowth,
  topDestinations: MOCK_STATS.topCities,
  activityData: [
    { name: "Trips Created", value: 45 },
    { name: "Photos Shared", value: 30 },
    { name: "Reviews Written", value: 15 },
    { name: "Friends Invited", value: 10 },
  ]
};
