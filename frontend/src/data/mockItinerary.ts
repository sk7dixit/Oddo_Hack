export const mockItineraryData = {
  tripId: 'mock-id-123',
  title: 'Japan Adventure',
  summary: 'Tokyo → Kyoto → Osaka',
  dates: 'May 10 - May 20',
  progress: 78,
  style: 'Adventure',
  image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1200',
  collaborators: [
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Jack'
  ],
  cities: [
    {
      id: 'city-1',
      name: 'Tokyo',
      dates: 'May 10 - May 14',
      weather: '22°C',
      activitiesCount: 8,
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=400',
      days: [
        {
          id: 'day-1',
          dayNumber: 1,
          date: 'May 10',
          activities: [
            { id: 'act-1', time: '10:00 AM', title: 'Arrival at Narita', location: 'Airport', cost: '₹2,500', tags: ['Transport'], notes: 'Take the Narita Express.' },
            { id: 'act-2', time: '02:00 PM', title: 'Hotel Check-in', location: 'Shinjuku', cost: '₹0', tags: ['Stay'], notes: 'Park Hyatt Tokyo.' },
            { id: 'act-3', time: '06:00 PM', title: 'Shibuya Crossing', location: 'Shibuya', cost: '₹500', tags: ['Nature'], notes: 'Great photo spot.' }
          ]
        },
        {
          id: 'day-2',
          dayNumber: 2,
          date: 'May 11',
          activities: [
            { id: 'act-4', time: '09:00 AM', title: 'Tsukiji Outer Market', location: 'Chuo City', cost: '₹3,000', tags: ['Food'], notes: 'Fresh sushi breakfast.' },
            { id: 'act-5', time: '01:00 PM', title: 'Senso-ji Temple', location: 'Asakusa', cost: '₹0', tags: ['Museums'], notes: 'Historic temple visit.' }
          ]
        }
      ]
    },
    {
      id: 'city-2',
      name: 'Kyoto',
      dates: 'May 15 - May 18',
      weather: '18°C',
      activitiesCount: 5,
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=400',
      days: [
        {
          id: 'day-3',
          dayNumber: 3,
          date: 'May 15',
          activities: [
            { id: 'act-6', time: '11:00 AM', title: 'Fushimi Inari Shrine', location: 'Fushimi Ward', cost: '₹0', tags: ['Nature'], notes: 'Thousands of torii gates.' }
          ]
        }
      ]
    },
    {
      id: 'city-3',
      name: 'Osaka',
      dates: 'May 19 - May 20',
      weather: '20°C',
      activitiesCount: 3,
      image: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&q=80&w=400',
      days: []
    }
  ],
  budget: {
    hotels: '₹45,000',
    food: '₹12,000',
    activities: '₹18,000',
    transport: '₹22,000'
  }
};
