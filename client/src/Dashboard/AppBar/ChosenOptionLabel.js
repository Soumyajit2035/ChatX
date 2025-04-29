import React from "react";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

const ChosenOptionLabel = () => {
  const chatDetails = useSelector((state) => state.chat.chosenChatDetails);
  const userDetails = useSelector((state) => state.auth.userDetails); // Access userDetails from Redux

  return (
    <>
    <div>
      <Typography sx={{ fontSize: "16px", color: "white", fontWeight: "bold" }}>
        {chatDetails
          ? `Chat with: ${chatDetails.name || "Unknown"}`
          : "Select a chat"}
      </Typography>
    </div>
    <div>
    {userDetails && (
        <Typography sx={{ fontSize: "16px", color: "white", fontWeight: "bold" }}>
          Logged in as: {userDetails.username} {/* Display the username */}
        </Typography>
      )}
    </div>
    
    </>
  );
};

export default ChosenOptionLabel;
