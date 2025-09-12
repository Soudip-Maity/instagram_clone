import React from "react";
import { useGetAllPostsQuery } from "../Redux/Services/Post";
import { useGetAllusersQuery } from "../Redux/Services/Post";
import ErrorPage from "../Pages/ErrorPage";
import LoadingPage from "../Pages/LoadingPage";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Editpost from "./Editpost";
import { useDeletePostMutation } from "../Redux/Services/Post";
export default function Post3() {
  const { data, isLoading, isError } = useGetAllPostsQuery();
  const [deletePost, { isLoading: deleteLoading, error: deleteError }] = useDeletePostMutation();
  const username = localStorage.getItem("username");
  console.log(useGetAllPostsQuery());
  console.log("userquery", useGetAllusersQuery());
  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useGetAllusersQuery();
  console.log("bbbbbbbbbbb", userData);

  const allpostData = data?.data || [];
  const allusers = userData?.data || [];
  console.log("llllllllll", allusers);

  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorPage />;
  if (userLoading) return <LoadingPage />;
  if (userError) return <ErrorPage />;

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  console.log(allpostData);



const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this post?")) {
    try {
      await deletePost(id).unwrap();
      console.log("Post deleted successfully");
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  }
};

  return (
    <div
      style={{
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        width: "65%",
        height: "100vh",
        borderRight: "1px solid rgba(255,255,255,0.1)",
        padding: "20px",
        color: "white",
        overflowY: "auto",
        overflowX: "hidden",
        gap: "20px",
        backgroundColor: "black",
        margin: 0,
        WebkitOverflowScrolling: "touch",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      <div
        style={{
          width: "100%",
          minHeight: "100px",
          padding: "10px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          overflowX: "auto",
          backgroundColor: "#1f1f1f",
          borderRadius: "8px",
          boxSizing: "border-box",
          gap: "20px",
          WebkitOverflowScrolling: "touch",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          margin: "0",
        }}
      >
        {userData?.map((u) => (
          <Link to={`/user/${u.id}`} style={{ textDecoration: "none" }}>
            <div
              key={u.id}
              style={{
                background:
                  "linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)",
                borderRadius: "50%",
                display: "flex",
                boxSizing: "border-box",
                overflow: "auto",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "80px",
                minWidth: "80px",
                cursor: "pointer",
                 transition: "transform 0.3s ease",
              }}
                     onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
               onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
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

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "100%",
          boxSizing: "border-box",
          justifyContent:"center",
          alignItems:"center"
        }}
      >
        {allpostData && allpostData.length > 0 ? (
          allpostData.map((d) => (
            <div
              key={d.id}
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "10px",
                overflow: "hidden",
                backgroundColor: "#1e1e1e",
                boxSizing: "border-box",
                width: "70%",
                transition: "transform 0.3s ease",
                
              }}
               onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
               onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 15px",
                  backgroundColor: "#ff9800",
                  alignItems: "center",
                  minHeight: "30px",
                }}
              >
                <div
                  style={{ display: "flex", gap: "15px", fontWeight: "bold" }}
                >
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      backgroundColor: "white",
                      fontSize: "20px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Link
                      to={`/user/${d.user?.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          localStorage.setItem("userdocId", d.user?.id)
                        }
                      >
                        {d.user?.username.toUpperCase().charAt(0)}
                      </span>
                    </Link>
                  </div>
                  <span style={{ fontWeight: "normal" }}>{d.title}</span>
                </div>

                {d.user?.username === username ? (
                  <div style={{ display: "flex", gap: "5px" }}>
             
               
                        <Editpost post={d}  />
                    
               
                    <Button size="small" onClick={() => handleDelete(d.id)}>
                      <DeleteIcon sx={{ color: "red" }} />
                    </Button>
                  </div>
                ):(<Button variant="contained" sx={{textTransform: 'none'}}>follow</Button>)}
              </div>

              <div
                style={{
                  backgroundColor: "white",
                  padding: "15px",
                  color: "blue",
                  fontSize: "14px",
                  Height: "30px",
                }}
              >
                {d.content?.map((c, i) =>
                  c.children?.map((topic, j) => (
                    <span
                      key={`${i}-${j}`}
                      dangerouslySetInnerHTML={{ __html: topic.text }}
                    />
                  ))
                )}
              </div>

              <div
                style={{
                  padding: "10px 15px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  backgroundColor: "#2e7d32",
                  color: "white",
                }}
              >
                <div
                  style={{ display: "flex", gap: "20px", alignItems: "center" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Checkbox
                      {...label}
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite />}
                      sx={{ color: "white" }}
                    />
                    <span style={{ fontSize: "16px" }}>
                      {d?.post_likes?.length || 0}
                    </span>
                  </div>
                  <ChatBubbleOutlineIcon sx={{ cursor: "pointer" }} />
                </div>
                <div style={{ fontSize: "14px" }}>Comment section</div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: "center", padding: "20px" }}>
            No posts found
          </div>
        )}
      </div>
    </div>
  );
}
