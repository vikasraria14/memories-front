import Post from "./Components/Post/Post";
import Form from "./Components/Form/Form";
import SignInSide from "./Components/Login/SignInSide";
import Login from "./Components/Login/Login";
import {useDispatch} from 'react-redux';
import { useState, useEffect } from "react";
import { logInUser } from "./Reducers/loggedInUserReducer";
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"
import SignUp from "./Components/SignUp/SignUp";
import Main from "./Components/Main/Main";
const App=()=>{
  
  const dispatch=useDispatch();
  
  //const loggedInUser1=window.localStorage.getItem('loggedInUser')
  //window.localStorage.setItem('loggedInUser', JSON.stringify(res) )
  //window.localStorage.removeItem('loggedInUser')

  useEffect(()=>{
    const x=window.localStorage.getItem('loggedInUser')
    if(x)
    {
      
      dispatch(logInUser(JSON.parse(x)));
      console.log(x);
    }
  },[])
  return(
    <Router >
     <div className="App">
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path="/signup" element={<SignUp />}  />
          <Route path="/" element={<Main/>} />
        </Routes>
        
      </div>
    </Router>
  )
}
export default App;