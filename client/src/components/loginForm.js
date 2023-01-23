import React from 'react';
import { useEffect,useState,useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../helpers/context';
import "./loginForm.css"



const Users = () => {
  const {setUserName,setUserEmail,setUser_id,user_id,config}=useContext(AppContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm,setConfirm]=useState('');
    const navigator=useNavigate()
    
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const confirmation = {
        email: email,
        password: password
    
      };
      
  
      try {

          const response = await axios.post('http://localhost:5000/api/login', confirmation);
           localStorage.setItem("token",response.data)
           console.log(response)
           const userD=await axios.post('http://localhost:5000/api/users/getUserByEmail',confirmation,config)
           await setUserName(userD.name)
           await setUserEmail(confirmation.email)
           await setUser_id(userD)
           
            navigator("/Home");
        } catch (error) {
          alert(error)
          setConfirm("Wrong user name or password")
          
        }
      
      };
    return (
      <>
     <div id="login">
      <form name='form-login' onSubmit={handleSubmit}>
        <span className="fontawesome-user"></span>
          <input type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required 
            id="user" placeholder="Email"/>
       
        <span className="fontawesome-lock"></span>
          <input type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required 
            id="pass" placeholder="Password"/>
        
        <input type="submit" value="Login"/>

      </form>
      </div>
      </>)
}

export default Users;

