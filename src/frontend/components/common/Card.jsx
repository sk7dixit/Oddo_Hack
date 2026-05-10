import React from "react";

const Card = ({ children, title, subtitle, className = "" }) => {
  return (
    <div className={`bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden ${className}`}>
      {(title || subtitle) && (
        <div className="px-8 py-6 border-b border-gray-50">
          {title && <h3 className="text-lg font-bold text-gray-800">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
      )}
      <div className="p-8">{children}</div>
    </div>
  );
};

export default Card;
