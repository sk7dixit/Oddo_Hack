import React from "react";

const Button = ({ children, onClick, type = "button", variant = "primary", disabled = false, style }) => {
  const baseStyle = {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "all 0.2s ease",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    ...style
  };

  const variants = {
    primary: {
      backgroundColor: "#007bff",
      color: "white",
    },
    secondary: {
      backgroundColor: "#6c757d",
      color: "white",
    },
    danger: {
      backgroundColor: "#dc3545",
      color: "white",
    },
    outline: {
      backgroundColor: "transparent",
      border: "1px solid #ccc",
      color: "#333",
    }
  };

  const currentVariant = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ ...baseStyle, ...currentVariant, opacity: disabled ? 0.6 : 1 }}
    >
      {children}
    </button>
  );
};

export default Button;
