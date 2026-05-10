import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';
dotenv.config();

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const MOCK_USER_ID = 'u1';
  
  const user = await prisma.user.findUnique({ where: { id: MOCK_USER_ID } });
  if (!user) {
    await prisma.user.create({
      data: {
        id: MOCK_USER_ID,
        email: 'explorer.pro@traveloop.com',
        name: 'Explorer Pro',
      }
    });
  }

  const trips = [
    {
      title: "Summer in Santorini",
      description: "Exploring the blue domes and sunset views.",
      startDate: new Date("2026-07-15T00:00:00Z"),
      endDate: new Date("2026-07-22T00:00:00Z"),
      status: "Planning",
      image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=800&q=80",
      userId: MOCK_USER_ID
    },
    {
      title: "Tokyo Food Tour",
      description: "Best sushi and ramen spots in Shinjuku.",
      startDate: new Date("2026-09-05T00:00:00Z"),
      endDate: new Date("2026-09-15T00:00:00Z"),
      status: "Confirmed",
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
      userId: MOCK_USER_ID
    },
    {
      title: "Swiss Alps Hiking",
      description: "High altitude trails and cozy cabins.",
      startDate: new Date("2026-12-10T00:00:00Z"),
      endDate: new Date("2026-12-18T00:00:00Z"),
      status: "Draft",
      image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
      userId: MOCK_USER_ID
    }
  ];

  for (const trip of trips) {
    // Check if trip already exists to prevent duplicates
    const existing = await prisma.trip.findFirst({ where: { title: trip.title, userId: MOCK_USER_ID }});
    if (!existing) {
      await prisma.trip.create({
        data: trip as any
      });
      console.log(`Created trip: ${trip.title}`);
    } else {
      console.log(`Trip already exists: ${trip.title}`);
    }
  }

  console.log("Seeding completed!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    pool.end();
  });
