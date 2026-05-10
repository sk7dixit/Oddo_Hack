import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

export interface SelectedActivity {
  id: string;
  name: string;
  costPerPerson: number;
  quantity: number;
  totalCost: number;
}

interface BudgetContextType {
  selectedActivities: SelectedActivity[];
  hotelCost: number;
  transportCost: number;
  foodCost: number;
  miscCost: number;
  tripDays: number;
  totalActivityCost: number;
  totalBudget: number;
  costPerDay: number;
  addActivity: (activity: any) => void;
  updateActivityQuantity: (id: string, delta: number) => void;
  removeActivity: (id: string) => void;
  updateBudgetFields: (fields: Partial<{ hotelCost: number; transportCost: number; foodCost: number; miscCost: number; tripDays: number }>) => void;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedActivities, setSelectedActivities] = useState<SelectedActivity[]>([]);
  const [hotelCost, setHotelCost] = useState(0);
  const [transportCost, setTransportCost] = useState(0);
  const [foodCost, setFoodCost] = useState(0);
  const [miscCost, setMiscCost] = useState(0);
  const [tripDays, setTripDays] = useState(1);

  // Load from localStorage on mount and then try to sync with server
  useEffect(() => {
    const savedActivities = localStorage.getItem('selectedActivities');
    if (savedActivities) {
      setSelectedActivities(JSON.parse(savedActivities));
    }
    const savedBudget = localStorage.getItem('budgetFields');
    if (savedBudget) {
      const { hotel, transport, food, misc, days } = JSON.parse(savedBudget);
      setHotelCost(hotel || 0);
      setTransportCost(transport || 0);
      setFoodCost(food || 0);
      setMiscCost(misc || 0);
      setTripDays(days || 1);
    }

    // Fetch existing budget from server
    const fetchExistingBudget = async () => {
      try {
        // We use dynamic import or fetch to avoid cyclic dependencies
        const response = await fetch('http://localhost:5000/api/budget?tripId=test_trip_id');
        if (response.ok) {
          const data = await response.json();
          if (data.budgetSummary) {
            setHotelCost(data.budgetSummary.totalHotelCost || 0);
            setTransportCost(data.budgetSummary.totalTransportCost || 0);
            setFoodCost(data.budgetSummary.totalFoodCost || 0);
            setMiscCost(data.budgetSummary.totalMiscCost || 0);
            // tripDays is not saved in Budget schema directly, it's derived. We'll leave tripDays alone.
          }
          if (data.selectedActivities && data.selectedActivities.length > 0) {
            const mappedActivities = data.selectedActivities.map((e: any) => {
              const notes = e.notes ? JSON.parse(e.notes) : {};
              return {
                id: notes.id || e.id,
                name: e.title,
                costPerPerson: notes.costPerPerson || e.amount,
                quantity: notes.quantity || 1,
                totalCost: e.amount
              };
            });
            setSelectedActivities(mappedActivities);
          }
        }
      } catch (error) {
        console.error('Failed to sync existing budget:', error);
      }
    };

    fetchExistingBudget();
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('selectedActivities', JSON.stringify(selectedActivities));
  }, [selectedActivities]);

  useEffect(() => {
    localStorage.setItem('budgetFields', JSON.stringify({
      hotel: hotelCost,
      transport: transportCost,
      food: foodCost,
      misc: miscCost,
      days: tripDays
    }));
  }, [hotelCost, transportCost, foodCost, miscCost, tripDays]);

  const addActivity = (activity: any) => {
    setSelectedActivities((prev) => {
      const existing = prev.find((a) => a.id === activity.id);
      if (existing) {
        return prev.map((a) =>
          a.id === activity.id
            ? { ...a, quantity: a.quantity + 1, totalCost: (a.quantity + 1) * a.costPerPerson }
            : a
        );
      }
      const newActivity: SelectedActivity = {
        id: activity.id,
        name: activity.name,
        costPerPerson: activity.costPerPerson * 83, // Assuming activity.costPerPerson is in USD as per original code
        quantity: 1,
        totalCost: activity.costPerPerson * 83,
      };
      return [...prev, newActivity];
    });
  };

  const updateActivityQuantity = (id: string, delta: number) => {
    setSelectedActivities((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const newQuantity = Math.max(1, a.quantity + delta);
          return { ...a, quantity: newQuantity, totalCost: newQuantity * a.costPerPerson };
        }
        return a;
      })
    );
  };

  const removeActivity = (id: string) => {
    setSelectedActivities((prev) => prev.filter((a) => a.id !== id));
  };

  const updateBudgetFields = (fields: Partial<{ hotelCost: number; transportCost: number; foodCost: number; miscCost: number; tripDays: number }>) => {
    if (fields.hotelCost !== undefined) setHotelCost(fields.hotelCost);
    if (fields.transportCost !== undefined) setTransportCost(fields.transportCost);
    if (fields.foodCost !== undefined) setFoodCost(fields.foodCost);
    if (fields.miscCost !== undefined) setMiscCost(fields.miscCost);
    if (fields.tripDays !== undefined) setTripDays(fields.tripDays);
  };

  const totalActivityCost = useMemo(() => {
    return selectedActivities.reduce((sum, a) => sum + a.totalCost, 0);
  }, [selectedActivities]);

  const totalBudget = useMemo(() => {
    return hotelCost + transportCost + foodCost + miscCost + totalActivityCost;
  }, [hotelCost, transportCost, foodCost, miscCost, totalActivityCost]);

  const costPerDay = useMemo(() => {
    return tripDays > 0 ? totalBudget / tripDays : totalBudget;
  }, [totalBudget, tripDays]);

  return (
    <BudgetContext.Provider
      value={{
        selectedActivities,
        hotelCost,
        transportCost,
        foodCost,
        miscCost,
        tripDays,
        totalActivityCost,
        totalBudget,
        costPerDay,
        addActivity,
        updateActivityQuantity,
        removeActivity,
        updateBudgetFields,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
};
