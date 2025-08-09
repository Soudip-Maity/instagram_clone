// import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
// import Index from "./Routes/Index";
import Home from "./Pages/Home";
import Loginpage from "./Pages/Loginpage"
import Register from "./Pages/Register"
import Createpost from "./Component/Createpost";
import { createContext, useState } from "react";
import Editpost from "./Component/Editpost";
// import PostInfo from "./Component/PostInfo";


export const Context = createContext();
function App() {
  const [post,setpost]=useState([])
  const [postform, setpostform] = useState({
    title: "",
    content: ""
  }); 
    const [openinfo, setOpeninfo] = useState(false);
    const[singlepostinfo,setsinglepostinfo]=useState()
    const handleOpen = () => {
      setOpeninfo(true);
    };
    const handleClose = () => {
      setOpeninfo(false);
    }; 
const[likecount,setlikecount]=useState()
const[users,setusers]=useState()
  return (
      <Context.Provider value={{ post, setpost,postform ,setpostform,handleOpen,handleClose,openinfo,setOpeninfo,singlepostinfo,setsinglepostinfo,likecount,setlikecount,users,setusers}}>
       <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/post' element={<Home/>}/>
          <Route path='/login' element={<Loginpage/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/createpost' element={<Createpost/>}/>
          <Route path='/editpost' element={<Editpost/>}/>
          
      </Routes>
</Context.Provider>
  );
}

export default App;
