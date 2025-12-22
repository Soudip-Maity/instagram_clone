import { Password } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function Loginpage() {
  const jwts = localStorage.getItem("jwt");
  const [userdetails, setuserdetails] = useState({ email: "", password: "" });
  const [error, seterror] = useState("");

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (jwts) navigate("/");
  }, []);

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

  const navigate = useNavigate();

  const handlesetdetails = (e) => {
    console.log(e);

    console.log(e.target.name);

    setuserdetails({ ...userdetails, [e.target.name]: e.target.value });
  };

  const handlesubmit = () => {
    if (!userdetails.email) {
      setOpen(true);
      seterror("enter email");
      return;
    }
    if (!userdetails.password) {
      setOpen(true);
      seterror("enter password");
      return;
    }
    console.log(userdetails);
    const formdata = new FormData();
    formdata.append("identifier", userdetails.email);
    formdata.append("password", userdetails.password);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("http://localhost:1337/api/auth/local", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.error) {
          seterror(result.error.message);
          setOpen(true);
        } else if (result.jwt || result.user) {
          localStorage.setItem("jwt", result.jwt);
          localStorage.setItem("username", result.user.username);
          localStorage.setItem("userid", result.user.id);
          localStorage.setItem("userDocid", result.user.documentId);
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
          // alignItems:"center"
        }}
      >
        <h1
          style={{
            background:
            "linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
       ᏞᎥᏁᏦᏬᏢ
        </h1>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              message={error}
              action={action}
            />
          </div>
          <TextField
            required={true}
            type="email"
            size="small"
            label="EMAIL"
            value={userdetails.email}
            name="email"
            onChange={handlesetdetails}
          />
          <TextField
            required={true}
            type="password"
            size="small"
            label="PASSWORD"
            value={userdetails.password}
            name="password"
            onChange={handlesetdetails}
          />
          <Button variant="contained" onClick={handlesubmit}>
            LOGIN
          </Button>
        </div>
        <Link
          to={"/register"}
          style={{
            display: "flex",
            justifyContent: "center",
            textDecoration: "none",
          }}
        >
          <Button variant="contained">CREATE ACCOUNT</Button>
        </Link>
      </div>
    </div>
  );
}
