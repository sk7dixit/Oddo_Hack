import React from "react";

const Card = ({ children, title, subtitle, className = "", noPadding = false }) => {
  return (
    <div className={`bg-white rounded-[2rem] border border-slate-100 shadow-sm shadow-slate-200/50 transition-all duration-300 hover:shadow-md hover:shadow-slate-200/60 ${className}`}>
      {(title || subtitle) && (
        <div className="px-8 py-6 border-b border-slate-50">
          {title && <h3 className="text-xl font-black text-slate-800 tracking-tight">{title}</h3>}
          {subtitle && <p className="text-sm text-slate-400 font-medium mt-1">{subtitle}</p>}
        </div>
      )}
      <div className={noPadding ? "" : "p-8"}>
        {children}
      </div>
    </div>
  );
};

export default Card;
