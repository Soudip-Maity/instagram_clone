import { Button } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Context } from "../App";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import PostInfo from "./PostInfo";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import All_users from "../Layout/All_users";
import { useGetAllPostsQuery } from "../Redux/Services/Post";

export default function Post() {
  const jwts = localStorage.getItem("jwt");
  const username = localStorage.getItem("username");
  const userDocid = localStorage.getItem("userDocid");
  const postsdata = useGetAllPostsQuery();
  console.log(postsdata);
//   const { post, setpost, setOpeninfo, setsinglepostinfo ,singlepostinfo} = useContext(Context);

//   useEffect(() => {
//     console.log("post updated....");
//   }, [post]);

//   const handledocid = (documentId) => {
//     localStorage.removeItem("Edit_documentId");
//     localStorage.setItem("Edit_documentId", documentId);
//   };

//   useEffect(() => {
//     const myHeaders = new Headers();
//     myHeaders.append("Authorization", `Bearer ${jwts}`);

//     const requestOptions = {
//       method: "GET",
//       headers: myHeaders,
//       redirect: "follow",
//     };

//     fetch("http://localhost:1337/api/posts/?populate=*", requestOptions)
//       .then((response) => response.json())
//       .then((result) => {
//         console.log(result);
//         setpost(result.data);
//       })
//       .catch((error) => console.error(error));
//   }, []);

//   console.log(`post result : ${post}`);

//   const handlepostdelete = (documentId) => {
//     const myHeaders = new Headers();
//     myHeaders.append("Authorization", `Bearer ${jwts}`);

//     const requestOptions = {
//       method: "DELETE",
//       headers: myHeaders,
//       redirect: "follow",
//     };

//     fetch(
//       `http://localhost:1337/api/posts/${documentId}/?populate=*`,
//       requestOptions
//     )
//       .then((response) => response.text())
//       .then((result) => console.log(result))
//       .catch((error) => console.error(error));
//   };

//   const handle_get_single_post_info = (documentId) => {
//     setOpeninfo(true);
//     const myHeaders = new Headers();
//     myHeaders.append("Authorization", `Bearer ${jwts}`);

//     const requestOptions = {
//       method: "GET",
//       headers: myHeaders,
//       redirect: "follow",
//     };

//     fetch(
//       `http://localhost:1337/api/posts/${documentId}/?populate=*`,
//       requestOptions
//     )
//       .then((response) => response.json())
//       .then((result) => {
//         console.log(result.data);

//         setsinglepostinfo(result.data);
//       })
//       .catch((error) => console.error(error));
//   };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

//   const handlelike = (documentId) => {
//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     myHeaders.append("Authorization", `Bearer ${jwts}`);

//     const raw = JSON.stringify({
//       data: {
//         post: documentId,
//         user: userDocid,
//       },
//     });

//     const requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: raw,
//       redirect: "follow",
//     };

//     fetch("http://localhost:1337/api/post-likes", requestOptions)
//       .then((response) => response.text())
//       .then((result) => console.log(result))
//       .catch((error) => console.error(error));
//   };

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
          height: "100px",
          padding: "10px",
          borderBottom: ".5px solid white ",
          display: "flex",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        <All_users />
      </div>
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
        {postsdata.data.map((p) =>(
          
          <div
            style={{
              border: "1px solid white ",
              boxSizing: "border-box",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              borderBottom: ".5px solid white ",
              cursor: "pointer",
            }}
          >
            {console.log(p)}

            <div
              style={{
                display: "flex ",
                padding: "5px",
                justifyContent: "space-between",
                backgroundColor: "orange",
              }}
            >
              <div style={{ color: "white ", display: "flex", gap: "20px" }}>
                {console.log("username post", p.user?.username)}
                <div>{p.user?.username}</div>
                <div>{p.title}</div>
              </div>
              <div>
                {p.user?.username === username && (
                  <div>
                    {/* <Link to={"/editpost"}>
                      <Button onClick={() => handledocid(p.documentId)}>
                        <EditIcon sx={{ color: "white" }} />
                      </Button>
                    </Link>

                    <Button onClick={() => handlepostdelete(p.documentId)}>
                      <DeleteIcon sx={{ color: "red" }} />
                    </Button> */}
                  </div>
                )}
              </div>
            </div>
            <div style={{ backgroundColor: "white ", padding: "5px" }}>
              {p.content}
              <PostInfo />
            </div>
            <div
              style={{
                backgroundColor: "green ",
                padding: "5px",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{ display: "flex", gap: "20px", alignItems: "center" }}
              >
                <div style={{ display: "flex", gap: "10px" }}>
                  <div>
                    
                    <Checkbox
                      {...label}
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite />}
                    //   onClick={() => handlelike(p.documentId)}

                    />
                     
                  
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "20px",
                    }}
                  >
                    {p?.post_likes?.length || 0}
                  </div>
             

                </div>

                <ChatBubbleOutlineIcon
                //   onClick={() => handle_get_single_post_info(p.documentId)}
                />
              </div>
              Comment section
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
