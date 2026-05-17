export const destinationAtmospheres: Record<string, any> = {
  Japan: {
    title: "Timeless Tradition meets Future Pulse",
    description: "Japan is a sensory masterpiece where the silence of ancient temple pathways coexists with the electric neon energy of the world's most advanced cities. It's the smell of incense in Kyoto's Gion district and the glow of vending machines on a rain-slicked Tokyo street.",
    moods: ["Calm", "Electric", "Nostalgic", "Efficient"],
    visuals: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800", // Kyoto Temple
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=800", // Tokyo Neon
      "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&q=80&w=800", // Sakura
      "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&q=80&w=800"  // Osaka Food
    ]
  },
  Italy: {
    title: "The Art of Slow Living",
    description: "Italy is an emotional journey through history, art, and the Mediterranean sun. It's the cinematic light stretching across the Amalfi Coast and the vibrant echo of footsteps on Rome's cobblestone piazzas. Every meal is a celebration, every sunset is a memory.",
    moods: ["Romantic", "Historic", "Vibrant", "Relaxed"],
    visuals: [
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&q=80&w=800", // Venice
      "https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&q=80&w=800", // Rome
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=800", // Positano
      "https://images.unsplash.com/photo-1528114039593-4366cc08227d?auto=format&fit=crop&q=80&w=800"  // Florence
    ]
  },
  Bali: {
    title: "Island Spirits & Tropical Dreams",
    description: "Bali feels like a spiritual sanctuary where deep emerald rice terraces meet the vast blue of the Indian Ocean. It's the fragrance of temple frangipanis and the rhythmic sound of morning waves in Uluwatu. A place for the soul to breathe.",
    moods: ["Spiritual", "Tropical", "Adventurous", "Lush"],
    visuals: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800", // Bali Temple
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=800", // Surf
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=800", // Rice Terrace
      "https://images.unsplash.com/photo-1573843225234-ad44732b2488?auto=format&fit=crop&q=80&w=800"  // Resort
    ]
  }
};

export const travelMoods = [
  { id: 'peace', label: 'Peaceful Escapes', icon: 'Leaf', color: 'text-green-400' },
  { id: 'energy', label: 'Vibrant City Energy', icon: 'Zap', color: 'text-yellow-400' },
  { id: 'romance', label: 'Romantic Experiences', icon: 'Heart', color: 'text-pink-400' },
  { id: 'adventure', label: 'Adventure Journeys', icon: 'Compass', color: 'text-orange-400' },
  { id: 'luxury', label: 'Luxury Retreats', icon: 'Crown', color: 'text-cyan-400' }
];
