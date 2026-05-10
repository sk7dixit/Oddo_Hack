import { useState, useEffect } from 'react';
import type { UserProfile, UpdateProfileInput } from '../types/user';
import { userService } from '../services/userService';

export const useUser = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await userService.getProfile();
      setUser(data);
    } catch (err) {
      setError('Failed to fetch profile.');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: UpdateProfileInput) => {
    try {
      setLoading(true);
      const updated = await userService.updateProfile(data);
      setUser(updated);
      return updated;
    } catch (err) {
      setError('Failed to update profile.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return { user, loading, error, updateProfile, refresh: fetchProfile };
};
