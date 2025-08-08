import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Context } from "../App";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function PostInfo() {
  const { handleClose, openinfo, singlepostinfo } = React.useContext(Context);

  console.log(singlepostinfo);
  return (
    <div>
      <Modal
        open={openinfo}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          {singlepostinfo && (
            <>
              <p>{singlepostinfo.title}</p>
              <p>{singlepostinfo.content}</p>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
