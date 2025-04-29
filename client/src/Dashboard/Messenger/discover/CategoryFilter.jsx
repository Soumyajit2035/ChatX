import React from "react";

const CategoryFilter = ({ categories, selected, onSelect }) => (
  <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
    {categories.map((cat) => (
      <button
        key={cat.id}
        onClick={() => onSelect(cat.id)}
        style={{
          backgroundColor: selected === cat.id ? "#5865f2" : "#2f3136",
          color: "white",
          padding: "8px 16px",
          border: "none",
          borderRadius: "6px",
        }}
      >
        {cat.title}
      </button>
    ))}
  </div>
);

export default CategoryFilter;
