import { create } from 'zustand';

export type JourneyEvent = {
  id: string;
  type: "flight" | "hotel" | "activity";
  title: string;
  date: string;
  time: string;
  location: string;
  completed: boolean;
  icon?: string;
  details?: {
    confirmation?: string;
    gate?: string;
    seat?: string;
    address?: string;
    description?: string;
  };
};

export type TravelInsight = {
  id: string;
  label: string;
  value: string;
  subValue?: string;
  trend?: "up" | "down" | "stable";
  type: "alert" | "info" | "success" | "warning";
  category: "budget" | "weather" | "logistics" | "ai";
};

export type BudgetCategory = {
  name: string;
  spent: number;
  total: number;
  color: string;
};

export type MemoryItem = {
  id: string;
  type: "visa" | "hotel" | "flight" | "memory" | "system";
  title: string;
  timestamp: string;
  image?: string;
  location?: string;
  status?: "approved" | "confirmed" | "pending" | "alert";
};

interface TravelState {
  events: JourneyEvent[];
  insights: TravelInsight[];
  budget: {
    total: number;
    spent: number;
    categories: BudgetCategory[];
    aiInsight: string;
  };
  memories: MemoryItem[];
  activeJourneyId: string | null;
  setEvents: (events: JourneyEvent[]) => void;
  setInsights: (insights: TravelInsight[]) => void;
  updateEvent: (id: string, updates: Partial<JourneyEvent>) => void;
}

export const useTravelStore = create<TravelState>((set) => ({
  events: [
    {
      id: '1',
      type: 'flight',
      title: 'Flight to Dubai',
      date: 'May 12',
      time: '10:00 AM',
      location: 'DXB Terminal 3',
      completed: false,
      details: {
        confirmation: 'EK-2024',
        gate: 'B12',
        seat: '14A',
        description: 'Emirates Flight A380 - Non-stop'
      }
    },
    {
      id: '2',
      type: 'hotel',
      title: 'Burj Al Arab Check-in',
      date: 'May 12',
      time: '02:30 PM',
      location: 'Jumeirah Beach',
      completed: false,
      details: {
        confirmation: 'RES-778',
        address: 'Jumeirah St, Dubai, UAE',
        description: 'Luxury Suite with Ocean View'
      }
    },
    {
      id: '3',
      type: 'activity',
      title: 'Desert Safari',
      date: 'May 13',
      time: '04:00 PM',
      location: 'Dubai Desert Conservation Reserve',
      completed: false,
      details: {
        description: 'Sunset dune bashing followed by traditional dinner.'
      }
    },
    {
      id: '4',
      type: 'activity',
      title: 'Burj Khalifa Visit',
      date: 'May 14',
      time: '11:00 AM',
      location: 'Downtown Dubai',
      completed: false,
    }
  ],
  insights: [
    {
      id: 'in-1',
      label: 'Next Flight',
      value: '2 Days Left',
      subValue: 'Boarding starts at 09:00 AM',
      type: 'info',
      category: 'logistics'
    },
    {
      id: 'in-2',
      label: 'Budget Health',
      value: 'On Track',
      subValue: '72% remaining',
      trend: 'stable',
      type: 'success',
      category: 'budget'
    },
    {
      id: 'in-3',
      label: 'Weather Alert',
      value: 'Rain Expected',
      subValue: 'Dubai on May 15',
      type: 'warning',
      category: 'weather'
    },
    {
      id: 'in-4',
      label: 'AI Suggestion',
      value: 'Optimize Itinerary',
      subValue: 'Save 2h in transit',
      type: 'alert',
      category: 'ai'
    }
  ],
  budget: {
    total: 5000,
    spent: 3000,
    aiInsight: "You are spending 18% less than average Dubai travelers this season. AI suggests allocating $400 for local experiences.",
    categories: [
      { name: 'Transport', spent: 1200, total: 2000, color: '#3b82f6' },
      { name: 'Hotels', spent: 800, total: 1500, color: '#10b981' },
      { name: 'Food', spent: 600, total: 1000, color: '#f59e0b' },
      { name: 'Activities', spent: 400, total: 500, color: '#06b6d4' },
    ]
  },
  memories: [
    { 
      id: 'm-1', 
      type: 'visa', 
      title: 'Dubai Visa Approved', 
      timestamp: '2h ago', 
      status: 'approved' 
    },
    { 
      id: 'm-2', 
      type: 'hotel', 
      title: 'Burj Al Arab Confirmed', 
      timestamp: 'Yesterday', 
      status: 'confirmed',
      image: '/assets/modules/hotel-preview.png'
    },
    { 
      id: 'm-3', 
      type: 'flight', 
      title: 'Flight EK-202 Rescheduled', 
      timestamp: 'Today', 
      status: 'alert' 
    },
    { 
      id: 'm-4', 
      type: 'memory', 
      title: 'AI Dream: Desert Sunset', 
      timestamp: '3d ago',
      image: '/assets/modules/desert-memory.png'
    },
  ],
  activeJourneyId: 'journey-1',
  setEvents: (events) => set({ events }),
  setInsights: (insights) => set({ insights }),
  updateEvent: (id, updates) => set((state) => ({
    events: state.events.map(e => e.id === id ? { ...e, ...updates } : e)
  })),
}));
