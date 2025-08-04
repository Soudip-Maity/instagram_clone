import { Button } from "@mui/material";
import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
export default function Infobar() {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const handlelogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div
      style={{
        boxSizing: "border-box",
        display: "flex",
        width: "20%",
        height: "100vh",
        flexDirection: "column",
        padding: "20px",
        backgroundColor:"black",
        borderLeft:".5px solid white"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 style={{ color: "white" }}>{username}</h3>
        <Tooltip title="Logout">
          <IconButton onClick={handlelogout}>
            <LogoutIcon color="error"/>
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}
