import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidenavbar from "../Component/Sidenavbar";
import Post3 from "../Component/Post3";
import Infobar from "../Component/Infobar";

export default function Home() {
  const jwts = localStorage.getItem("jwt");
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") !== "light"
  );

  useEffect(() => {
    if (!jwts) navigate("/login");
  }, [jwts, navigate]);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: darkMode ? "#000" : "#fff",
        color: darkMode ? "#fff" : "#000",
      }}
    >
      <Sidenavbar darkMode={darkMode} />
      <Post3 darkMode={darkMode} />
      <Infobar darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
}
