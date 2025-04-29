import React from "react";

const CardGrid = ({ items }) => (
  <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
    {items.map((item) => (
      <div
        key={item.id}
        style={{
          background: "#2f3136",
          borderRadius: "8px",
          padding: "16px",
          cursor: "pointer",
        }}
        onClick={() => window.open(item.link, '_blank')}

      >
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <p style={{ color: "#b9bbbe" }}>
          🟢 {item.online.toLocaleString()} Online • 👥 {item.members.toLocaleString()} Members
        </p>
      </div>
    ))}
  </div>
);

export default CardGrid;
