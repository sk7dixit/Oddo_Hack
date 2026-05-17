import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserPreferences {
  adventure: boolean;
  luxury: boolean;
  culture: boolean;
  nature: boolean;
  nightlife: boolean;
  cinematic: boolean;
  pace: 'relaxed' | 'balanced' | 'fast';
  budget: 'backpacking' | 'standard' | 'luxury';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  travelStyle: string;
  level: number;
  bio: string;
  preferences: UserPreferences;
  stats: {
    countries: number;
    trips: number;
    memories: number;
  };
  aiStatus: {
    isSyncActive: boolean;
    isMemoryEnabled: boolean;
    activeJourney?: string;
    collaborativeMode: boolean;
  };
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  updateProfile: (updates: Partial<User>) => void;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

const DEFAULT_USER: User = {
  id: 'shashwat-001',
  name: 'Shashwat Dixit',
  email: 'shashwat@voyage.ai',
  avatar: '',
  travelStyle: 'Cinematic Strategist',
  level: 18,
  bio: 'Architecting the future of travel through AI intelligence.',
  preferences: {
    adventure: true,
    luxury: true,
    culture: true,
    nature: false,
    nightlife: true,
    cinematic: true,
    pace: 'balanced',
    budget: 'luxury'
  },
  stats: {
    countries: 18,
    trips: 42,
    memories: 256
  },
  aiStatus: {
    isSyncActive: true,
    isMemoryEnabled: true,
    activeJourney: 'Japan Intelligence Tour',
    collaborativeMode: true
  }
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: DEFAULT_USER, // Default to a premium state for the demo
      token: null,
      isAuthenticated: true,
      
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      
      updateProfile: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null
      })),
      
      updatePreferences: (updates) => set((state) => ({
        user: state.user ? { 
          ...state.user, 
          preferences: { ...state.user.preferences, ...updates } 
        } : null
      })),

      setToken: (token) => set({ token }),
      
      logout: () => {
        localStorage.removeItem('user_email');
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'traveloop-auth-v2', // Updated version name for the new structure
    }
  )
);
