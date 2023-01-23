import React from 'react';
import {useContext } from 'react';
import axios from 'axios'
import "./userCourseCard.css"
import c from "../helpers/images/c.jpeg"
import fullStack from "../helpers/images/fullStack.jpg"
import js from "../helpers/images/js.png"
import python from "../helpers/images/python.jpg"
import { AppContext } from '../helpers/context';
import { useNavigate } from 'react-router-dom';
import Popup from './popup';





const UserCourseCard = (props) => {
    const {user_id}=useContext(AppContext)
    const navigator=useNavigate()
    const{name,rating,level,courseNum}=props
    let starRate = []
    for(let i=0;i<=rating;i++){
        starRate.push(<i className="fa fa-star" aria-hidden="true"></i>)
    }
    const {visability,setVisability}=useContext(AppContext)

 
    let image=[]
    //chosing the img based on the name, this component responsible for the userCourseCard linked to the "userCourses.js" where the 
    //user can see his courses
    if (name === "C ") {
        image.push(<img src={c} alt={name}/>)
      } else if (name === "Full Stack Web Development ") {
        image.push(<img src={fullStack} alt={name}/>)
      } else if (name === "JavaScript Fundamentals ") {
        image.push(<img src={js} alt={name}/>)
      } else if (name == "Python Programming ") {
        image.push(<img src={python} alt={name}/>)
      }
   //delete course from user courses array using delete request
      const deleteCourse=async()=>{
        const config = {
              headers: {
                'x-auth-token': localStorage.getItem("token")
                
              }
            };
        try {
          console.log(name)
          const response = await axios.delete(`http://localhost:5000/api/users/leavecourse/${user_id}/${name}`, config)
          console.log(response)
          setVisability(false)
          navigator("/Home")
        } catch (error) {
          console.log(config)
        }
      }
    
    return (
        <>
     
        <div id="container">	
        <Popup deleteCourse={deleteCourse}/>
        
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
	
	<div className="product-details">
	<h1>{name}</h1>
  <h3>Course number: {courseNum}</h3>
	<span className="hint-star star">
		{starRate}
	</span>
		<h3>Level: {level}</h3>
        <h5>this is the best course in the world it will make you a proffesional programmar and developer and will be able to earn 50k$ a month!</h5>
    <div className="control"><label className="modal-open " for="modal-open">
	<button onClick={()=>{setVisability(true)}} className=" btn"><a href="#modal" role="button" className="button button__link">
	 <span className="price">X</span>
   <span className="shopping-cart"><i className="fa fa-trash"  aria-hidden="true"></i></span>
   <span className="buy" >Leave</span>
   
 </a></button>
 
 </label>
 
</div>		
</div>

	
<div className="product-image">
        {image}
</div>
  </div>
</>
    );
}

export default UserCourseCard;
