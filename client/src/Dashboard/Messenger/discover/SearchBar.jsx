import React from "react";

const SearchBar = ({ searchTerm, onChange }) => (
  <input
    type="text"
    placeholder="Search games or servers..."
    value={searchTerm}
    onChange={(e) => onChange(e.target.value)}
    style={{
      width: "100%",
      padding: "10px",
      borderRadius: "6px",
      marginBottom: "20px",
    }}
  />
);

export default SearchBar;
