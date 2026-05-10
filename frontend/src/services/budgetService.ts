export const fetchActivities = async (category?: string, location?: string, name?: string) => {
  try {
    const url = new URL('http://localhost:5000/api/activities');
    if (category) url.searchParams.append('category', category);
    if (location) url.searchParams.append('location', location);
    if (name) url.searchParams.append('name', name);

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error('Failed to fetch activities');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching activities:', error);
    return [];
  }
};

export const calculateBudget = async (data: { hotelCost: number; transportCost: number; foodCost: number; activities: any[]; tripDays: number }) => {
  try {
    const response = await fetch('http://localhost:5000/api/budget/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to calculate budget');
    }
    return await response.json();
  } catch (error) {
    console.error('Error calculating budget:', error);
    return null;
  }
};

export const getBudgetSummary = async (tripId: string) => {
  try {
    const response = await fetch(`http://localhost:5000/api/budget?tripId=${tripId}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch budget summary');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching budget summary:', error);
    throw error;
  }
};

export const addExpense = async (expenseData: { tripId: string; title: string; category: string; amount: number; date?: string; notes?: string }) => {
  try {
    const response = await fetch('http://localhost:5000/api/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expenseData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to add expense');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding expense:', error);
    return null;
  }
};
