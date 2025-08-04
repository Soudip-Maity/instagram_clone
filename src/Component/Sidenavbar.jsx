import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
export default function Sidenavbar() {
  return (
    <div
      style={{
        boxSizing: "border-box",
        width: "15%",
        height: "100vh",
        padding: "10px 20px",
        backgroundColor: "black",
        borderRight: ".5px solid white ",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        fontSize: "25px",
      }}
    >
      <h4 style={{ color: "white" }}> 𝓲𝓷𝓼𝓽𝓪𝓰𝓻𝓪𝓶</h4>

      <div
        style={{
          boxSizing: "border-box",
          width: "100%",

          backgroundColor: "black",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          fontSize: "40px",
        }}
      >
        <Link to={"/"}>
        <Button>
          <HomeIcon color="primary" fontsize="large" />
          Home
        </Button>
        </Link>
    
        <Button>
          <SearchIcon color="error" fontsize="large" />
          search
        </Button>

            <Link to={"/createpost"}>
             <Button>
          <AddBoxIcon color="error" fontsize="large" />
          create
        </Button>
        </Link>
       
      </div>
    </div>
  );
}
