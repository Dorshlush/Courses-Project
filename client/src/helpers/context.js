import React, { createContext, useEffect, useState } from "react";
import axios from "axios"
export const AppContext = createContext();
const Context = (props) => {
  const { children } = props;
  const[userName,setUserName]=useState()
  const[userEmail,setUserEmail]=useState()
  const [user_id,setUser_id]=useState()
  const[userCourses,setUserCourses]=useState()
  const [visability,setVisability]=useState(false)
  
  const config = {
    headers: {
      'x-auth-token': localStorage.getItem("token") 
    }
  }; 
  const getUserId=async()=>{
    const data={email:userEmail}
    try {
      const response = await axios.post('http://localhost:5000/api/users/getUserByEmail', data,config);
      setUser_id(response.data.user_id)
    } catch (error) {
      console.log(error.message) 
    }

  };
  const getUserCourses=async()=>{
    const data={user_id:user_id}
    try {
      const response = await axios.post('http://localhost:5000/api/users/getUserCourses', data,config);
      setUserCourses(response.data)
      console.log(userCourses)
    } catch (error) {
      console.log(error.message) 
    }
  };
  
 return (
    <AppContext.Provider
    
      value={{setUserName,userName,userEmail,setUserEmail,user_id,setUser_id,setUserCourses,userCourses,getUserId,getUserCourses,config,visability,setVisability
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default Context;
