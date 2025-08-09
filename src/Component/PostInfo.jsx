import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Context } from "../App";
import { TextField } from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

export default function PostInfo() {
  const { handleClose, openinfo, singlepostinfo,setlikecount } = React.useContext(Context);
  const jwts = localStorage.getItem("jwt");

  console.log(singlepostinfo);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  

//   React.useEffect(()=>{
//     const myHeaders = new Headers();
// myHeaders.append("Authorization", `Bearer ${jwts}`);

// const raw = "";

// const requestOptions = {
//   method: "GET",
//   headers: myHeaders,
//   body: raw,
//   redirect: "follow"
// };

// fetch("http://localhost:1337/api/post-likes", requestOptions)
//   .then((response) => response.json())
//   .then((result) => {console.log(`likes.........: ${result.data}`)
//     setlikecount(result.data)
//   })
//   .catch((error) => console.error(error));
//   },[])

  return (
    <div>
      <Modal
        open={openinfo}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 600, height: 500, display: "flex" }}>
          <div
            style={{
              minWidth: "50%",
              display: "flex",
              borderRight: ".5px solid",
              flexDirection: "column",
            }}
          >
            <b>this is the content box</b>

            {singlepostinfo && <p>{singlepostinfo.content}</p>}
          </div>

          <div
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              boxSizing:"border-box"
            }}
          >
            <div
              style={{
                width: "100%",
                boxSizing:"border-box",
                padding:0,
                margin:0
              }}
            >
              {singlepostinfo && (
                <div  style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                borderBottom: ".5px solid",
                boxSizing:"border-box",
                // height:"10%"

              }}>
                  <b style={{padding:"1px 10px",
                margin:0}}>{singlepostinfo.user?.username}</b>
                  <p style={{padding:"1px 10px",
                margin:0}}>{singlepostinfo.title}</p>
                </div>
              )}
            </div>

            <div style={{backgroundColor:"green",minHeight:"55%"}}>
                <b>comment section</b>
            </div>
            <div>
                 <div style={{display:"flex",gap:"20px",alignItems:"center",py:"10px"}}>
                               <Checkbox
                               {...label}
                                icon={<FavoriteBorder />}
                                checkedIcon={<Favorite />}
                              
                              />
                              <ChatBubbleOutlineIcon />
                    </div>
                          <div style={{paddingLeft:"10px"}}>
                                {singlepostinfo && (
                                    <>
                                <b>likes {singlepostinfo.post_likes?.length}</b>
                                <p>{singlepostinfo.publishedAt}</p>
                                </>
                            )} 
                          </div>

                <TextField size="small " placeholder="Comment" sx={{width:"100%",height:"20px"}}/>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
