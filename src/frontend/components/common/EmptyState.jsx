import React from "react";

const EmptyState = ({ message, icon = "📦", children }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <span className="text-6xl mb-6">{icon}</span>
      <p className="text-xl font-semibold text-gray-700 mb-2">{message}</p>
      {children}
    </div>
  );
};

export default EmptyState;
