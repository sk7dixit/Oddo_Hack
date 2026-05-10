import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getActivities = async (req: Request, res: Response) => {
  try {
    const { category, location, name } = req.query;

    const filters: any = {};
    if (category) {
      filters.category = {
        equals: String(category),
        mode: 'insensitive',
      };
    }
    if (location) {
      filters.location = {
        contains: String(location),
        mode: 'insensitive',
      };
    }
    if (name) {
      filters.name = {
        contains: String(name),
        mode: 'insensitive',
      };
    }

    const activities = await prisma.activity.findMany({
      where: filters,
    });

    res.status(200).json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
};

export const calculateBudget = async (req: Request, res: Response) => {
  try {
    const { hotelCost, transportCost, foodCost, miscCost, activities, tripDays } = req.body;

    // Validate inputs
    if (tripDays <= 0) {
      return res.status(400).json({ error: 'tripDays must be greater than 0' });
    }

    // Calculate activity totals
    let totalActivityCost = 0;
    if (activities && Array.isArray(activities)) {
      totalActivityCost = activities.reduce((sum, activity) => {
        // Handle cases where activity is just a number or an object with a cost property
        if (typeof activity === 'number') return sum + activity;
        if (activity.totalCost !== undefined) return sum + Number(activity.totalCost);
        if (activity.cost) return sum + Number(activity.cost);
        if (activity.costPerPerson) return sum + (Number(activity.costPerPerson) * (activity.quantity || 1));
        return sum;
      }, 0);
    }

    const hCost = Number(hotelCost) || 0;
    const tCost = Number(transportCost) || 0;
    const fCost = Number(foodCost) || 0;
    const mCost = Number(miscCost) || 0;

    // Calculate grand total
    const totalBudget = hCost + tCost + fCost + mCost + totalActivityCost;

    // Calculate cost/day
    const costPerDay = totalBudget / tripDays;

    const currentTripId = req.body.tripId || 'test_trip_id';

    // Save budget to database
    const savedBudget = await prisma.budget.create({
      data: {
        tripId: currentTripId,
        userId: req.body.userId || 'test_user_id',
        totalHotelCost: hCost,
        totalTransportCost: tCost,
        totalFoodCost: fCost,
        totalMiscCost: mCost,
        totalActivityCost: totalActivityCost,
        totalBudget: totalBudget,
        costPerDay: costPerDay,
      }
    });

    // Clear old activities for this trip and recreate them
    await prisma.expense.deleteMany({
      where: { tripId: currentTripId, category: 'Activity' }
    });

    if (activities && Array.isArray(activities)) {
      const expensePromises = activities.map(act => {
        // If act is just a number, we can't save much detail
        if (typeof act === 'number') return Promise.resolve();
        
        return prisma.expense.create({
          data: {
            tripId: currentTripId,
            title: act.name || 'Unknown Activity',
            category: 'Activity',
            amount: act.totalCost || (act.costPerPerson * (act.quantity || 1)) || 0,
            date: new Date(),
            notes: JSON.stringify({
              id: act.id,
              costPerPerson: act.costPerPerson,
              quantity: act.quantity || 1
            })
          }
        });
      });
      await Promise.all(expensePromises);
    }

    res.status(200).json({
      totalBudget,
      costPerDay,
      expenseBreakdown: {
        hotelCost: hCost,
        transportCost: tCost,
        foodCost: fCost,
        miscCost: mCost,
        totalActivityCost,
      },
      savedBudget
    });
  } catch (error) {
    console.error('Error calculating budget:', error);
    res.status(500).json({ error: 'Failed to calculate budget' });
  }
};

export const getBudgetSummary = async (req: Request, res: Response) => {
  try {
    const { tripId } = req.query;

    if (!tripId) {
      return res.status(400).json({ error: 'missing tripId' });
    }

    const budget = await prisma.budget.findFirst({
      where: { tripId: String(tripId) },
      orderBy: { createdAt: 'desc' } // Get the most recent calculation
    });

    if (!budget) {
      return res.status(404).json({ error: 'invalid tripId or budget not found' });
    }

    const expenses = await prisma.expense.findMany({
      where: { tripId: String(tripId) },
      orderBy: { date: 'asc' }
    });

    const selectedActivities = expenses.filter(e => e.category === 'Activity');

    res.status(200).json({
      budgetSummary: budget,
      expenses,
      selectedActivities
    });
  } catch (error) {
    console.error('Error fetching budget summary:', error);
    res.status(500).json({ error: 'Failed to fetch budget summary' });
  }
};

export const createExpense = async (req: Request, res: Response) => {
  try {
    const { tripId, title, category, amount, date, notes } = req.body;

    if (!tripId || !title || !category || amount === undefined) {
      return res.status(400).json({ error: 'Missing required expense fields' });
    }

    const expense = await prisma.expense.create({
      data: {
        tripId,
        title,
        category,
        amount: Number(amount),
        date: date ? new Date(date) : new Date(),
        notes
      }
    });

    res.status(201).json(expense);
  } catch (error) {
    console.error('Error creating expense:', error);
    res.status(500).json({ error: 'Failed to create expense' });
  }
};
