import React, { useState } from "react";
import { discoverCategories } from "./categoriesData";
import CategoryFilter from "./CategoryFilter";
import CardGrid from "./CardGrid";
import SearchBar from "./SearchBar";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";

const DiscoverDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState("gaming");
  const [searchTerm, setSearchTerm] = useState("");

  const currentCategory = discoverCategories.find(
    (cat) => cat.id === selectedCategory
  );

  const filteredItems = currentCategory?.items?.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        padding: isMobile ? "10px" : "20px",
        background: "#1e1f22",
        minHeight: "100vh",
        color: "white",
        width: "-webkit-fill-available",
      }}
    >
      <Typography variant={isMobile ? "h5" : "h3"} gutterBottom>
        Discover
      </Typography>

      <SearchBar searchTerm={searchTerm} onChange={setSearchTerm} />

      <Box sx={{ mt: 2 }}>
        <CategoryFilter
          categories={discoverCategories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
          isMobile={isMobile}
        />
      </Box>

      <Box sx={{ mt: 3 }}>
        <CardGrid items={filteredItems} isMobile={isMobile} />
      </Box>
    </Box>
  );
};

export default DiscoverDashboard;
