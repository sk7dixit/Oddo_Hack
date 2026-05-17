export const moderationRules = {
  toxic: {
    keywords: ['hate', 'kill', 'attack', 'bomb', 'steal', 'crime', 'illegal', 'drug'],
    response: "Voyage AI is committed to safe and positive travel experiences. I'm here to help you plan meaningful journeys and discover the world responsibly. Let's focus on your next destination instead."
  },
  vulgar: {
    keywords: ['fuck', 'shit', 'ass', 'bitch', 'porn', 'sexy', 'nude'],
    response: "I'm here to serve as your premium travel concierge, focusing on destination planning and cultural experiences. Let's keep our conversation professional and focused on your travel goals."
  },
  off_topic: {
    keywords: ['joke', 'math', 'code', 'write a poem', 'weather in my city', 'politics', 'news'],
    response: "While I'm quite specialized in travel intelligence and itinerary planning, I'd be happy to redirect our energy toward your next adventure. Where are you dreaming of going?"
  },
  jailbreak: {
    keywords: ['ignore previous', 'system prompt', 'developer mode', 'you are now'],
    response: "My core mission is to provide you with the most accurate and personalized travel intelligence. I'm ready to assist with your itinerary, budget, or destination discovery whenever you are."
  }
};

export const itineraryTemplates: Record<string, any> = {
  Japan: {
    5: [
      { day: 1, title: "Tokyo Arrival & Shibuya", activities: ["Arrival at Narita/Haneda", "Shibuya Crossing", "Hachiko Statue", "Sunset at Shibuya Sky"], type: "urban" },
      { day: 2, title: "Cultural Harajuku & Shinjuku", activities: ["Meiji Jingu Shrine", "Takeshita Street", "Shinjuku Gyoen National Garden", "Golden Gai exploration"], type: "culture" },
      { day: 3, title: "Mount Fuji Day Trip", activities: ["Lake Kawaguchiko", "Chureito Pagoda", "Oishi Park", "Local Houtou Noodle Lunch"], type: "nature" },
      { day: 4, title: "Historic Kyoto", activities: ["Bullet Train to Kyoto", "Fushimi Inari-taisha", "Gion District", "Traditional Tea Ceremony"], type: "heritage" },
      { day: 5, title: "Osaka Vibes & Departure", activities: ["Dotonbori Street Food", "Osaka Castle", "Last-minute souvenir shopping", "Kansai Airport Departure"], type: "urban" }
    ],
    7: [
      /* Expanded 7-day plan */
    ]
  },
  Italy: {
    5: [
      { day: 1, title: "Rome: The Eternal City", activities: ["Colosseum", "Roman Forum", "Piazza Navona", "Trastevere Dinner"], type: "history" },
      { day: 2, title: "Vatican & St. Peters", activities: ["Vatican Museums", "Sistine Chapel", "St. Peter's Basilica", "Castel Sant'Angelo"], type: "culture" },
      { day: 3, title: "Florence: Art & Architecture", activities: ["Train to Florence", "Duomo", "Uffizi Gallery", "Ponte Vecchio Sunset"], type: "art" },
      { day: 4, title: "Tuscany Countryside", activities: ["Chianti Wine Tasting", "Siena Day Trip", "San Gimignano", "Traditional Farm Lunch"], type: "nature" },
      { day: 5, title: "Venice: The Floating City", activities: ["Grand Canal", "St. Mark's Square", "Gondola Ride", "Venice Marco Polo Departure"], type: "urban" }
    ]
  }
};
