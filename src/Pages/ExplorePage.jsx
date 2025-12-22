import React from "react";
import Sidenavbar from "../Component/Sidenavbar";
import Infobar from "../Component/Infobar";
import { useGetAllUsersQuery } from "../Redux/Services/Post";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import { Link } from "react-router-dom";
export default function ExplorePage() {
  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useGetAllUsersQuery();
  const allusers = userData?.data || [];
  console.log(allusers);
  
  if (userLoading) return <LoadingPage />;
  if (userError) return <ErrorPage />;
  return (
    <div style={{ display: "flex" }}>
      <Sidenavbar />
      <div
        style={{
          boxSizing: "border-box",
          width: "65%",
          height: "100vh",
          backgroundColor: "black",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          WebkitOverflowScrolling: "touch",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          padding: "20px",
        }}
      >
        {userData?.map((u) => (
          <Link to={`/user/${u.id}`} style={{ textDecoration: "none" }}>
            <div
              key={u.id}
              style={{
                background: "linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)",
                borderRadius: "50%",
                display: "flex",
                boxSizing: "border-box",
                overflow: "auto",
                justifyContent: "center",
                alignItems: "center",
                height: "80px",
                width: "80px",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "70px",
                  width: "70px",
                  backgroundColor: "white",
                  overflow: "hidden",
                  color: "black",
                }}
                onClick={() => localStorage.setItem("userdocId", u.id)}
              >
                {u.username}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Infobar />
    </div>
  );
}
