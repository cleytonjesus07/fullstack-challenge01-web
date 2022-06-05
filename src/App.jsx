import {BrowserRouter as Router,Routes,Route, Navigate} from "react-router-dom"
import { useEffect, useState } from "react";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { NotFound } from "./pages/404";


export const App = () => {
  const [signinUser,setSigninUser] = useState(null);
 
  useEffect(()=>{
    if(localStorage.getItem("user_data")){
      const user_data = JSON.parse(localStorage.getItem("user_data"));
      setSigninUser(user_data);
    }
  },[])

  useEffect(()=>{
    if(signinUser){
      localStorage.setItem("user_data",JSON.stringify(signinUser));
    }
  },[signinUser])

  return (
    <Router>
      <Routes>
          <Route path="/" element={signinUser || localStorage.getItem("user_data") ? <Home user={signinUser} setSigninUser={setSigninUser}/> : <Navigate to={"/login"}/>}/>
          <Route path="/login" element={<Login setSigninUser={setSigninUser}/>} />
          <Route path="/signup" element={<Signup setSigninUser={setSigninUser}/>}/>
          <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </Router>
  )
}