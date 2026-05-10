export const demoNotes = [
  {
    _id: "demo_1",
    content: "Watching the sunset over the Amalfi Coast. The way the light hits the water is something I'll never forget. Found a small lemon grove nearby that smells like heaven.",
    mood: "😊",
    location: "Positano, Italy",
    imageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1000",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    _id: "demo_2",
    content: "Early morning hike to the viewpoint. The fog was rolling over the hills like a soft blanket. Best espresso of my life at that tiny hut at the summit.",
    mood: "🏔️",
    location: "Sapa, Vietnam",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  }
];

export const demoChecklist = [
  { _id: "check_1", task: "Passport and Visas", completed: true, category: "Essential" },
  { _id: "check_2", task: "Universal Power Adapter", completed: false, category: "Gear" },
  { _id: "check_3", task: "Offline Maps Downloaded", completed: true, category: "Digital" },
  { _id: "check_4", task: "First Aid Kit", completed: false, category: "Essential" }
];
