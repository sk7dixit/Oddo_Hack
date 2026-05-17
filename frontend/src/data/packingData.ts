export const packingData = {
  tripName: 'Japan Adventure',
  totalItems: 25,
  packedItems: 18,
  categories: [
    { id: 'clothing', name: 'Clothing', icon: 'Shirt', count: 8, packed: 5 },
    { id: 'documents', name: 'Documents', icon: 'FileText', count: 4, packed: 4 },
    { id: 'electronics', name: 'Electronics', icon: 'Smartphone', count: 6, packed: 4 },
    { id: 'toiletries', name: 'Toiletries', icon: 'Droplets', count: 5, packed: 3 },
    { id: 'medical', name: 'Medical', icon: 'ShieldPlus', count: 2, packed: 2 },
  ],
  items: [
    { id: '1', category: 'documents', name: 'Passport', packed: true, priority: 'Essential' },
    { id: '2', category: 'documents', name: 'Flight Tickets', packed: true, priority: 'Essential' },
    { id: '3', category: 'documents', name: 'Hotel Bookings', packed: true, priority: 'Essential' },
    { id: '4', category: 'documents', name: 'Travel Insurance', packed: true, priority: 'Optional' },
    { id: '5', category: 'clothing', name: 'Winter Jacket', packed: false, priority: 'Essential', notes: 'Heavy one' },
    { id: '6', category: 'clothing', name: 'Thermal Wear', packed: true, priority: 'Essential' },
    { id: '7', category: 'electronics', name: 'Power Bank', packed: true, priority: 'Urgent' },
    { id: '8', category: 'electronics', name: 'Travel Adapter', packed: false, priority: 'Essential' },
    { id: '9', category: 'electronics', name: 'Camera Gear', packed: true, priority: 'Fragile' },
  ],
  smartEssentials: [
    { name: 'Universal Adapter', reason: 'Japan uses Type A/B' },
    { name: 'JR Pass', reason: 'Essential for inter-city travel' },
    { name: 'Pocket WiFi', reason: 'Best for navigation' },
    { name: 'Comfy Shoes', reason: 'Lots of walking in Tokyo' }
  ],
  templates: [
    { name: 'Beach Vacation', items: 12 },
    { name: 'Winter Trip', items: 15 },
    { name: 'Business Travel', items: 10 },
    { name: 'Backpacking', items: 20 }
  ]
};
