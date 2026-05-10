import axios from 'axios';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Sync Clerk user with backend database
 */
export const syncUserWithDatabase = async (token: string, user: any) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/sync-user`,
      {
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName || user.firstName || '',
        profileImage: user.imageUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error syncing user:', error);
    throw error;
  }
};

/**
 * A custom hook you can use in your layout or protected route 
 * to ensure the user is synced after login/signup.
 */
export const useSyncUser = () => {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    const syncUser = async () => {
      if (isLoaded && isSignedIn && user) {
        try {
          const token = await getToken();
          if (token) {
            await syncUserWithDatabase(token, user);
          }
        } catch (error) {
          console.error("Failed to sync user", error);
        }
      }
    };
    syncUser();
  }, [isLoaded, isSignedIn, user, getToken]);
};
