import React, { useContext, useEffect } from "react";
import { Context } from "../App";

export default function All_users() {
  const { users, setusers } = useContext(Context);
  const jwts = localStorage.getItem("jwt");

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwts}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:1337/api/users", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("Fetched users:", result.data);

        if (Array.isArray(result)) {
          setusers(result);
        } else if (result.data) {
          setusers(result.data);
        }
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, [jwts, setusers]);

  return (
    <div
      style={{
        display: "flex",
        overflow: "auto",
        gap: "30px",
          WebkitOverflowScrolling: 'touch', 
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
      }}
    >
      {users && users.length > 0 ? (
        users.map((u) => (
          <div
            key={u.id}
            style={{
              border: ".5px solid ",
              background: "linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)",
              borderRadius: "50%",
              display: "flex",
              boxSizing: "border-box",
              overflow: "auto",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "80px",
              minWidth: "80px",
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
                overflow:"hidden"
              }}
            >
              {u.username}
            </div>
          </div>
        ))
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}
