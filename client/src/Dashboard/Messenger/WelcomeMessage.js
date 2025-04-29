import React, { useState } from "react";
import { Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import DiscoverDashboard from "./discover/DiscoverDashboard";

const Wrapper = styled("div")({
  flexGrow: 1,
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f4f8fb",
});

const Card = styled("div")({
  textAlign: "center",
  padding: "40px 20px",
});

const Logo = styled("div")({
  width: 40,
  height: 30,
  backgroundColor: "#007aff",
  margin: "0 auto 20px",
  position: "relative",
  borderRadius: "2px",
  "::after": {
    content: '""',
    position: "absolute",
    bottom: -8,
    left: "50%",
    transform: "translateX(-50%)",
    width: 0,
    height: 0,
    borderLeft: "8px solid transparent",
    borderRight: "8px solid transparent",
    borderTop: "8px solid #007aff",
  },
});

const DiscoverButton = styled(Button)({
  marginTop: "20px",
  backgroundColor: "#007aff",
  color: "#fff",
  padding: "10px 24px",
  borderRadius: "6px",
  textTransform: "none",
  fontWeight: 500,
});

const WelcomeMessage = ({ username = "User" }) => {
  const [showDiscover, setShowDiscover] = useState(false); // local state

  const handleDiscoverClick = () => {
    setShowDiscover(true); // switch view to DiscoverDashboard
  };

  if (showDiscover) {
    return <DiscoverDashboard />;
  }

  return (
    <Wrapper>
      <Card>
        <Logo />
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2c3e50" }}>
          Welcome on ChatX, {username}.
        </Typography>
        <Typography variant="body1" sx={{ color: "#7f8c8d", marginTop: "8px" }}>
          Go chat with your Friends now!
        </Typography>
        <DiscoverButton onClick={handleDiscoverClick}>Discover My ChatX</DiscoverButton>
      </Card>
    </Wrapper>
  );
};

export default WelcomeMessage;
