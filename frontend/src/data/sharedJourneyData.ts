export const sharedJourneyData = {
  tripName: 'Japan Adventure',
  crew: [
    { 
      id: 'm1', 
      name: 'Aarav', 
      role: 'Trip Organizer', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav', 
      online: true, 
      task: 'Editing Itinerary' 
    },
    { 
      id: 'm2', 
      name: 'Riya', 
      role: 'Finance Manager', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Riya', 
      online: true, 
      task: 'Splitting Expenses' 
    },
    { 
      id: 'm3', 
      name: 'Dev', 
      role: 'Explorer', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dev', 
      online: false, 
      task: 'Exploring Food Spots' 
    }
  ],
  tasks: [
    { id: 't1', title: 'Book Tokyo Hotel', status: 'completed', assignedTo: 'Aarav' },
    { id: 't2', title: 'Reserve JR Pass', status: 'in-progress', assignedTo: 'Riya' },
    { id: 't3', title: 'Plan Day 3 Activities', status: 'pending', assignedTo: 'Dev' },
    { id: 't4', title: 'Research Kyoto Tea Houses', status: 'pending', assignedTo: 'Aarav' }
  ],
  activityFeed: [
    { id: 'a1', user: 'Riya', action: 'added a new memory', time: '2m ago', icon: 'Image' },
    { id: 'a2', user: 'Aarav', action: 'updated the budget', time: '15m ago', icon: 'Wallet' },
    { id: 'a3', user: 'Dev', action: 'voted for Kyoto Temple', time: '1h ago', icon: 'ThumbsUp' }
  ],
  votes: [
    { id: 'v1', title: 'Where should we go on Day 3?', options: [
      { name: 'Kyoto Temple', votes: 4, percentage: 65 },
      { name: 'Osaka Castle', votes: 2, percentage: 35 }
    ]}
  ],
  expenses: [
    { user: 'Aarav', paid: 4000, type: 'Hotels' },
    { user: 'Riya', paid: 2500, type: 'Flights' },
    { user: 'You', owe: 1200, to: 'Aarav' }
  ],
  messages: [
    { user: 'Aarav', text: 'Let’s leave by 7 AM tomorrow.', time: '10:30 AM' },
    { user: 'Riya', text: 'Got it! Packing now.', time: '10:32 AM' }
  ]
};
