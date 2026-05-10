export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'superadmin';
  avatar?: string;
}

export interface AuthResponse {
  token: string;
  user: AdminUser;
}

export interface DashboardStats {
  totalUsers: number;
  totalTrips: number;
  activeUsers: number;
  publicTrips: number;
}

export interface UserSummary {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'banned' | 'pending';
  joinedAt: string;
}

export interface TripSummary {
  id: string;
  title: string;
  userName: string;
  city: string;
  status: 'public' | 'private';
  createdAt: string;
}
