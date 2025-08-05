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
      <h4 style={{   background: "linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: "bold",}}> 𝓲𝓷𝓼𝓽𝓪𝓰𝓻𝓪𝓶</h4>

      <div
        style={{
          boxSizing: "border-box",
          width: "100%",
          padding:"20px",
          backgroundColor: "black",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          fontSize: "40px",
        }}
      >
        <Link to={"/"}>
        <Button  sx={{color:"white ",display:"flex",justifyContent:"space-between",width:"120px", transition: "background-color 0.3s ease ", '&:hover': {
              color: 'white',          
              backgroundColor: ' #565656ff',  
            }}}> 
          <HomeIcon sx={{color:"white"}} fontsize="large" />
          Home
        </Button>
        </Link>
    
        <Button  sx={{color:"white ",display:"flex",justifyContent:"space-between",width:"120px", transition: "background-color 0.3s ease ",  '&:hover': {
              color: 'white',          
              backgroundColor: ' #565656ff',  
            }}}>
          <SearchIcon sx={{color:"white"}} fontsize="large" />
          search
        </Button>

            <Link to={"/createpost"} style={{textDecoration:"none"}}>
             <Button sx={{color:"white ",display:"flex",justifyContent:"space-between",width:"120px", transition: "background-color 0.3s ease ",  '&:hover': {
              color: 'white',          
              backgroundColor: ' #565656ff',  
            }}}>
          <AddBoxIcon sx={{color:"white"}} fontsize="large" />
          create
        </Button>
        </Link>
       
      </div>
    </div>
  );
}
