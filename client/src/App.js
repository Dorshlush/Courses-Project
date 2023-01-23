import './App.css';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './components/registrationForm'
import LoginForm from "./components/loginForm"
import Nav from "./components/nav"
import Home from './components/home';
import AllCourses from "./components/allCourses"
import UserCourses from "./components/userCourses"
import ChangePassword from "./components/changePassword"


function App() {
  
  return (
    <div className='app'>
    <Fragment>

   <Nav/>
   <div className='container'>
    <Routes>
      <Route path="/login" element={<LoginForm />}/>
      <Route path="/signup" element={<RegistrationForm/>}/>
      <Route path="/Home" element={<Home/>}/>
      <Route path="/allcourses" element={<AllCourses/>}/>
      <Route path="/usercourses" element={<UserCourses/>}/>
      <Route path="/changePassword" element={<ChangePassword/>}/>
    
    </Routes>
    </div>
  </Fragment>
  </div>
  );
}

export default App;
