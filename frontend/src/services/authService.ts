import axios from 'axios';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Sync user with backend database
 */
export const syncUserWithDatabase = async (user: any) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/sync-user`,
      {
        email: user.email,
        name: user.name,
        profileImage: user.image,
        mobileNumber: user.mobileNumber
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error syncing user:', error);
    throw error;
  }
};

/**
 * A custom hook to ensure the user is synced after profile completion.
 */
export const useSyncUser = () => {
  const { user } = useAuth();

  useEffect(() => {
    const syncUser = async () => {
      if (user && user.profileCompleted) {
        try {
          await syncUserWithDatabase(user);
        } catch (error) {
          console.error("Failed to sync user", error);
        }
      }
    };
    syncUser();
  }, [user]);
};
