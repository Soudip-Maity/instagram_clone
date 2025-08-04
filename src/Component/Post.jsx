import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../App";

export default function Post() {
  const jwts = localStorage.getItem("jwt");
    const {post,setpost}=useContext(Context)

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwts}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:1337/api/posts", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setpost(result.data);
      })
      .catch((error) => console.error(error));
  }, []);


  console.log(post);
  
  return (
    <div
      style={{
        boxSizing: "border-box",
        display: "flex",
        width: "65%",
        height: "100vh",
        borderRight: ".01px solid white ",
        padding: "10px",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "calc(100% - 20px)",
          height: "80px",
          padding: "10px",
          borderBottom: ".5px solid white ",
        }}
      ></div>
      <div
        style={{
          width: "100%",
          height: "100vh",
          padding: "10px 100px",
          borderBottom: ".5px solid white ",
          overflow: "auto",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap:"20px",
          alignItems: "center",
        }}
      >
        {post.map((p) => (
          <div
            style={{
              border: "1px solid white ",
              boxSizing: "border-box",
              width: "100%",
              display:"flex",
              flexDirection:"column",
              alignContent:"center",
              borderBottom:".5px solid white "
            }}
          >
            <p style={{ color: "white " }}>{p.title}</p>
            <div style={{ backgroundColor: "white ",padding:"5px" }}>{p.content}</div>
            <div style={{ backgroundColor: "green ",padding:"5px"  }}> Comment section</div>
          </div>
        ))}
      </div>
    </div>
  );
}
