import React, { useContext, useEffect, useState } from "react";
import Sidenavbar from "./Sidenavbar";
import Infobar from "./Infobar";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Context } from "../App";

export default function Editpost() {
    const documentId= localStorage.getItem("Edit_documentId")
        const {post,}=useContext(Context)
  const[editpostfrom,seteditpostfrom]=useState({
      title: "",
      content: ""
    })
  const [open, setOpen] = React.useState(false);
      const [error, seterror] = useState("");
    
    const token = localStorage.getItem("jwt")
      const navigate = useNavigate();

useEffect(() => {
  const currentPost = post.find((p) => p.documentId === documentId);
  if (currentPost) {
    seteditpostfrom({
      title: currentPost.title,
      content: currentPost.content,
    });
  }
}, [documentId, post,seteditpostfrom]);




    
      const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

    const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );


const handlesetpost=(e)=>{
    console.log(e);

    console.log(e.target.name);

    seteditpostfrom({ ...editpostfrom, [e.target.name]: e.target.value });
}



  const handlepostedit = (documentId) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      data: {
        user: 2,
        title: editpostfrom.title,
        content: editpostfrom.content,
      },
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
    `  http://localhost:1337/api/posts/${documentId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) =>{ if (result.error) {
          seterror(result.error.message);
          setOpen(true);
        } else{
            console.log(result)
        seteditpostfrom({ title: "", content: "" }); 

           navigate("/");
        }})
      .catch((error) => {
        seterror(error);
        setOpen(true);
      });
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
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={error}
            action={action}
          />
          <TextField
            size="small"
            label="Title"
            value={editpostfrom.title}
            name="title"
            onChange={handlesetpost}
          />
          <TextField
            size="small"
            label="Content"
            value={editpostfrom.content}
            name="content"
            onChange={handlesetpost}
          />

          <Button
            variant="contained"
            onClick={() => handlepostedit(documentId)}
          >
            update
          </Button>
        </div>
      </div>

      <Infobar />
    </div>
  );
}
