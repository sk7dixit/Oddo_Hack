import { japanData } from './japan';
import { italyData } from './italy';

export const countriesData: Record<string, any> = {
  India: {
    name: "India",
    flag: "🇮🇳",
    heroImage: "https://images.unsplash.com/photo-1524492707947-2f85a512d7fb?auto=format&fit=crop&q=80&w=2000",
    description: "A land of diverse cultures, colors, and incredible landmarks.",
    cities: [
      {
        id: 'varanasi',
        name: 'Varanasi',
        country: 'India',
        image: 'https://images.unsplash.com/photo-1561359313-0639aad49ca6?auto=format&fit=crop&q=80&w=800',
        weather: '32°C',
        budget: '₹20k',
        budgetBreakdown: { backpacking: '₹8k', standard: '₹20k', luxury: '₹80k+' },
        safetyIndex: 'Medium',
        language: 'Hindi, English',
        currency: 'INR (₹)',
        famousFood: 'Kachori Sabzi, Lassi',
        idealStay: '2-3 Days',
        bestTime: 'Winter (Oct-Mar)',
        rating: 4.8,
        description: 'The spiritual heart of India on the banks of the Ganges.',
        tags: ['Spirituality', 'Culture', 'History'],
        attractions: ['Dashashwamedh Ghat', 'Kashi Vishwanath Temple', 'Sarnath', 'Ganga Aarti']
      },
      {
        id: 'jaipur',
        name: 'Jaipur',
        country: 'India',
        image: 'https://images.unsplash.com/photo-1599661046289-e318978df6b1?auto=format&fit=crop&q=80&w=800',
        weather: '35°C',
        budget: '₹35k',
        budgetBreakdown: { backpacking: '₹12k', standard: '₹35k', luxury: '₹1.5L+' },
        safetyIndex: 'High',
        language: 'Hindi, Rajasthani',
        currency: 'INR (₹)',
        famousFood: 'Dal Baati Churma, Laal Maas',
        idealStay: '3-4 Days',
        bestTime: 'Winter (Nov-Feb)',
        rating: 4.7,
        description: 'The Pink City, famous for its royal palaces and majestic forts.',
        tags: ['Heritage', 'Architecture', 'Royalty'],
        attractions: ['Amer Fort', 'Hawa Mahal', 'City Palace', 'Jantar Mantar']
      },
      {
        id: 'new-delhi',
        name: 'New Delhi',
        country: 'India',
        image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=800',
        weather: '30°C',
        budget: '₹40k',
        budgetBreakdown: { backpacking: '₹15k', standard: '₹40k', luxury: '₹2L+' },
        safetyIndex: 'Medium',
        language: 'Hindi, English, Punjabi',
        currency: 'INR (₹)',
        famousFood: 'Butter Chicken, Chole Bhature',
        idealStay: '3-4 Days',
        bestTime: 'Spring (Feb-Mar)',
        rating: 4.6,
        description: 'The vibrant capital of India, a mix of history and modern life.',
        tags: ['Capital', 'History', 'Street Food'],
        attractions: ['Red Fort', 'Qutub Minar', 'India Gate', 'Lotus Temple']
      },
      {
        id: 'mumbai',
        name: 'Mumbai',
        country: 'India',
        image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&q=80&w=800',
        weather: '29°C',
        budget: '₹50k',
        budgetBreakdown: { backpacking: '₹20k', standard: '₹50k', luxury: '₹2.5L+' },
        safetyIndex: 'High',
        language: 'Marathi, Hindi, English',
        currency: 'INR (₹)',
        famousFood: 'Vada Pav, Pav Bhaji',
        idealStay: '3-5 Days',
        bestTime: 'Winter (Nov-Feb)',
        rating: 4.7,
        description: 'The City of Dreams, financial powerhouse, and home to Bollywood.',
        tags: ['Cosmopolitan', 'Bollywood', 'Ocean'],
        attractions: ['Gateway of India', 'Marine Drive', 'Elephanta Caves', 'Colaba Causeway']
      },
      {
        id: 'udaipur',
        name: 'Udaipur',
        country: 'India',
        image: 'https://images.unsplash.com/photo-1590494161036-7973c1d4a04d?auto=format&fit=crop&q=80&w=800',
        weather: '28°C',
        budget: '₹45k',
        budgetBreakdown: { backpacking: '₹18k', standard: '₹45k', luxury: '₹3L+' },
        safetyIndex: 'High',
        language: 'Hindi, Mewari',
        currency: 'INR (₹)',
        famousFood: 'Ker Sangri, Mewari Egg Curry',
        idealStay: '3 Days',
        bestTime: 'Winter (Sep-Mar)',
        rating: 4.9,
        description: 'The City of Lakes, Venice of the East, and a romantic paradise.',
        tags: ['Romance', 'Lakes', 'Palaces'],
        attractions: ['City Palace', 'Lake Pichola', 'Jag Mandir', 'Fateh Sagar Lake']
      },
      {
        id: 'goa',
        name: 'Goa',
        country: 'India',
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800',
        weather: '31°C',
        budget: '₹35k',
        budgetBreakdown: { backpacking: '₹15k', standard: '₹35k', luxury: '₹1.5L+' },
        safetyIndex: 'High',
        language: 'Konkani, English, Hindi',
        currency: 'INR (₹)',
        famousFood: 'Fish Curry, Bebinca',
        idealStay: '4-6 Days',
        bestTime: 'Winter (Nov-Feb)',
        rating: 4.8,
        description: 'India’s pocket-sized paradise, famous for its beaches and nightlife.',
        tags: ['Beaches', 'Parties', 'Relaxation'],
        attractions: ['Baga Beach', 'Old Goa Churches', 'Dudhsagar Falls', 'Anjuna Market']
      },
      {
        id: 'rishikesh',
        name: 'Rishikesh',
        country: 'India',
        image: 'https://images.unsplash.com/photo-1544735749-34cb4bb3dd14?auto=format&fit=crop&q=80&w=800',
        weather: '24°C',
        budget: '₹25k',
        budgetBreakdown: { backpacking: '₹10k', standard: '₹25k', luxury: '₹1L+' },
        safetyIndex: 'Very High',
        language: 'Hindi, English',
        currency: 'INR (₹)',
        famousFood: 'Masala Chai, Ayurvedic Meals',
        idealStay: '3-4 Days',
        bestTime: 'Spring (Mar-May)',
        rating: 4.8,
        description: 'The Yoga Capital of the World, nestled in the foothills of the Himalayas.',
        tags: ['Yoga', 'Adventure', 'Spirituality'],
        attractions: ['Laxman Jhula', 'Triveni Ghat', 'Beatles Ashram', 'River Rafting']
      },
      {
        id: 'kochi',
        name: 'Kochi',
        country: 'India',
        image: 'https://images.unsplash.com/photo-1593693411515-c202e974fe08?auto=format&fit=crop&q=80&w=800',
        weather: '30°C',
        budget: '₹30k',
        budgetBreakdown: { backpacking: '₹12k', standard: '₹30k', luxury: '₹1.2L+' },
        safetyIndex: 'High',
        language: 'Malayalam, English',
        currency: 'INR (₹)',
        famousFood: 'Appam & Stew, Karimeen Pollichathu',
        idealStay: '3 Days',
        bestTime: 'Winter (Oct-Feb)',
        rating: 4.7,
        description: 'The Queen of the Arabian Sea, a colonial melting pot with Chinese nets.',
        tags: ['Backwaters', 'Heritage', 'Cuisine'],
        attractions: ['Fort Kochi', 'Chinese Fishing Nets', 'Mattancherry Palace', 'Willingdon Island']
      }

    ],

    experiences: [
      { id: 'taj-sunrise', name: 'Taj Mahal Sunrise', image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=800', description: 'Witness the monument of love in its golden glory.' },
      { id: 'kerala-backwaters', name: 'Kerala Backwaters', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800', description: 'Peaceful houseboat journey through lush green palm groves.' }
    ]
  },
  Japan: japanData,
  Italy: italyData,
  Switzerland: {
    name: "Switzerland",
    flag: "🇨🇭",
    heroImage: "https://images.unsplash.com/photo-1531310197839-ccf54634509e?auto=format&fit=crop&q=80&w=2000",
    cities: [],
    experiences: []
  },
  UAE: {
    name: "UAE",
    flag: "🇦🇪",
    heroImage: "https://images.unsplash.com/photo-1512453979798-5eaad0df3b03?auto=format&fit=crop&q=80&w=2000",
    cities: [],
    experiences: []
  },
  Thailand: {
    name: "Thailand",
    flag: "🇹🇭",
    heroImage: "https://images.unsplash.com/photo-1528181304800-259b08bb73d5?auto=format&fit=crop&q=80&w=2000",
    cities: [],
    experiences: []
  },
  Korea: {
    name: "Korea",
    flag: "🇰🇷",
    heroImage: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&q=80&w=2000",
    cities: [],
    experiences: []
  },
  France: {
    name: "France",
    flag: "🇫🇷",
    heroImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=2000",
    cities: [],
    experiences: []
  },
  Greece: {
    name: "Greece",
    flag: "🇬🇷",
    heroImage: "https://images.unsplash.com/photo-1503152397458-9961f8445f2c?auto=format&fit=crop&q=80&w=2000",
    cities: [],
    experiences: []
  },
  Singapore: {
    name: "Singapore",
    flag: "🇸🇬",
    heroImage: "https://images.unsplash.com/photo-1525596662741-e94ff9f26de1?auto=format&fit=crop&q=80&w=2000",
    cities: [],
    experiences: []
  }
};


export const countryList = Object.values(countriesData).map(c => ({
  name: c.name,
  flag: c.flag
}));
