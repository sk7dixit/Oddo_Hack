import React from 'react';

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-7xl mx-auto w-full px-6 pt-24">
      {children}
    </div>
  );
};
