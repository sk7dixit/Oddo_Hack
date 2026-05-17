export const budgetData = {
  totalBudget: 180000,
  spent: 78000,
  remaining: 102000,
  categories: [
    { name: 'Flights', amount: 45000, percentage: 25, color: '#3b82f6', icon: 'Plane' },
    { name: 'Hotels', amount: 42000, percentage: 23, color: '#22d3ee', icon: 'Home' },
    { name: 'Food', amount: 15000, percentage: 8, color: '#10b981', icon: 'Utensils' },
    { name: 'Activities', amount: 25000, percentage: 14, color: '#a855f7', icon: 'Zap' },
    { name: 'Transport', amount: 12000, percentage: 7, color: '#f59e0b', icon: 'Train' },
    { name: 'Shopping', amount: 8000, percentage: 4, color: '#ec4899', icon: 'ShoppingBag' },
    { name: 'Emergency', amount: 5000, percentage: 3, color: '#ef4444', icon: 'ShieldAlert' },
  ],
  dailyExpenses: [
    { day: 'Day 1', amount: 12000, date: 'May 10' },
    { day: 'Day 2', amount: 8500, date: 'May 11' },
    { day: 'Day 3', amount: 15000, date: 'May 12' },
    { day: 'Day 4', amount: 7200, date: 'May 13' },
    { day: 'Day 5', amount: 9800, date: 'May 14' },
  ],
  destinationBreakdown: [
    { city: 'Tokyo', amount: 65000, color: '#3b82f6' },
    { city: 'Kyoto', amount: 30000, color: '#22d3ee' },
    { city: 'Osaka', amount: 22000, color: '#a855f7' },
  ],
  insights: [
    { type: 'warning', text: 'You’re spending 40% on hotels. Consider budget stays in Kyoto.' },
    { type: 'tip', text: 'Traveling in June could save 18% on flight costs.' },
    { type: 'suggestion', text: 'Tokyo metro pass can reduce your transport cost by ₹2,500.' },
  ]
};
