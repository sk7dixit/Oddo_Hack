import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Inserting a sample budget...');
  const newBudget = await prisma.budget.create({
    data: {
      tripId: 'trip_12345',
      userId: 'user_98765',
      totalTransportCost: 450.0,
      totalHotelCost: 1200.0,
      totalFoodCost: 350.0,
      totalActivityCost: 200.0,
      totalBudget: 2500.0,
      costPerDay: 150.0,
    },
  });
  console.log('Sample budget inserted successfully:', newBudget);

  console.log('\nVerifying collection/table contents...');
  const budgets = await prisma.budget.findMany();
  console.log('All budgets in database:', budgets);
}

main()
  .catch((e) => {
    console.error('Error inserting budget:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
