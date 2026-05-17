export const travelKnowledge: Record<string, any> = {
  Japan: {
    name: "Japan",
    bestSeason: "March to May (Cherry Blossoms) or October to November (Autumn Leaves)",
    avgBudget: "₹1.5L - ₹3.5L per person for 10 days",
    famousFor: ["Advanced Technology", "Deep Cultural Heritage", "World-class Cuisine", "Stunning Temples"],
    topCities: ["Tokyo", "Kyoto", "Osaka", "Sapporo", "Nara"],
    experiences: [
      "Stay in a traditional Ryokan",
      "Ride the Shinkansen (Bullet Train)",
      "Explore Akihabara's neon streets",
      "Attend a traditional Tea Ceremony in Kyoto"
    ],
    safetyIndex: "Extreme (98/100)",
    language: "Japanese (English is understood in major tourist hubs)"
  },
  Italy: {
    name: "Italy",
    bestSeason: "April to June or September to October",
    avgBudget: "₹2L - ₹4L per person for 12 days",
    famousFor: ["Art & Renaissance", "Renaissance Architecture", "Iconic Cuisine", "Luxury Coastal Views"],
    topCities: ["Rome", "Venice", "Florence", "Milan", "Amalfi Coast"],
    experiences: [
      "Gondola ride in Venice",
      "Private wine tasting in Tuscany",
      "Visit the Colosseum at sunrise",
      "Coastal drive along the Amalfi Coast"
    ],
    safetyIndex: "High (82/100)",
    language: "Italian (English common in tourist areas)"
  },
  Bali: {
    name: "Bali",
    bestSeason: "April to October (Dry Season)",
    avgBudget: "₹60k - ₹1.2L per person for 7 days",
    famousFor: ["Tropical Beaches", "Sacred Temples", "Vibrant Nightlife", "Lush Rice Terraces"],
    topCities: ["Ubud", "Seminyak", "Canggu", "Uluwatu"],
    experiences: [
      "Sunrise trek to Mount Batur",
      "Surf at Uluwatu",
      "Spiritual cleansing at Tirta Empul",
      "Explore Ubud's Sacred Monkey Forest"
    ],
    safetyIndex: "High (85/100)",
    language: "Indonesian, Balinese (English is widely spoken)"
  }
};

export const prompts = [
  "Plan a romantic Italy trip under ₹1L",
  "Best hidden cafes in Tokyo?",
  "Create a 5-day Bali itinerary",
  "Where should I travel in monsoon?",
  "Backpack Europe under ₹2L",
  "Build me a honeymoon itinerary",
  "What to do in Paris when raining?",
  "Best food streets in Osaka"
];

export const quickActions = [
  { id: 'trip', label: 'Trip Planning', icon: 'Plane' },
  { id: 'budget', label: 'Budget Optimizer', icon: 'Wallet' },
  { id: 'rain', label: 'Rain Backup', icon: 'CloudRain' },
  { id: 'food', label: 'Food Discovery', icon: 'Utensils' },
  { id: 'local', label: 'Local Experiences', icon: 'Sparkles' },
  { id: 'safety', label: 'Safety Tips', icon: 'ShieldCheck' },
  { id: 'gems', label: 'Hidden Gems', icon: 'Map' }
];
