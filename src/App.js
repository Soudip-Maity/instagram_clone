// import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
// import Index from "./Routes/Index";
import Home from "./Pages/Home";
import Loginpage from "./Pages/Loginpage";
import Register from "./Pages/Register";
import Createpost from "./Component/Createpost";
import { createContext, useState } from "react";
import Editpost from "./Component/Editpost";
import PostInfo from "./Component/PostInfo";
import Post2 from "./Component/Post2";
import Post3 from "./Component/Post3";
import ErrorPage from "./Pages/ErrorPage";
import Userprofile from "./Pages/Userprofile";
import Classcomp from "./Component/Classcomp";
import ExplorePage from "./Pages/ExplorePage";
import Game from "./Component/Game"
export const Context = createContext();

function App() {
  //   const [post,setpost]=useState([])
  //   const [postform, setpostform] = useState({
  //     title: "",
  //     content: ""
  //   });
  //     const [openinfo, setOpeninfo] = useState(false);
  //     const[singlepostinfo,setsinglepostinfo]=useState()
  //     const handleOpen = () => {
  //       setOpeninfo(true);
  //     };
  //     const handleClose = () => {
  //       setOpeninfo(false);
  //     };
  // const[likecount,setlikecount]=useState()
  // const[users,setusers]=useState()
  return (


    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post" element={<Post3 />} />
      <Route path="/login" element={<Loginpage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/createpost" element={<Createpost />} />
      <Route path="/editpost" element={<Editpost />} />
      <Route path= "/user/:id" element={< Userprofile/>} />
      <Route path= "/explore" element={< ExplorePage/>} />
      <Route path="/game" element={<Game />} />
    </Routes>
  );
}

export default App;
