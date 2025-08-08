import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
// import BottomNavigation from '@mui/material/BottomNavigation';
// import BottomNavigationAction from '@mui/material/BottomNavigationAction';

export default function Sidenavbar() {
    // const [value, setValue] = React.useState(0);
  return (
    <div
      style={{
        boxSizing: "border-box",
        width: "15%",
        height: "100vh",
        padding: "10px 10px",
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
          // padding:"10px",
          backgroundColor: "black",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          fontSize: "40px",
        }}
      >
            {/* <BottomNavigation
            style={{display:"flex",justifyContent:"flex-start",flexDirection:"column",gap:"50px"}}
        showLabels
        value={value}

        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon sx={{color:"white",background:"transparent "}} fontsize="large" />} />
        <BottomNavigationAction label="Search" icon={<SearchIcon sx={{color:"white"}} fontsize="large" />} />
        <BottomNavigationAction label="Create" icon={<AddBoxIcon  sx={{color:"white"}} fontsize="large" />} />
      </BottomNavigation> */}



        <Link to={"/"} style={{textDecoration:"none",width:"100%"}}>
        <Button  sx={{color:"white ",display:"flex",gap:"20px",width:"100%", transition: "background-color 0.3s ease ", '&:hover': {
              color: 'white',          
              backgroundColor: ' #565656ff',  
            }}}> 
          <HomeIcon sx={{color:"white"}} fontsize="large" />
          Home
        </Button>
        </Link>
    
        <Button  sx={{color:"white ",display:"flex",gap:"20px",width:"100%", transition: "background-color 0.3s ease ",  '&:hover': {
              color: 'white',          
              backgroundColor: ' #565656ff',  
            }}}>
          <SearchIcon sx={{color:"white"}} fontsize="large" />
          search
        </Button>

            <Link to={"/createpost"} style={{textDecoration:"none",width:"100%"}}>
             <Button sx={{color:"white ",display:"flex",gap:"20px",width:"100%", transition: "background-color 0.3s ease ",  '&:hover': {
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
