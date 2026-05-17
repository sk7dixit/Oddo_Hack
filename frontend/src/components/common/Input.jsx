import React from "react";

const Input = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  onKeyPress,
  className = "",
  error,
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onKeyPress={onKeyPress}
        className={`
          px-5 py-3.5 rounded-2xl border-2 transition-all outline-none text-slate-700 font-medium
          ${error 
            ? "border-rose-100 bg-rose-50/30 focus:border-rose-500" 
            : "border-slate-100 bg-slate-50/30 focus:border-blue-600 focus:bg-white focus:shadow-lg focus:shadow-blue-50/50"
          }
        `}
      />
      {error && <span className="text-xs text-rose-500 font-bold px-1">{error}</span>}
    </div>
  );
};

export default Input;
