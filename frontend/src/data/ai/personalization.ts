export const travelerPersonalities = [
  { id: 'adventure', label: 'Adventure Explorer', icon: 'Mountain', color: 'text-orange-400' },
  { id: 'luxury', label: 'Luxury Escapist', icon: 'Crown', color: 'text-yellow-400' },
  { id: 'backpacker', label: 'Budget Backpacker', icon: 'Backpack', color: 'text-green-400' },
  { id: 'romantic', label: 'Romantic Traveler', icon: 'Heart', color: 'text-pink-400' },
  { id: 'cultural', label: 'Cultural Wanderer', icon: 'Landmark', color: 'text-cyan-400' }
];

export const emotionKeywords: Record<string, string[]> = {
  confused: ['confused', 'decide', 'don\'t know', 'choice', 'too many', 'where to go'],
  overwhelmed: ['stressed', 'overwhelmed', 'too much', 'complicated', 'anxiety', 'planning is hard'],
  excited: ['excited', 'can\'t wait', 'stoked', 'amazing', 'love', 'dream'],
  hesitant: ['worth it', 'should i', 'really go', 'hesitant', 'unsure'],
  budget_anxiety: ['expensive', 'too much money', 'cost', 'price', 'cheap', 'budget', 'save']
};

export const personalityKeywords: Record<string, string[]> = {
  adventure: ['hiking', 'trek', 'mountain', 'thrill', 'scuba', 'active', 'adventure'],
  luxury: ['luxury', 'premium', '5-star', 'exclusive', 'resort', 'fine dining', 'comfort'],
  backpacker: ['cheap', 'hostel', 'budget', 'low cost', 'local train', 'save money'],
  romantic: ['honeymoon', 'sunset', 'couple', 'romantic', 'peaceful', 'quiet'],
  cultural: ['history', 'temple', 'museum', 'architecture', 'tradition', 'local life']
};

export const personalizedKnowledge: Record<string, Record<string, any>> = {
  Japan: {
    backpacker: {
      stay: "Stay in capsule hotels or vibrant hostels in Osaka's Namba district.",
      transit: "Use the JR Pass and overnight buses to save on accommodation.",
      food: "Explore local Yokocho alleys for authentic ¥500 ramen and street food.",
      highlight: "Akihabara electronic city and public onsens."
    },
    luxury: {
      stay: "Experience private villas in Gion, Kyoto or 5-star skyscraper suites in Shinjuku.",
      transit: "Private chauffeur service and Green Car (First Class) Shinkansen seats.",
      food: "Exclusive Michelin-star sushi omakase and private Kaiseki dining.",
      highlight: "Exclusive tea ceremonies and private Mount Fuji helicopter tours."
    },
    default: {
      stay: "A mix of modern hotels and traditional ryokans.",
      transit: "Bullet trains and efficient subway systems.",
      food: "Ramen, Sushi, and diverse street food markets.",
      highlight: "Kyoto's temples and Tokyo's neon streets."
    }
  },
  Italy: {
    backpacker: {
      stay: "Charming guesthouses in Naples or budget hostels in Florence.",
      transit: "Regional trains and shared bus routes.",
      food: "Authentic pizza from local pizzerias and fresh market produce.",
      highlight: "Ancient ruins and public piazzas."
    },
    luxury: {
      stay: "Historic palaces on the Grand Canal or cliffside villas in Positano.",
      transit: "Private water taxis in Venice and luxury car rentals for Tuscany.",
      food: "Private wine tastings in Chianti and fine dining with Vatican views.",
      highlight: "Private art gallery tours and luxury shopping in Milan."
    },
    default: {
      stay: "Boutique hotels and historic city center apartments.",
      transit: "Trenitalia high-speed rail network.",
      food: "Regional pasta dishes, gelato, and artisanal coffee.",
      highlight: "Art, history, and Mediterranean landscapes."
    }
  }
};

export const humanPrompts = [
  "I'm confused between Bali and Thailand",
  "Plan a relaxing honeymoon",
  "I want a peaceful solo trip",
  "Suggest affordable luxury destinations",
  "Help me plan my first international trip",
  "I'm feeling overwhelmed by planning"
];
