import React, { useContext } from "react";
import Sidenavbar from "./Sidenavbar";
import Infobar from "./Infobar";
import { Button, TextField } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Context } from "../App";
export default function Createpost() {
        const {setpostform,postform,post,setpost}=useContext(Context)
    
    const token = localStorage.getItem("jwt")

const handlesetpost=(e)=>{
    console.log(e);

    console.log(e.target.name);

    setpostform({ ...postform, [e.target.name]: e.target.value });
}

  const handlecreatepost = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      `Bearer ${token}`
    );

    const raw = JSON.stringify({
      data: {
        title: postform.title,
        content: postform.content,
      },
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:1337/api/posts", requestOptions)
      .then((response) => response.json())
      .then((result) =>{
        console.log("Post created:", result);
        setpostform({ title: "", content: "" }); 
      })
      .catch((error) => console.error(error));
  };

  return (
    <div style={{ display: "flex", boxSizing: "border-box" }}>
      <Sidenavbar />

      <div
        style={{
          display: "flex",
          width: "65%",
          height: "100vh",
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "whitesmoke",
            width: "700px",
            height: "600px",
            borderRadius: "5px",
            boxSizing: "border-box",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <TextField
            size="small"
            label="Title"
            //  sx={{backgroundColor:"rgb(54 54 54)",color:"white",borderRadius:"5px",}}
            value={postform.title}
             name="title"
             onChange={handlesetpost}
          />
          <TextField
            size="small"
            label="Content"
            value={postform.content}
             name="content"
             onChange={handlesetpost}
            //    sx={{backgroundColor:"rgb(54 54 54)",color:"white",borderRadius:"5px",}}
          />


          <Button variant="contained" onClick={handlecreatepost}>create</Button>
        </div>
      </div>

      <Infobar />
    </div>
  );
}
