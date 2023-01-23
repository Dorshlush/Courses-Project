import React from 'react';
import "./nav.css"
import { Link,useNavigate } from 'react-router-dom';



function Nav() {
    const navigate=useNavigate()
   
    //nav bar, the display is changing based on the token 
  return (
    <ul className="snip1143">
  <li className="current"><Link to="/Home" data-hover="Home">Home</Link></li>
  <li><Link to="/allcourses" data-hover="All Courses">All Courses</Link></li>
  <li  style={{ display: localStorage.getItem('token') ? 'inline-block' : 'none' }}><Link to="/usercourses" data-hover="My Courses">My Courses</Link></li>
  <li  style={{ display: localStorage.getItem('token') ? 'none' : 'inline-block' }}><Link to="/signup" data-hover="Sign-up">Sign-up</Link></li>
  <li  style={{ display: localStorage.getItem('token') ? 'none' : 'inline-block' }}><Link to="/login" data-hover="Log-In">Log-In</Link></li>
  <li  style={{ display: localStorage.getItem('token') ? 'inline-block' : 'none' }}><Link to="/changePassword" data-hover="Change Passowrd">Change Passowrd</Link></li>
  <li style={{ display: localStorage.getItem('token') ? 'inline-block' : 'none' }} onClick={()=>{
          localStorage.removeItem('token')
          navigate("/Home")}}><a data-hover="Log-Out">Log-Out</a></li>
  
</ul>
  );
}

export default Nav;

