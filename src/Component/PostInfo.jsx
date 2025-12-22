import { Box, Button, Modal, TextField } from "@mui/material";
import React, { useState } from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useGetAllPostsQuery, useAddCommentsMutation } from "../Redux/Services/Post";
import LoadingPage from "../Pages/LoadingPage";
import ErrorPage from "../Pages/ErrorPage";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  maxWidth: "900px",
  height: "80vh",
  backgroundColor: "#121212",
  borderRadius: "16px",
  boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
  display: "flex",
  overflow: "hidden",
};

export default function PostInfo({ post }) {
  const { data, isLoading, isError } = useGetAllPostsQuery();
  const [openModal, setOpenModal] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [addComment] = useAddCommentsMutation();

  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");

  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorPage />;

const handleAddComment = async () => {
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");

  if (!username || !userId) {
    alert("Please login to comment");
    return;
  }

  if (!commentText.trim()) return;

  try {
    await addComment({
      postId: post.id,
      content: commentText,
      userId: Number(userId),
    }).unwrap();

    // Optimistically add to comments list
    post.comments.push({
      user: { username },
      content: commentText,
    });

    setCommentText("");
  } catch (err) {
    console.error(err);
  }
};


  return (
    <>
      <Button onClick={() => setOpenModal(true)}>
        <ChatBubbleOutlineIcon sx={{ cursor: "pointer", color: "#fff" }} />
      </Button>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={modalStyle}>
          {/* LEFT – POST CONTENT */}
          <Box
            sx={{
              width: "50%",
              padding: "20px",
              borderRight: "1px solid rgba(255,255,255,0.08)",
              overflowY: "auto",
              background: "linear-gradient(180deg, #1c1c1c 0%, #121212 100%)",
            }}
          >
            {post.content?.map((c, i) =>
              c.children?.map((topic, j) => (
                <div
                  key={`${i}-${j}`}
                  dangerouslySetInnerHTML={{ __html: topic.text }}
                  style={{
                    marginBottom: "12px",
                    lineHeight: "1.6",
                    color: "#e0e0e0",
                    fontSize: "15px",
                  }}
                />
              ))
            )}
          </Box>

          {/* RIGHT – COMMENTS */}
          <Box
            sx={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#161616",
            }}
          >
            {/* HEADER */}
            <Box
              sx={{
                padding: "15px",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #9b5de5, #f15bb5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                >
                  {post.user?.username?.toUpperCase()?.charAt(0) || "U"}
                </Box>
                <b style={{ color: "#fff" }}>{post.user?.username || "Unknown"}</b>
              </Box>
              <p style={{ margin: 0, color: "#aaa", fontSize: "14px" }}>
                {post.title}
              </p>
            </Box>

            {/* COMMENTS LIST */}
            <Box
              sx={{
                flex: 1,
                padding: "15px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {post.comments.map((c, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  {/* Commenter Avatar */}
                  <Box
                    sx={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      background:
                        "linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      color: "#fff",
                      fontSize: "14px",
                      flexShrink: 0,
                    }}
                  >
                    {c.user?.username?.toUpperCase()?.charAt(0) || "U"}
                  </Box>

                  {/* Comment Text */}
                  <Box
                    sx={{
                      padding: "10px 12px",
                      backgroundColor: "#1f1f1f",
                      borderRadius: "10px",
                      fontSize: "14px",
                      color: "#e0e0e0",
                      flex: 1,
                    }}
                  >
                    {c.content || ""}
                  </Box>
                </Box>
              ))}
            </Box>

            {/* COMMENT INPUT */}
            <Box
              sx={{
                padding: "12px",
                borderTop: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Box sx={{ display: "flex", gap: "10px" }}>
                <TextField
                  size="small"
                  placeholder="Add a comment..."
                  fullWidth
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  InputProps={{
                    style: {
                      color: "#fff",
                      backgroundColor: "#1f1f1f",
                      borderRadius: "8px",
                    },
                  }}
                  InputLabelProps={{
                    style: { color: "#aaa" },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{ textTransform: "none" }}
                  onClick={handleAddComment}
                >
                  Post
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
