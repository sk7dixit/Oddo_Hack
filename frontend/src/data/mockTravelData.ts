export const mockJourneys = [
  {
    id: '1',
    title: 'Japan Explorer',
    location: 'Tokyo & Kyoto, Japan',
    dates: 'May 24 - Jun 2',
    progress: 78,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800',
    budget: '$3,200',
    collaborators: ['https://api.dicebear.com/7.x/avataaars/svg?seed=Felix', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka'],
  },
  {
    id: '2',
    title: 'Swiss Escape',
    location: 'Zermatt, Switzerland',
    dates: 'Jul 15 - Jul 22',
    progress: 45,
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=800',
    budget: '$4,500',
    collaborators: ['https://api.dicebear.com/7.x/avataaars/svg?seed=Jack'],
  },
  {
    id: '3',
    title: 'Bali Retreat',
    location: 'Ubud, Indonesia',
    dates: 'Aug 10 - Aug 20',
    progress: 20,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800',
    budget: '$1,800',
    collaborators: ['https://api.dicebear.com/7.x/avataaars/svg?seed=Lily'],
  },
  {
    id: '4',
    title: 'Dubai Weekend',
    location: 'Dubai, UAE',
    dates: 'Sep 05 - Sep 08',
    progress: 10,
    image: 'https://images.unsplash.com/photo-1512453979798-5eaad0df3b03?auto=format&fit=crop&q=80&w=800',
    budget: '$2,100',
    collaborators: ['https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'],
  },
];

export const mockDestinations = [
  {
    name: 'Santorini',
    country: 'Greece',
    weather: '28°C',
    budget: '$150/day',
    tags: ['Luxury', 'Romance'],
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Iceland',
    country: 'Nordic',
    weather: '12°C',
    budget: '$200/day',
    tags: ['Adventure', 'Nature'],
    image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Swiss Alps',
    country: 'Switzerland',
    weather: '15°C',
    budget: '$180/day',
    tags: ['Skiing', 'Hiking'],
    image: 'https://images.unsplash.com/photo-1531310197839-ccf54634509e?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Amalfi Coast',
    country: 'Italy',
    weather: '26°C',
    budget: '$160/day',
    tags: ['Coastal', 'Food'],
    image: 'https://images.unsplash.com/photo-1533903345306-15d1c30952de?auto=format&fit=crop&q=80&w=400',
  },
];

export const mockStats = [
  { label: 'Countries Visited', value: '12', icon: 'Globe' },
  { label: 'Active Journeys', value: '4', icon: 'Plane' },
  { label: 'Saved Places', value: '128', icon: 'Map' },
  { label: 'Travel Points', value: '4,250', icon: 'Sparkles' },
];

export const mockTimeline = [
  { date: 'May 12', activity: 'Flight to Dubai', time: '10:00 AM' },
  { date: 'May 13', activity: 'Burj Khalifa Visit', time: '02:30 PM' },
  { date: 'May 15', activity: 'Desert Safari', time: '04:00 PM' },
];

export const mockNotes = [
  { title: 'Passport Copies', content: 'Need digital and physical copies for Dubai.', date: '2 days ago' },
  { title: 'Paris Hotel', content: 'Compare prices between Marriott and Airbnb.', date: '3 days ago' },
  { title: 'Visa Appointment', content: 'Monday at 10:00 AM. Bring all docs.', date: 'Today' },
];

export const mockBudget = [
  { category: 'Transport', spent: 1200, total: 2000, color: 'bg-blue-500' },
  { category: 'Hotels', spent: 800, total: 1500, color: 'bg-cyan-400' },
  { category: 'Food', spent: 400, total: 800, color: 'bg-emerald-400' },
  { category: 'Activities', spent: 600, total: 1000, color: 'bg-indigo-400' },
];
