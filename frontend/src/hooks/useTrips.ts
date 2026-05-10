import { useState, useEffect } from 'react';
import type { Trip, CreateTripInput } from '../types/trip';
import { tripService } from '../services/tripService';

export const useTrips = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const data = await tripService.getTrips();
      setTrips(data);
    } catch (err) {
      setError('Failed to fetch trips. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const addTrip = async (data: CreateTripInput) => {
    try {
      setLoading(true);
      await tripService.createTrip(data);
      await fetchTrips();
    } catch (err) {
      setError('Failed to create trip.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  return { trips, loading, error, addTrip, refresh: fetchTrips };
};
