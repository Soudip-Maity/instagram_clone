import React from "react";
import { useGetAllPostsQuery, useGetAllUsersQuery, useAddLikeMutation, useRemoveLikeMutation, useDeletePostMutation } from "../Redux/Services/Post";
import ErrorPage from "../Pages/ErrorPage";
import LoadingPage from "../Pages/LoadingPage";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Editpost from "./Editpost";
import PostInfo from "./PostInfo";

export default function Post3({ darkMode }) {
  const { data, isLoading, isError } = useGetAllPostsQuery();
  const { data: userData, isLoading: userLoading, isError: userError } = useGetAllUsersQuery();

  const [deletePost] = useDeletePostMutation();
  const [addLike] = useAddLikeMutation();
  const [removeLike] = useRemoveLikeMutation();

  const username = localStorage.getItem("username");
  const userId = (localStorage.getItem("userId"));

  const allpostData = data?.data || [];
  const allusers = userData?.data || [];

  if (isLoading || userLoading) return <LoadingPage />;
  if (isError || userError) return <ErrorPage />;

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deletePost(id);
      alert("Post deleted successfully");
    }
  };

  /* =====================
     LIKE / UNLIKE LOGIC
  ===================== */
  const handleLikeToggle = async (post) => {
    if (!userId) {
      alert("Please login to like posts");
      return;
    }
  await addLike({ postId: post.id, userId: Number(userId) });
    const existingLike = post.likes?.find((like) => like.user?.id === userId);

    try {
      if (existingLike) {
        await removeLike(existingLike.id).unwrap();
      } else {
        await addLike({ postId: post.id, userId });
      }
    } catch (err) {
      console.error("Like error", err);
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
        gap: "20px",
        margin: 0,
        overflow: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {/* ================= STORIES ================= */}
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
          <Link key={u.id} to={`/user/${u.id}`} style={{ textDecoration: "none" }}>
            <div
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

      {/* ================= POSTS ================= */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "100%",
          boxSizing: "border-box",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {allpostData && allpostData.length > 0 ? (
          allpostData.map((d) => {
            const userLike = d.likes?.find((like) => like.user?.id === userId);
            const isLiked = Boolean(userLike);

            return (
              <div
                key={d.id}
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  overflow: "auto",
                  backgroundColor: "#1e1e1e",
                  boxSizing: "border-box",
                  width: "70%",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                {/* HEADER */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 15px",
                    backgroundColor: "#9B5DE0",
                    alignItems: "center",
                    minHeight: "30px",
                  }}
                >
                  <div style={{ display: "flex", gap: "15px", fontWeight: "bold" }}>
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
                          onClick={() => localStorage.setItem("userdocId", d.user?.id)}
                        >
                          {d.user?.username.toUpperCase().charAt(0)}
                        </span>
                      </Link>
                    </div>
                    <span style={{ fontWeight: "normal" }}>{d.title}</span>
                  </div>

                  {d.user?.username === username ? (
                    <div style={{ display: "flex", gap: "5px" }}>
                      <Editpost post={d} />
                      <Button size="small" onClick={() => handleDelete(d.id)}>
                        <DeleteIcon sx={{ color: "red" }} />
                      </Button>
                    </div>
                  ) : (
                    <Button variant="contained" sx={{ textTransform: "none" }}>
                      follow
                    </Button>
                  )}
                </div>

                {/* CONTENT */}
                <div
                  style={{
                    backgroundColor: "D78FEE",
                    padding: "15px",
                    color: "white",
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

                {/* LIKE / COMMENTS */}
                <div
                  style={{
                    padding: "10px 15px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    backgroundColor: "#D78FEE",
                    color: "white",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <Checkbox
                        {...label}
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                        sx={{ color: isLiked ? "red" : "white" }}
                        checked={isLiked}
                        onChange={() => handleLikeToggle(d)}
                      />
                      <span style={{ fontSize: "16px" }}>
                        {d.likes?.length || 0}
                      </span>
                    </div>

                    <PostInfo post={d} />
                    <span>{d?.comments.length || 0}</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ textAlign: "center", padding: "20px" }}>No posts found</div>
        )}
      </div>
    </div>
  );
}
