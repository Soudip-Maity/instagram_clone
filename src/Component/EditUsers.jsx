import React, { useState } from "react";
import { Button, TextField, Snackbar, IconButton, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { useEditProfileMutation } from "../Redux/Services/Post";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "white",
  borderRadius: "8px",
  boxShadow: 24,
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

export default function EditUsers({ user }) {
  const userid = localStorage.getItem("userid");
  const [openModal, setOpenModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState("");

  const [editData, setEditData] = useState({
    username: user?.username ,
    email: user?.email ,
    password: user?.password,
  });
  console.log("useEditProfileMutation", useEditProfileMutation());

  const [edituserApi, { isLoading }] = useEditProfileMutation();

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const userid = localStorage.getItem("userid");
      if (!userid) {
        setError("user ID missing!");
        setOpenSnackbar(true);
        return;
      }

      await edituserApi({ userid, editProfile: editData });
      alert("profile updated successfully")
      setOpenModal(false);
    } catch (err) {
      console.error("Update failed:", err);
      setError("Failed to update user");
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <Button
        onClick={() => {
          setEditData({
            username: user?.username || "",
            content: user?.content || "",
            user: userid,
          });
          setOpenModal(true);
        }}
      >
        <EditIcon /> edit profile
      </Button>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div style={modalStyle}>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={4000}
            onClose={() => setOpenSnackbar(false)}
            message={error}
            action={
              <IconButton
                size="small"
                color="inherit"
                onClick={() => setOpenSnackbar(false)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          />

          <TextField
            size="small"
            label="User Name"
            fullWidth
            value={editData.username}
            name="username"
            onChange={handleChange}
          />
          <TextField
            size="small"
            label="Email"
            fullWidth
            value={editData.email}
            name="email"
            onChange={handleChange}
          />
          <TextField
            size="small"
            label="New Password"
            fullWidth
            value={editData.password}
            name="password"
            onChange={handleChange}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleUpdate}
            disabled={isLoading}
            sx={{ mt: 2 }}
          >
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </div>
      </Modal>
    </>
  );
}
