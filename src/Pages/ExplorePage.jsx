import React from "react";
import Sidenavbar from "../Component/Sidenavbar";
import Infobar from "../Component/Infobar";
import { useGetAllUsersQuery } from "../Redux/Services/Post";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import { Link } from "react-router-dom";

export default function ExplorePage() {
  const darkMode = localStorage.getItem("theme") !== "light";

  // ✅ SAME AS Post3 (IMPORTANT)
  const { data: userData, isLoading, isError } = useGetAllUsersQuery();

  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorPage />;

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: darkMode ? "#000" : "#fff",
      }}
    >
      <Sidenavbar darkMode={darkMode} />

      {/* EXPLORE CONTENT */}
      <div
        style={{
          width: "65%",
          height: "100vh",
          padding: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          overflowY: "auto",
          backgroundColor: darkMode ? "#0f0f0f" : "#fafafa",
          scrollbarWidth: "none",
        }}
      >
        {userData?.map((u) => (
          <Link
            key={u.id}
            to={`/user/${u.id}`}
            style={{ textDecoration: "none" }}
            onClick={() => localStorage.setItem("userdocId", u.id)}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(45deg, #9B5DE0, #D78FEE,#4f5bd5)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#000",
                    overflow:"hidden"
                  }}
                >
                  {u.username}
                </div>
              </div>

              <span
                style={{
                  marginTop: "6px",
                  display: "block",
                  color: darkMode ? "#fff" : "#000",
                }}
              >
                {u.username}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <Infobar darkMode={darkMode} />
    </div>
  );
}
