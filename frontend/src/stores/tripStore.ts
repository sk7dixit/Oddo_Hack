import { create } from 'zustand';

interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: 'planning' | 'ongoing' | 'completed';
}

interface TripState {
  trips: Trip[];
  activeTrip: Trip | null;
  setTrips: (trips: Trip[]) => void;
  setActiveTrip: (trip: Trip | null) => void;
  addTrip: (trip: Trip) => void;
  updateTrip: (id: string, updates: Partial<Trip>) => void;
}

export const useTripStore = create<TripState>((set) => ({
  trips: [],
  activeTrip: null,
  setTrips: (trips) => set({ trips }),
  setActiveTrip: (trip) => set({ activeTrip: trip }),
  addTrip: (trip) => set((state) => ({ trips: [trip, ...state.trips] })),
  updateTrip: (id, updates) => set((state) => ({
    trips: state.trips.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    activeTrip: state.activeTrip?.id === id ? { ...state.activeTrip, ...updates } : state.activeTrip
  })),
}));
