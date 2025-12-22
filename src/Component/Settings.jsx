import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import SettingsIcon from "@mui/icons-material/Settings";
import EditUsers from "./EditUsers";

export default function Settings({ darkMode }) {
  const [open, setOpen] = React.useState(false);

  const textColor = darkMode ? "#fff" : "#000";
  const bgColor = darkMode ? "#121212" : "#fff";
  const hoverBg = darkMode ? "#2a2a2a" : "#e0e0e0";

  return (
    <>
      {/* SETTINGS BUTTON */}
      <Button
        onClick={() => setOpen(true)}
        fullWidth
        sx={{
          color: textColor,
          justifyContent: "flex-start",
          gap: "15px",
          padding: "10px 12px",
          textTransform: "none",
          "&:hover": { backgroundColor: hoverBg },
        }}
      >
        <SettingsIcon />
        Settings
      </Button>

      {/* MODAL */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: bgColor,
            color: textColor,
            boxShadow: 24,
            p: 3,
            borderRadius: "10px",
          }}
        >
          <EditUsers />
        </Box>
      </Modal>
    </>
  );
}
