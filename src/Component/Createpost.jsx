import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useCreateNewPostMutation } from "../Redux/Services/Post";

export default function Createpost({ darkMode }) {
  const userid = parseInt(localStorage.getItem("userid"));
  const [createNewPost] = useCreateNewPostMutation();

  const [open, setOpen] = React.useState(false);
  const [newPost, setNewPost] = React.useState({
    title: "",
    content: "",
    user: userid,
  });

  const textColor = darkMode ? "#fff" : "#000";
  const bgColor = darkMode ? "#121212" : "#fff";
  const hoverBg = darkMode ? "#2a2a2a" : "#e0e0e0";

  const handleCreatepost = async () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      alert("Title and content are required!");
      return;
    }

    try {
      await createNewPost(newPost).unwrap();
      alert("Post created successfully!");
      setNewPost({ title: "", content: "", user: userid });
      setOpen(false);
    } catch (err) {
      alert("Error creating post");
    }
  };

  return (
    <>
      {/* CREATE BUTTON */}
      <Button
        onClick={() => setOpen(true)}
        fullWidth
        sx={{
          color: textColor,
          justifyContent: "flex-start",
          gap: "15px",
          padding: "10px 10px",
          
          "&:hover": { backgroundColor: hoverBg },
        }}
      >
        <AddBoxIcon />
        Create
      </Button>

      {/* MODAL */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: bgColor,
            color: textColor,
            boxShadow: 24,
            p: 3,
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <TextField
            size="small"
            label="Title"
            value={newPost.title}
            onChange={(e) =>
              setNewPost({ ...newPost, title: e.target.value })
            }
            InputLabelProps={{ style: { color: textColor } }}
            InputProps={{ style: { color: textColor } }}
          />

          <CKEditor
            editor={ClassicEditor}
            data={newPost.content}
            onChange={(e, editor) =>
              setNewPost({ ...newPost, content: editor.getData() })
            }
          />

          <Button variant="contained" onClick={handleCreatepost}>
            Create
          </Button>
        </Box>
      </Modal>
    </>
  );
}
