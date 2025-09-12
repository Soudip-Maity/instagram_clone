import React, { useState } from "react";
import { Button, TextField, Snackbar, IconButton, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useEditPostsMutation } from "../Redux/Services/Post";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

export default function Editpost({ post }) {
  const userid = localStorage.getItem("userid");
  const [openModal, setOpenModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState("");

  
  const [editData, setEditData] = useState({
    title: post?.title || "",
    content: post?.content || "",
    user: userid,
  });
console.log("pagla",useEditPostsMutation());

  
  const [editPostApi, { isLoading }] = useEditPostsMutation();

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditorChange = (event, editor) => {
    setEditData({ ...editData, content: editor.getData() });
  };

const handleUpdate = async () => {
  try {
    const documentId = localStorage.getItem("Edit_documentId");
    if (!documentId) {
      setError("Post ID missing!");
      setOpenSnackbar(true);
      return;
    }

    await editPostApi({ documentId, editpost: editData }); 
    setOpenModal(false);
  } catch (err) {
    console.error("Update failed:", err);
    setError("Failed to update post");
    setOpenSnackbar(true);
  }
};


  return (
    <>
  
     <Button
  onClick={() => {
    localStorage.setItem("Edit_documentId", post.documentId); 
    setOpenModal(true);
  }}
>
  <EditIcon sx={{ color: "white" }} />
</Button>


   
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div style={modalStyle}>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={4000}
            onClose={() => setOpenSnackbar(false)}
            message={error}
            action={
              <IconButton size="small" color="inherit" onClick={() => setOpenSnackbar(false)}>
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          />

          <TextField
            size="small"
            label="Title"
            fullWidth
            value={editData.title}
            name="title"
            onChange={handleChange}
          />

          <CKEditor
            editor={ClassicEditor}
            data={editData.content}
            onChange={handleEditorChange}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleUpdate}
            disabled={isLoading}
            sx={{ mt: 2 }}
          >
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </div>
      </Modal>
    </>
  );
}
