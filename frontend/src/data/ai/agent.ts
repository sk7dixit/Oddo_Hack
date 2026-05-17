export const mockGroupData = {
  tripName: "Japan Spring 2026",
  members: [
    { name: "Aman", style: "Luxury", avatar: "A" },
    { name: "Ravi", style: "Adventure", avatar: "R" },
    { name: "Priya", style: "Cultural", avatar: "P" },
    { name: "Sarah", style: "Backpacker", avatar: "S" }
  ],
  votes: {
    Japan: 3,
    Italy: 1,
    Bali: 0
  }
};

export const liveConditions: Record<string, any> = {
  Japan: {
    temp: "18°C",
    weather: "Light Rain",
    crowds: "High (Cherry Blossom Peak)",
    events: ["Kyoto Cherry Blossom Festival", "Sumo Tournament (Osaka)"],
    status: "rainy"
  },
  Italy: {
    temp: "22°C",
    weather: "Sunny",
    crowds: "Moderate",
    events: ["Venice Biennale", "Fashion Week Milan"],
    status: "sunny"
  }
};

export const agentInsights = [
  { id: 'fatigue', title: 'Fatigue Optimization', desc: 'Identified 3 consecutive high-intensity days. Suggested a rest day on Day 4.' },
  { id: 'weather', title: 'Rainy Day Backup', desc: 'Detected rain in Kyoto. Swapped outdoor shrines for Museum & Tea House route.' },
  { id: 'budget', title: 'Price Opportunity', desc: 'Hotel prices in Osaka dropped by 15% for your selected dates.' }
];
