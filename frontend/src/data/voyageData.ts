export const voyageData = {
  quickPrompts: [
    { label: 'Plan My Trip', icon: 'Plane', text: 'Plan a 5-day Japan trip focusing on culture and food.' },
    { label: 'Optimize Budget', icon: 'Wallet', text: 'Optimize my trip budget for luxury experiences under 2L.' },
    { label: 'Rainy Day Plan', icon: 'CloudRain', text: 'What are the best indoor activities in Tokyo for a rainy day?' },
    { label: 'Hidden Food Spots', icon: 'Utensils', text: 'Suggest some underrated ramen spots in Shinjuku.' },
    { label: 'Packing Help', icon: 'Briefcase', text: 'What should I pack for a 2-week winter trip to Hokkaido?' }
  ],
  responses: {
    'Japan Plan': {
      title: '5-Day Cultural Expedition',
      summary: 'A curated route through Tokyo and Kyoto, optimized for travel time and local authenticity.',
      itinerary: [
        { day: 1, activity: 'Arrive in Tokyo, explore Shinjuku neon nights.', type: 'Culture', duration: '4h', cost: '₹2,500' },
        { day: 2, activity: 'Morning at Meiji Shrine, afternoon in Harajuku.', type: 'Sights', duration: '6h', cost: '₹1,200' },
        { day: 3, activity: 'Bullet train to Kyoto, check into Ryokan.', type: 'Travel', duration: '3h', cost: '₹12,000' },
        { day: 4, activity: 'Gion District walk and Tea Ceremony.', type: 'Experience', duration: '5h', cost: '₹4,500' },
        { day: 5, activity: 'Fushimi Inari Shrine and return to Tokyo.', type: 'Sights', duration: '7h', cost: '₹2,000' }
      ],
      budgetAnalysis: {
        total: '₹1,45,000',
        savings: '₹12,500',
        insight: 'Switching to a JR Pass will save you ₹8,500 on inter-city travel.'
      },
      weatherAlert: {
        condition: 'Cloudy',
        suggestion: 'Rain expected on Day 4. I have moved the Tea Ceremony indoors.'
      }
    }
  },
  discovery: [
    { name: 'Omoide Yokocho', rating: 4.8, vibe: 'Traditional', cost: 'Budget', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf' },
    { name: 'Gion Tea House', rating: 4.9, vibe: 'Authentic', cost: 'Premium', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e' },
    { name: 'Shibuya Sky', rating: 4.7, vibe: 'Modern', cost: 'Medium', image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26' }
  ]
};
