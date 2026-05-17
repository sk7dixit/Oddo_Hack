export const financeIntelligence = {
  summary: {
    trip: "Japan Journey 2026",
    planned: 180000,
    spent: 78000,
    remaining: 102000,
    utilized: 43,
    currency: "INR",
    daysLeft: 12
  },
  categories: [
    { name: "Flights", amount: 45000, percentage: 25, icon: "Plane", color: "#22d3ee" },
    { name: "Hotels", amount: 42000, percentage: 23, icon: "Hotel", color: "#818cf8" },
    { name: "Food", amount: 15000, percentage: 8, icon: "Utensils", color: "#fbbf24" },
    { name: "Activities", amount: 25000, percentage: 14, icon: "Ticket", color: "#f472b6" },
    { name: "Transport", amount: 12000, percentage: 7, icon: "TrainFront", color: "#34d399" },
    { name: "Shopping", amount: 8000, percentage: 4, icon: "ShoppingBag", color: "#a78bfa" }
  ],
  timeline: [
    { day: 1, city: "Tokyo", amount: 12000, mood: "Exciting", highlight: "Arrival & Sushi Dinner", type: "Food" },
    { day: 2, city: "Tokyo", amount: 8500, mood: "Vibrant", highlight: "Shibuya Crossing & Harajuku", type: "City" },
    { day: 3, city: "Tokyo", amount: 15000, mood: "High Energy", highlight: "TeamLab & Shinjuku Night", type: "Activity" },
    { day: 4, city: "Hakone", amount: 7200, mood: "Calm", highlight: "Onsen & Lake Ashi", type: "Nature" },
    { day: 5, city: "Kyoto", amount: 9800, mood: "Spiritual", highlight: "Kinkaku-ji & Tea Ceremony", type: "Culture" }
  ],
  insights: [
    { id: 1, type: "saving", text: "Save ₹2,500 using Tokyo Metro Pass", detail: "Based on your Day 1-3 movement patterns.", impact: "high" },
    { id: 2, type: "prediction", text: "Flights may be 18% cheaper next month", detail: "Seasonal trend analysis for return routes.", impact: "medium" },
    { id: 3, type: "warning", text: "Kyoto hotel costs are above seasonal average", detail: "Consider moving stay to nearby Osaka.", impact: "critical" }
  ],
  health: {
    score: 88,
    status: "Balanced Spending",
    analysis: "Your spending is well-aligned with your luxury-cultural travel style. Food allocation is slightly above average due to premium dining choices in Tokyo.",
    metrics: [
      { label: "Efficiency", value: 92 },
      { label: "Luxury Balance", value: 78 },
      { label: "Foodie Score", value: 95 }
    ]
  }
};
