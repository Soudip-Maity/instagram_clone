// import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Index from "./Routes/Index";
import Home from "./Pages/Home";
import Loginpage from "./Pages/Loginpage"
import Register from "./Pages/Register"
import Createpost from "./Component/Createpost";
import { createContext, useState } from "react";
import Editpost from "./Component/Editpost";



export const Context = createContext();
function App() {
  const [post,setpost]=useState([])
  const [postform, setpostform] = useState({
    title: "",
    content: ""
  });  
  return (
      <Context.Provider value={{ post, setpost,postform ,setpostform}}>
       <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Loginpage/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/createpost' element={<Createpost/>}/>
          <Route path='/editpost' element={<Editpost/>}/>
          
      </Routes>
</Context.Provider>
  );
}

export default App;
