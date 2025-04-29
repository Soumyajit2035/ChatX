import React, { useState } from "react";
import Button from "@mui/material/Button";
import GroupsIcon from "@mui/icons-material/Groups";
import { styled } from "@mui/system";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

const SidebarContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "72px",
  backgroundColor: "#202225",
  height: "100%",
  paddingTop: "10px",
  position: "relative",
});

const ServerContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "10px",
});

const ServerIcon = styled("div")({
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  backgroundColor: "#5865F2",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#4752C4",
  },
});

const ServerName = styled("p")({
  fontSize: "12px",
  color: "white",
  marginTop: "5px",
  textAlign: "center",
  wordBreak: "break-word",
});

const JoinButton = styled(Button)({
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  backgroundColor: "#3BA55D",
  color: "white",
  marginTop: "auto", // Dynamically adjust based on servers
  "&:hover": {
    backgroundColor: "#2C8A4E",
  },
});

const GroupsButton = styled(Button)({
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  backgroundColor: "#5865F2",
  color: "white",
  marginBottom: "20px",
  "&:hover": {
    backgroundColor: "#4752C4",
  },
});

const ModalContainer = styled("div")({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "300px",
  backgroundColor: "#2f3136",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const MainPageButton = () => {
  const [servers, setServers] = useState([
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newServerName, setNewServerName] = useState("");
  const [newServerIcon, setNewServerIcon] = useState(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewServerName("");
    setNewServerIcon(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewServerIcon(reader.result); // Store the base64 image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateServer = () => {
    if (newServerName && newServerIcon) {
      const newServer = {
        id: servers.length + 1,
        name: newServerName,
        icon: newServerIcon,
      };
      setServers([...servers, newServer]);
      handleCloseModal();
    } else {
      alert("Please provide both a server name and an icon.");
    }
  };

  return (
    <SidebarContainer>
      <GroupsButton>
        <GroupsIcon />
      </GroupsButton>
      {servers.map((server) => (
        <ServerContainer key={server.id}>
          <ServerIcon>
            <img
              src={server.icon}
              alt={server.name}
              style={{ width: "24px", height: "24px", borderRadius: "50%" }}
            />
          </ServerIcon>
          <ServerName>{server.name}</ServerName>
        </ServerContainer>
      ))}
      <JoinButton onClick={handleOpenModal}>+</JoinButton>

      {/* Modal for creating a new server */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <ModalContainer>
          <TextField
            label="Server Name"
            variant="outlined"
            fullWidth
            value={newServerName}
            onChange={(e) => setNewServerName(e.target.value)}
            sx={{ input: { color: "white" }, label: { color: "#b9bbbe" } }}
          />
          <Button
            variant="contained"
            component="label"
            style={{ marginTop: "10px", backgroundColor: "#5865F2", color: "white" }}
          >
            Upload Icon
            <input type="file" hidden onChange={handleImageUpload} />
          </Button>
          {newServerIcon && (
            <img
              src={newServerIcon}
              alt="Preview"
              style={{ width: "48px", height: "48px", marginTop: "10px", borderRadius: "50%" }}
            />
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateServer}
            style={{ marginTop: "10px" }}
          >
            Create Server
          </Button>
        </ModalContainer>
      </Modal>
    </SidebarContainer>
  );
};

export default MainPageButton;
