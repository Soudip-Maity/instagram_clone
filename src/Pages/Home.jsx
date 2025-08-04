// import { Button } from "@mui/material";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidenavbar from "../Component/Sidenavbar";
import Post from "../Component/Post";
import Infobar from "../Component/Infobar";

//  export const Context = createContext()

export default function Home() {



  const jwts = localStorage.getItem("jwt");
  const navigate = useNavigate();
  useEffect(() => {
    if (!jwts) navigate("/login");
  }, []);
 
  return (

    <div
      style={{
        boxSizing: "border-box",
        display: "flex",
        width: "100%",
        height: "100vh",
        backgroundColor: "black ",
      }}
    >
      <Sidenavbar />

      <Post />

     <Infobar/>
    </div>

  );
}



// React.useEffect(() => {
//   fetch(
//     "http://localhost:1337/api/posts?populate[user][populate]=*&populate[tags][populate]=*&&populate[post_likes][populate]=*"
//   )
//     .then((r) => r.json())
//     .then((data) => {
//       console.log(data);
//     });
// }, []);
