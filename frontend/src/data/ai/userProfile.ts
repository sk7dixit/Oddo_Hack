export interface UserProfile {
  id: string;
  name: string;
  role: 'Guest' | 'Explorer' | 'Voyage Elite';
  travelStyle: string;
  level: number;
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
  avatar?: string;
  initials: string;
}

export const mockUser: UserProfile = {
  id: 'aman-001',
  name: 'Aman Dixit',
  role: 'Voyage Elite',
  travelStyle: 'Adventure Strategist',
  level: 12,
  stats: {
    countries: 14,
    trips: 32,
    memories: 156
  },
  aiStatus: {
    isSyncActive: true,
    isMemoryEnabled: true,
    activeJourney: 'Japan Spring 2026',
    collaborativeMode: true
  },
  initials: 'AD'
};

export const guestUser: UserProfile = {
  id: 'guest',
  name: 'Guest',
  role: 'Guest',
  travelStyle: 'New Explorer',
  level: 1,
  stats: {
    countries: 0,
    trips: 0,
    memories: 0
  },
  aiStatus: {
    isSyncActive: false,
    isMemoryEnabled: false,
    collaborativeMode: false
  },
  initials: 'G'
};
