import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';

interface User {
  name: string;
  email: string;
  image: string;
  mobileNumber?: string;
  profileCompleted: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (userData: Omit<User, 'profileCompleted'>, isNewUser?: boolean) => void;
  logout: () => void;
  completeProfile: (details: { mobileNumber: string; name: string }) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const authStore = useAuthStore();

  useEffect(() => {
    const savedUser = localStorage.getItem('traveloop_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      
      // Also ensure authStore is synced if it's currently empty
      if (!authStore.user) {
        authStore.setUser({
          id: parsedUser.email,
          name: parsedUser.name,
          email: parsedUser.email,
          avatar: parsedUser.image,
          travelStyle: 'Voyage Explorer',
          level: 1,
          bio: 'Restored session user.',
          preferences: {
            adventure: true,
            luxury: false,
            culture: true,
            nature: true,
            nightlife: false,
            cinematic: true,
            pace: 'balanced',
            budget: 'standard'
          },
          stats: {
            countries: 0,
            trips: 0,
            memories: 0
          },
          aiStatus: {
            isSyncActive: true,
            isMemoryEnabled: true,
            collaborativeMode: true
          }
        });
      }
    }
    setIsLoading(false);
  }, [authStore]);

  const login = (userData: Omit<User, 'profileCompleted'>, isNewUser: boolean = false) => {
    const newUser = { ...userData, profileCompleted: !isNewUser };
    setUser(newUser);
    localStorage.setItem('traveloop_user', JSON.stringify(newUser));
    
    // Sync with authStore for premium features
    authStore.setUser({
      id: userData.email,
      name: userData.name,
      email: userData.email,
      avatar: userData.image,
      travelStyle: 'Voyage Explorer',
      level: 1,
      bio: 'New traveler on TraveLoop.',
      preferences: {
        adventure: true,
        luxury: false,
        culture: true,
        nature: true,
        nightlife: false,
        cinematic: true,
        pace: 'balanced',
        budget: 'standard'
      },
      stats: {
        countries: 0,
        trips: 0,
        memories: 0
      },
      aiStatus: {
        isSyncActive: true,
        isMemoryEnabled: true,
        collaborativeMode: true
      }
    });
  };

  const completeProfile = (details: { mobileNumber: string; name: string }) => {
    if (user) {
      const updatedUser = { ...user, ...details, profileCompleted: true };
      setUser(updatedUser);
      localStorage.setItem('traveloop_user', JSON.stringify(updatedUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('traveloop_user');
    localStorage.removeItem('adminToken');
    authStore.logout();
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, completeProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
