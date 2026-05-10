import React from "react";

const Loader = ({ fullPage = false }) => {
  const loader = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="text-gray-500 font-medium">Loading...</p>
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[100] flex items-center justify-center">
        {loader}
      </div>
    );
  }

  return loader;
};

export default Loader;
