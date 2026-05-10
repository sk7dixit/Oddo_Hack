import React from "react";

const Card = ({ children, title, subtitle, footer, style }) => {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        overflow: "hidden",
        border: "1px solid #eee",
        ...style
      }}
    >
      {(title || subtitle) && (
        <div style={{ padding: "20px", borderBottom: "1px solid #f0f0f0" }}>
          {title && <h3 style={{ margin: 0, fontSize: "1.25rem", color: "#333" }}>{title}</h3>}
          {subtitle && <p style={{ margin: "5px 0 0", color: "#666", fontSize: "0.9rem" }}>{subtitle}</p>}
        </div>
      )}
      <div style={{ padding: "20px" }}>{children}</div>
      {footer && (
        <div style={{ padding: "15px 20px", background: "#fafafa", borderTop: "1px solid #f0f0f0" }}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
