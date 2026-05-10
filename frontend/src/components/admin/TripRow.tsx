import React from "react";
import { Trash2, ExternalLink, MapPin } from "lucide-react";
import type { AdminTrip } from "../../types/admin";

interface Props {
  trip: AdminTrip;
  onDelete: (id: string) => void;
}

const TripRow = ({ trip, onDelete }: Props) => {
  return (
    <tr className="hover:bg-[#F5F7FB] transition-colors group">
      <td className="p-4">
        <span className="font-semibold text-[#111827] text-sm">{trip.title}</span>
      </td>
      <td className="p-4">
        <div className="flex items-center gap-1.5 text-[#6B7280] text-sm">
          <MapPin size={14} className="text-[#8B5CF6]" />
          <span>{trip.destination}</span>
        </div>
      </td>
      <td className="p-4 text-[#6B7280] text-sm">{trip.userName}</td>
      <td className="p-4">
        <span className="text-emerald-600 font-bold text-sm bg-emerald-50 px-2 py-0.5 rounded-md">
          ${trip.budget.toLocaleString()}
        </span>
      </td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          <button 
            title="View Details"
            className="p-2 text-zinc-400 hover:text-[#8B5CF6] hover:bg-violet-50 rounded-lg transition-all"
          >
            <ExternalLink size={18} />
          </button>
          <button
            onClick={() => onDelete(trip.id)}
            title="Delete Trip"
            className="p-2 text-zinc-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TripRow;
