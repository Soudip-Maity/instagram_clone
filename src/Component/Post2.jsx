import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, TextField } from "@mui/material";
import { deletePost, addPost, editPost } from "../Redux/Reducers/PostReducer";
import { useGetAllPostsQuery } from "../Redux/Services/Post";
export default function Post2() {
  const [input, setInput] = useState("");
  const [editInput, setEditInput] = useState("");
  const [editId, setEditId] = useState(null); 
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };

  const handleAddPost = () => {
    if (input.trim()) {
      dispatch(addPost(input));
      setInput("");
    }
  };

  const handleEdit = (id, currentName) => {
    setEditId(id);
    setEditInput(currentName);
  };

  const handleUpdate = () => {
    if (editInput.trim()) {
      dispatch(editPost({ id: editId, name: editInput }));
      setEditId(null);
      setEditInput("");
    }
  };





  return (
    <div>
      <div>
        {posts.map((p) => (
          <div key={p.id}>
            {editId === p.id ? (
              <>
                <TextField
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                />
                <Button onClick={handleUpdate}>Update</Button>
              </>
            ) : (
              <>
                {p.name}
                <Button onClick={() => handleEdit(p.id, p.name)}>Edit</Button>
                <Button onClick={() => handleDelete(p.id)}>Delete</Button>
              </>
            )}
          </div>
        ))}
      </div>

      <div>
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={handleAddPost}>Add</Button>
      </div>
    </div>
  );
}
