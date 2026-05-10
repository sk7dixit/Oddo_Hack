export interface DashboardStats {
  totalUsers: number;
  totalTrips: number;
  activeUsers: number;
  publicTrips: number;
  activeJournals: number;
  revenue: number;

  monthlyGrowth: {
    month: string;
    users: number;
  }[];

  tripStats: {
    date: string;
    count: number;
  }[];

  topCities: {
    city: string;
    count: number;
  }[];
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface AdminTrip {
  id: string;
  title: string;
  destination: string;
  createdBy: string;
  createdAt: string;
  budget: number;
}

export interface AnalyticsData {
  totalRevenue: number;
  avgTripBudget: number;

  monthlyUsers: {
    month: string;
    users: number;
  }[];

  topDestinations: {
    city: string;
    count: number;
  }[];

  activityData: {
    name: string;
    value: number;
  }[];
}

export interface AdminProfile {
  name: string;
  email: string;
}
