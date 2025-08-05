import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../App";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
export default function Post() {
  const jwts = localStorage.getItem("jwt");
  const { post, setpost } = useContext(Context);

  useEffect(() => {
    console.log("post updated....");
  }, [post]);

  const handledocid = (documentId) => {
    localStorage.removeItem("Edit_documentId");
    localStorage.setItem("Edit_documentId", documentId);
  };

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

  const handlepostdelete = (documentId) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwts}`);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`http://localhost:1337/api/posts/${documentId}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
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
          gap: "20px",
          alignItems: "center",
        }}
      >
        {post.map((p) => (
          <div
            style={{
              border: "1px solid white ",
              boxSizing: "border-box",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              borderBottom: ".5px solid white ",
            }}
          >
            {console.log(p)}

            <div
              style={{
                display: "flex ",
                padding: "5px",
                justifyContent: "space-between",
              }}
            >
              <p style={{ color: "white " }}>{p.title}</p>
              <div>
                <Link to={"/editpost"}>
                  <Button onClick={() => handledocid(p.documentId)}>
                    <EditIcon sx={{ color: "white" }} />
                  </Button>
                </Link>

                <Button onClick={() => handlepostdelete(p.documentId)}>
                  <DeleteIcon sx={{ color: "white" }} />
                </Button>
              </div>
            </div>
            <div style={{ backgroundColor: "white ", padding: "5px", }}>
              {p.content}

             

             

            </div>
            <div style={{ backgroundColor: "green ", padding: "5px",display:"flex",justifyContent:"space-between",flexDirection:"column",alignItems:"flex-start" }}>
               <Checkbox
               {...label}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                
              />
              Comment section
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
