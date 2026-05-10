import React from "react";

const Loader = ({ size = "40px", color = "#007bff", fullPage = false }) => {
  const spinnerStyle = {
    width: size,
    height: size,
    border: "4px solid rgba(0,0,0,0.1)",
    borderTopColor: color,
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  const containerStyle = fullPage
    ? {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255,255,255,0.8)",
        zIndex: 1000,
      }
    : {
        display: "flex",
        justifyContent: "center",
        padding: "20px",
      };

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={spinnerStyle}></div>
    </div>
  );
};

export default Loader;
