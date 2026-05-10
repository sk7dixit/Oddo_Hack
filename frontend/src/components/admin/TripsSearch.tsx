import React from "react";
import { Search } from "lucide-react";

interface Props {
  search: string;
  setSearch: (val: string) => void;
}

const TripsSearch = ({ search, setSearch }: Props) => {
  return (
    <div className="relative w-full md:w-[300px] group">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280] group-focus-within:text-[#8B5CF6] transition-colors" size={20} />
      <input
        type="text"
        placeholder="Search trips..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full 
          bg-white
          border 
          border-[#E5E7EB]
          rounded-xl 
          pl-10 
          pr-4 
          py-2.5
          text-sm 
          text-[#111827] 
          placeholder:text-[#6B7280]
          focus:outline-none 
          focus:ring-4
          focus:ring-violet-100
          focus:border-[#8B5CF6]
          shadow-[0_4px_20px_rgba(0,0,0,0.04)]
          transition-all
        "
      />
    </div>
  );
};

export default TripsSearch;
