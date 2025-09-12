import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
export default function Register() {

  const [userdetails, setuserdetails] = useState({
    usernames: "",
    email: "",
    password: "",
  });
  const [error, seterror] = useState("");
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

 

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

  const handlesetdetails = (e) => {
    console.log(e);

    console.log(e.target.name);

    setuserdetails({ ...userdetails, [e.target.name]: e.target.value });
  };

  const handlesave = () => {
    console.log(userdetails);

    const myHeaders = new Headers();
    myHeaders.append("content-type", "application/json");

    const raw = JSON.stringify({
      username: userdetails.usernames,
      email: userdetails.email,
      password: userdetails.password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:1337/api/auth/local/register", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.error) {
          seterror(result.error.message);
          setOpen(true);
        } else if (result.jwt) {
          localStorage.setItem("jwt", result.jwt);
          localStorage.setItem("username", result.user.username);
          localStorage.setItem("userid", result.user.id);

          navigate("/");
        }
      })
      .catch((error) => {
        seterror(error);
        setOpen(true);
      });
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "400px",
          height: "500px",
          backgroundColor: "whitesmoke",
          border: "5px solid green",
          borderRadius: "5px",
          padding: "10px",
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={error}
            action={action}
          />
          <TextField
            size="small"
            label="USERNAME"
            value={userdetails.usernames}
            name="usernames"
            onChange={handlesetdetails}
          />
          <TextField
            type="email"
            size="small"
            label="EMAIL"
            value={userdetails.email}
            name="email"
            onChange={handlesetdetails}
          />
          <TextField
            type="password"
            size="small"
            label="PASSWORD"
            value={userdetails.password}
            name="password"
            onChange={handlesetdetails}
          />
          <Button variant="contained" onClick={handlesave}>
            save
          </Button>
        </div>
      </div>
    </div>
  );
}
