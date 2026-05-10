import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Inserting a sample activity...');
  const newActivity = await prisma.activity.create({
    data: {
      name: 'Eiffel Tower Tour',
      description: 'Guided tour of the Eiffel Tower with skip-the-line access.',
      location: 'Paris, France',
      category: 'Sightseeing',
      costPerPerson: 55.0,
      duration: '2 hours',
      imageUrl: 'https://example.com/eiffel.jpg',
    },
  });
  console.log('Sample activity inserted successfully:', newActivity);

  console.log('\nVerifying collection/table contents...');
  const activities = await prisma.activity.findMany();
  console.log('All activities in database:', activities);
}

main()
  .catch((e) => {
    console.error('Error inserting activity:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
