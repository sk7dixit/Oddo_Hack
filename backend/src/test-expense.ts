import { PrismaClient, ExpenseCategory } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Inserting 3 test expenses...');
  
  const expenses = await prisma.expense.createMany({
    data: [
      {
        tripId: 'trip_12345',
        title: 'Flight to Paris',
        category: ExpenseCategory.Transport,
        amount: 450.0,
        date: new Date('2026-06-15T10:00:00Z'),
        notes: 'Air France round trip',
      },
      {
        tripId: 'trip_12345',
        title: 'Hilton Hotel',
        category: ExpenseCategory.Hotel,
        amount: 600.0,
        date: new Date('2026-06-15T15:00:00Z'),
        notes: '3 nights stay',
      },
      {
        tripId: 'trip_12345',
        title: 'Dinner at Le Jules Verne',
        category: ExpenseCategory.Food,
        amount: 250.0,
        date: new Date('2026-06-16T20:00:00Z'),
        notes: 'Dinner in the Eiffel Tower',
      }
    ],
  });

  console.log(`Successfully inserted ${expenses.count} expenses.`);

  console.log('\nVerifying DB linkage (reading expenses from DB)...');
  const allExpenses = await prisma.expense.findMany();
  console.log('All expenses in database:', allExpenses);
}

main()
  .catch((e) => {
    console.error('Error inserting expenses:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
