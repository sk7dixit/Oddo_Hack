import React from "react";
import type { AdminTrip } from "../../types/admin";
import TripRow from "./TripRow";
import EmptyState from "./EmptyState";

interface Props {
  trips: AdminTrip[];
  onDelete: (id: string) => void;
}

const TripsTable = ({ trips, onDelete }: Props) => {
  if (trips.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        description="Try adjusting your destination or budget search"
      />
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F5F7FB] border-b border-[#E5E7EB]">
            <tr>
              <th className="p-4 text-left text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Title</th>
              <th className="p-4 text-left text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Destination</th>
              <th className="p-4 text-left text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Creator</th>
              <th className="p-4 text-left text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Budget</th>
              <th className="p-4 text-left text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {trips.map((trip) => (
              <TripRow
                key={trip.id}
                trip={trip}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TripsTable;
