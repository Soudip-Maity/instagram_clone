import { Button } from "@mui/material";
import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "./Settings";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';



export default function Infobar() {
  const username = localStorage.getItem("username");
  const userid = localStorage.getItem("userid");
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
        backgroundColor: "black",
        borderLeft: ".5px solid white",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between",alignItems:"center" }}>
       <div style={{display: "flex",justifyContent: "space-between",alignItems:"center",gap:"10px"}}>
        <div
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            backgroundColor: "white",
            fontSize: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link to={`/user/${userid}`} style={{ textDecoration: "none" }}>
            <span
              style={{ cursor: "pointer" }}
              onClick={() =>
                localStorage.setItem("userdocId",userid)
              }
            >
          {username?.toUpperCase()?.charAt(0) || ""}

            </span>
          </Link>
        </div>
        <h3 style={{ color: "white" }}>{username}</h3>
   </div>
        <Tooltip title="Logout">
          <IconButton onClick={handlelogout}>
            <LogoutIcon color="error" />
          </IconButton>
        </Tooltip>
      </div>


      <Settings/> 


          <Button   sx={{
                  color: "white ",
                  display: "flex",
                  justifyContent:"flex-start",
                  gap: "20px",
                  width: "43%",
                  textTransform:"none",
                  transition: "background-color 0.2s ease ",
                  "&:hover": {
                    color: "white",
                    backgroundColor: " #565656ff",
                  },
                }}>
                 <SportsEsportsIcon sx={{ color: "white" }} fontsize="large"  />
                  Games
              </Button>


    </div>
  );
}
