import React, { useState, useMemo, useEffect } from "react";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import CloseIcon from "@mui/icons-material/Close";
import InputAdornment from "@mui/material/InputAdornment";
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import Createpost from "./Createpost";
import { useGetAllUsersQuery } from "../Redux/Services/Post";

export default function Sidenavbar({ darkMode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const { data, isLoading, error } = useGetAllUsersQuery();

  /* 🔍 DEBUG (DO NOT REMOVE UNTIL IT WORKS) */
  useEffect(() => {
    console.log("RAW API RESPONSE 👉", data);
  }, [data]);

  /* ✅ UNIVERSAL USER NORMALIZATION (NO GUESSING) */
  const users = useMemo(() => {
    if (!data) return [];

    // ✅ Strapi v4: { data: { data: [] } }
    if (Array.isArray(data?.data?.data)) {
      return data.data.data
        .map((u) => ({
          id: u.id,
          username: u.attributes?.username || "",
        }))
        .filter((u) => u.username);
    }

    // ✅ REST API: { data: [] }
    if (Array.isArray(data?.data)) {
      return data.data
        .map((u) => ({
          id: u.id,
          username: u.username || "",
        }))
        .filter((u) => u.username);
    }

    // ✅ Direct array: []
    if (Array.isArray(data)) {
      return data
        .map((u) => ({
          id: u.id,
          username: u.username || "",
        }))
        .filter((u) => u.username);
    }

    return [];
  }, [data]);

  /* 🔍 DEBUG FILTER */
  useEffect(() => {
    console.log("QUERY 👉", query);
    console.log("USERS 👉", users);
  }, [query, users]);

  /* ✅ SEARCH FILTER */
  const filteredUsers = useMemo(() => {
    if (!query.trim()) return [];
    return users.filter((u) =>
      u.username.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, users]);

  const textColor = darkMode ? "#fff" : "#000";
  const bgColor = darkMode ? "#000" : "#f5f5f5";
  const hoverBg = darkMode ? "#1f1f1f" : "#ddd";

  return (
    <>
      {/* BACKDROP */}
      {searchOpen && (
        <div
          onClick={() => setSearchOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backdropFilter: "blur(6px)",
            backgroundColor: "rgba(0,0,0,0.4)",
            zIndex: 5,
          }}
        />
      )}

      <div style={{ display: "flex", zIndex: 10 }}>
        {/* SIDEBAR */}
        <div
          style={{
            width: "220px",
            height: "100vh",
            backgroundColor: bgColor,
            borderRight: "1px solid #222",
            padding: "15px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <h3
            style={{
              background: "linear-gradient(45deg, #9B5DE0, #D78FEE)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "24px",
              fontWeight: "bold",
              margin: 0,
              cursor: "pointer",
            }}
          >
            ᏞᎥᏁᏦᏬᏢ
          </h3>

          <Link to="/" style={{ textDecoration: "none" }}>
            <Button fullWidth sx={btn(textColor, hoverBg)}>
              <HomeIcon /> Home
            </Button>
          </Link>

          <Button
            fullWidth
            sx={btn(textColor, hoverBg)}
            onClick={() => setSearchOpen(true)}
          >
            <SearchIcon /> Search
          </Button>

          <Link to="/explore" style={{ textDecoration: "none" }}>
            <Button fullWidth sx={btn(textColor, hoverBg)}>
              <ExploreIcon /> Explore
            </Button>
          </Link>

          <Createpost darkMode={darkMode} />
        </div>

        {/* SEARCH PANEL */}
        {searchOpen && (
          <div
            style={{
              width: "320px",
              height: "100vh",
              backgroundColor: darkMode ? "#0f0f0f" : "#fff",
              borderRight: "1px solid #222",
              padding: "15px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3 style={{ color: textColor }}>Search</h3>
              <CloseIcon
                style={{ cursor: "pointer", color: textColor }}
                onClick={() => setSearchOpen(false)}
              />
            </div>

            {/* SEARCH INPUT */}
           <TextField
  color="secondary"
  size="small"
  placeholder="Search users..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  fullWidth
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon sx={{ color: darkMode ? "#bbb" : "#666" }} />
      </InputAdornment>
    ),
  }}
  sx={{
    backgroundColor: darkMode ? "#121212" : "#fff",
    borderRadius: "6px",
    "& .MuiInputBase-input": {
      color: darkMode ? "#ffffff" : "#000000", // ✅ TEXT COLOR FIX
    },
    "& .MuiInputBase-input::placeholder": {
      color: darkMode ? "#aaaaaa" : "#666666", // ✅ PLACEHOLDER
      opacity: 1,
    },
    "& .MuiOutlinedInput-root fieldset": {
      borderColor: darkMode ? "#444" : "#ccc",
    },
    "& .MuiOutlinedInput-root.Mui-focused fieldset": {
      borderColor: "#9B5DE0",
    },
  }}
/>


            {/* RESULTS */}
            <div style={{ flex: 1, overflowY: "auto" }}>
              {isLoading && <p>Loading...</p>}

              {error && <p style={{ color: "red" }}>API Error</p>}

              {!isLoading && query && filteredUsers.length === 0 && (
                <p style={{ color: "#888" }}>No users found</p>
              )}

              {filteredUsers.map((u) => (
                <Link
                  key={u.id}
                  to={`/user/${u.id}`}
                  onClick={() => setSearchOpen(false)}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      padding: "10px",
                      borderRadius: "8px",
                      backgroundColor: hoverBg,
                      marginBottom: "6px",
                      color: textColor,
                    }}
                  >
                    {u.username}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

/* BUTTON STYLE */
const btn = (color, hover) => ({
  color,
  justifyContent: "flex-start",
  gap: "12px",
  "&:hover": { backgroundColor: hover },
});
