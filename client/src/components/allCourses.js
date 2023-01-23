import { AppContext } from '../helpers/context';
import { useContext } from 'react';
import React from 'react';
import "./allCourses.css"
import axios from "axios"
import {useEffect } from 'react';

const AllCourses = () => {
    
    const {user_id,getUserId,getUserCourses,config}=useContext(AppContext)

    useEffect(() => {
      getUserId();
      }, []);
    useEffect(() => {
      getUserCourses();
      }, [user_id]);


      //handling the registration request
    const handleSubmit =  async (subject) => {
        
        const data=  {
          user_id: user_id,
          subject: subject,
         
        };
        //registartion function
        try {
          const response = await axios.post('http://localhost:5000/api/users/signup', data, config);
          alert("Registered successfuly!")
          
        } catch (error) {
          alert("You are alredy signed up for this course!")
          console.log(error.message) 
        }
      };
      //ALL the available courses Cards
    return (
        <div className="container">
  <div className="card">
    <div className="box">
      <div className="content">
        <h2>Python</h2>
        <h3>Python Programming</h3><br/><br/>
        <p>Master the basics and advanced concepts of Python.</p>
        <a  onClick={()=>{handleSubmit("Python Programming")}}>Sign-Up</a>
      </div>
    </div>
  </div>

  <div className="card">
    <div className="box">
      <div className="content">
        <h2>JavaScript Fundamentals</h2>
        <h3>JavaScript Fundamentals</h3><br/><br/><br/>
        <p>Learn to create interactive web pages using JavaScript.</p>
        <a  onClick={()=>{handleSubmit("JavaScript Fundamentals")}}>Sign-Up</a>
      </div>
    </div>
  </div>

  <div className="card">
    <div className="box">
      <div className="content">
        <h2>Full Stack Web Development</h2>
        <h3>Full Stack Web Development</h3><br/><br/>
        <p>Become a full-stack developer with our comprehensive course.</p>
        <a  onClick={()=>{handleSubmit("Full Stack Web Development")}}>Sign-Up</a>
      </div>
    </div>
  </div>

  <div className="card">
    <div className="box">
      <div className="content">
        <h2>C#</h2>
        <h3>C#</h3><br/><br/><br/><br/>
        <p>Learn to develop professional software using C#.</p>
        <a  onClick={()=>{handleSubmit("C")}}>Sign-Up</a>
      </div>
    </div>
  </div>
</div>
       
    );
}

export default AllCourses;

