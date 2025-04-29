import React from "react";
import Button from "@mui/material/Button";
import Avatar from "../../../shared/components/Avatar";
import Typography from "@mui/material/Typography";
import OnlineIndicator from "./OnlineIndicator";
import { useDispatch } from "react-redux";
import { chatTypes, setChosenChatDetails } from "../../../store/slices/chatSlice";
import { unfriend } from "../../../store/slices/friendsSlice"; // Import the unfriend action

const FriendsListItem = ({ id, username, isOnline }) => {
  const dispatch = useDispatch();

  const handleChooseActiveConversation = () => {
    dispatch(setChosenChatDetails({ chatDetails: { id: id, name: username }, chatType: chatTypes.DIRECT }));
  };

  const handleUnfriend = () => {
    dispatch(unfriend(id)); // Dispatch the unfriend action
  };

  return (
    <div
      style={{
        width: "100%",
        height: "42px",
        marginTop: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between", // Adjust layout for the unfriend button
        textTransform: "none",
        color: "black",
        position: "relative",
      }}
    >
      <Button
        onClick={handleChooseActiveConversation}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          textTransform: "none",
          color: "black",
          flexGrow: 1, // Allow the button to take up available space
        }}
      >
        <Avatar username={username} />
        <Typography
          style={{
            marginLeft: "7px",
            fontWeight: 700,
            color: "#f1f1f5",
          }}
          variant="subtitle1"
          align="left"
        >
          {username}
        </Typography>
        {isOnline && <OnlineIndicator />}
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleUnfriend}
        style={{
          backgroundColor: "#e74c3c",
          color: "#fff",
          textTransform: "none",
          width: "20px", 
          height: "20px",
          minWidth: "20px", 
          padding: "0",
        }}
      >
        X
      </Button>
    </div>
  );
};

export default FriendsListItem;
