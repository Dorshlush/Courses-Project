import React from 'react';
import Slideshow from './slideShow';
import { AppContext } from '../helpers/context';
import { useContext,useEffect } from 'react';
import {TypeAnimation} from "react-type-animation"

const Home = () => {
    const {user_id,getUserId,getUserCourses,}=useContext(AppContext)
    //getting all the requiered data every time the page is reloading/ refreshing
  useEffect(() => {
    getUserId();
    }, []);

  useEffect(() => {
    getUserCourses();
    }, [user_id]);
    //Home page using 2 npm liberies, react slide show and react-type-animation
    return (
      <>
      
        <div style={{height: '65%', width: '65%', marginTop:"3%", justifyContent:'center'}}>
        
            <Slideshow/>
            <br></br>
        <TypeAnimation
        id='intro'
        sequence={[
          3000,
          "Welcome to our website, your one-stop destination for all things programming. We offer a wide variety of courses for beginners to advanced programmers, covering various programming languages and technologies. Our expert instructors have real-world experience and are dedicated to helping you master the skills you need to succeed in today's digital landscape. Whether you're looking to start a new career or advance in your current one, our courses are designed to help you achieve your goals. Browse our selection and start learning today!",
          ()=>{console.log("dont typing")}
        ]}
        wrapper="h2"
        cursor={true}
        repeat={false}
        omitDeletionAnimation={true}
        />
        </div>
        
   </>
         );
}

export default Home;
