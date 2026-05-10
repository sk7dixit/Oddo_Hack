import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Inserting 10-20 activities...');
  const activitiesData = [
    { name: 'Himalayan Trekking', description: 'A thrilling 5-day trek in the Himalayas.', location: 'Nepal', category: 'Trekking', costPerPerson: 300, duration: '5 days', imageUrl: 'https://example.com/trek.jpg' },
    { name: 'Swiss Alps Camping', description: 'Camp under the stars in the Swiss Alps.', location: 'Switzerland', category: 'Camping', costPerPerson: 150, duration: '2 nights', imageUrl: 'https://example.com/camp.jpg' },
    { name: 'Great Barrier Reef Scuba Diving', description: 'Explore the world\'s largest coral reef.', location: 'Australia', category: 'Scuba Diving', costPerPerson: 250, duration: '4 hours', imageUrl: 'https://example.com/scuba.jpg' },
    { name: 'Serengeti Safari', description: 'Witness the Great Migration in the Serengeti.', location: 'Tanzania', category: 'Safari', costPerPerson: 800, duration: '3 days', imageUrl: 'https://example.com/safari.jpg' },
    { name: 'Louvre Museum Visit', description: 'See the Mona Lisa and thousands of other artworks.', location: 'Paris, France', category: 'Museum Visit', costPerPerson: 20, duration: '3 hours', imageUrl: 'https://example.com/louvre.jpg' },
    { name: 'Inca Trail Trek', description: 'Hike the historic Inca Trail to Machu Picchu.', location: 'Peru', category: 'Trekking', costPerPerson: 500, duration: '4 days', imageUrl: 'https://example.com/inca.jpg' },
    { name: 'Yosemite National Park Camping', description: 'Experience the wilderness of Yosemite.', location: 'California, USA', category: 'Camping', costPerPerson: 50, duration: '3 nights', imageUrl: 'https://example.com/yosemite.jpg' },
    { name: 'Blue Hole Scuba Diving', description: 'Dive into the famous Great Blue Hole.', location: 'Belize', category: 'Scuba Diving', costPerPerson: 300, duration: 'Half day', imageUrl: 'https://example.com/bluehole.jpg' },
    { name: 'Kruger National Park Safari', description: 'Spot the Big Five in South Africa.', location: 'South Africa', category: 'Safari', costPerPerson: 600, duration: '2 days', imageUrl: 'https://example.com/kruger.jpg' },
    { name: 'British Museum Tour', description: 'Explore human history, art, and culture.', location: 'London, UK', category: 'Museum Visit', costPerPerson: 0, duration: 'Half day', imageUrl: 'https://example.com/british.jpg' },
    { name: 'Mount Kilimanjaro Trek', description: 'Climb the highest peak in Africa.', location: 'Tanzania', category: 'Trekking', costPerPerson: 1500, duration: '7 days', imageUrl: 'https://example.com/kili.jpg' },
    { name: 'Sahara Desert Camping', description: 'Sleep in a Berber tent in the Sahara.', location: 'Morocco', category: 'Camping', costPerPerson: 200, duration: '1 night', imageUrl: 'https://example.com/sahara.jpg' },
    { name: 'Cenote Diving', description: 'Dive in the crystal clear waters of a cenote.', location: 'Mexico', category: 'Scuba Diving', costPerPerson: 100, duration: '3 hours', imageUrl: 'https://example.com/cenote.jpg' },
    { name: 'Maasai Mara Safari', description: 'Experience the magic of the Maasai Mara.', location: 'Kenya', category: 'Safari', costPerPerson: 750, duration: '3 days', imageUrl: 'https://example.com/maasai.jpg' },
    { name: 'Metropolitan Museum of Art', description: 'Visit the largest art museum in the Americas.', location: 'New York, USA', category: 'Museum Visit', costPerPerson: 30, duration: '4 hours', imageUrl: 'https://example.com/met.jpg' },
  ];

  let count = 0;
  for (const activity of activitiesData) {
    try {
      await prisma.activity.create({ data: activity });
      count++;
    } catch (e) {
      console.error('Failed to insert activity:', activity.name, e);
    }
  }

  console.log(`Successfully inserted ${count} activities.`);
}

main()
  .catch((e) => {
    console.error('Fatal error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
