import { AppContext } from '../helpers/context';
import { useContext } from 'react';
import React from 'react';
import "./allCourses.css"

import {useEffect } from 'react';
import UserCourseCard from './userCourseCard';


const AllCourses = () => {
    //page responsible for showing all the courses the user was signed up to
   
    const {user_id,getUserId,getUserCourses,userCourses}=useContext(AppContext)
    useEffect(() => {
      getUserId();
      }, []);
    useEffect(() => {
      getUserCourses();
      }, [user_id]);
      
      
   
    return (
        <div  className="container">
            
            { userCourses.map(course=>
                    <UserCourseCard   
                    key={course.subject_id}
                    name={course.name}
                    level={course.level}
                    rating={course.rating}
                    courseNum={course.course_number}
                    />
                )}
        <div style={{ display: userCourses[0] ? 'none' : 'inline-block' }}><h1>Hello, you dont have any courses yet!<br/><br/> Go back to the All Courses page and sign up!</h1></div>
        
        </div>
       
    );
}

export default AllCourses;

