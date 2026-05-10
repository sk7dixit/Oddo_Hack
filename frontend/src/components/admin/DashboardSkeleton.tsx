import React from "react";

const DashboardSkeleton = () => {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-8 md:h-10 w-32 md:w-48 rounded-xl animate-shimmer" />
        <div className="h-3 md:h-4 w-48 md:w-80 rounded-lg animate-shimmer" />
      </div>

      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="h-[120px] md:h-[140px] rounded-2xl bg-white border border-zinc-100 shadow-sm animate-shimmer" />
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
        <div className="h-[240px] md:h-[280px] rounded-2xl bg-white border border-zinc-100 shadow-sm animate-shimmer" />
        <div className="h-[240px] md:h-[280px] rounded-2xl bg-white border border-zinc-100 shadow-sm animate-shimmer" />
      </div>
    </div>
  );
};

export default DashboardSkeleton;
