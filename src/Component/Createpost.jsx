import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useCreateNewPostMutation } from "../Redux/Services/Post";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
 flexDirection:"column",
  gap: "20px",
};

export default function Createpost() {
  const userid= parseInt(localStorage.getItem("userid"));
  const [createNewPost]=useCreateNewPostMutation();
  const [newPost, setNewPost] = React.useState({title: "", content: [],user:userid });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

const handleCreatepost= async()=>{
    if (!newPost.title.trim() || !newPost.content.trim()) {
    alert("Title and content are required!");
    return;
  }

  try {
      // send newPost to API
      await createNewPost(newPost).unwrap();
      alert("Post created successfully!");
      setNewPost({ user: userid, title: "", content: "" }); 
      handleClose();
    } catch (err) {
      console.error("Failed to create post:", err);
      alert("Error creating post");
    }

}

console.log(useCreateNewPostMutation());
console.log(newPost)
  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
            color: "white ",
               display: "flex",
            gap: "20px",
            justifyContent:"flex-start",
            paddingLeft:"1px",
        
          }}
      >
        <AddBoxIcon />
        Create
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            size="small"
            label="Title"
            value={newPost.title}
       onChange={(e) =>setNewPost({ ...newPost, title: e.target.value })}
          />
          <CKEditor
            config={{
              toolbar: [
                "undo",
                "redo",
                "|",
                "heading",
                "|",
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "|",
                "link",
                "blockQuote",
              ],
              heading: {
                options: [
                  {
                    model: "paragraph",
                    title: "Paragraph",
                    class: "ck-heading_paragraph",
                  },
                  {
                    model: "heading1",
                    view: "h1",
                    title: "Heading 1",
                    class: "ck-heading_heading1",
                  },
                  {
                    model: "heading2",
                    view: "h2",
                    title: "Heading 2",
                    class: "ck-heading_heading2",
                  },
                ],
              },
            }}
            editor={ClassicEditor}
            disableWatchdog={true} // prevents watchdog constructor error
            data={newPost.content}
            
            onChange={(event,editor) =>{setNewPost({...newPost,content:editor.getData()})
          console.log("editor.getdata()",editor);
          
          }}
          />
          <Button variant="contained" onClick={handleCreatepost}>create</Button>
        </Box>
      </Modal>
    </div>
  );
}
