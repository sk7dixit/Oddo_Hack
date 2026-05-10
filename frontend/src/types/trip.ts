export type Trip = {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  status: 'Planning' | 'Confirmed' | 'Draft';
  image?: string;
}

export type CreateTripInput = {
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
}
