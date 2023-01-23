import React, { useState,useContext } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import "./loginForm.css"
import { AppContext } from '../helpers/context';

// change password component
const ChangePassword = () => {
  const [password2, setPassword2] = useState('');
  const {user_id,config}=useContext(AppContext)
  const [password1, setPassword1] = useState('');
  const [password, setPassword] = useState('');
  const [response,setResponse]=useState("")
  const navigator=useNavigate()
  
  const handleSubmit =  async (event) => {
    event.preventDefault();
    const user = {
      currentPassword: password2,
      newPassword: password,
      user_id:user_id
    };
    if(password1===password){
    
    try {
      const response = await axios.put('http://localhost:5000/api/users/changepassword', user,config);
      setResponse("PasswordChange")
      localStorage.removeItem('token')//remove token
      navigator ('/Home')
    } catch (error) {
      console.log(error.message)
      setResponse("Failed")//moving the user the another page
      
    }
  }
  else{
    alert("The passwords are not the same!")
  };
}
 
  return (
    <>
    <div id="login">
        
    <form name='form-login' onSubmit={handleSubmit}>
    <h1>Change Password :</h1>
    <br/>
    <span className="fontawesome-lock"></span>
        <input
          type="password"
          value={password2}
          onChange={(event) => setPassword2(event.target.value)}
          required
          id="user" placeholder="Current Password"
        />
    <span className="fontawesome-lock"></span>
        <input
          type="password"
          value={password1}
          onChange={(event) => setPassword1(event.target.value)}
          required
          id="user" placeholder="New Password"
        />
      
      <span className="fontawesome-lock"></span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          id="pass" placeholder=" Confirm New Password "/>
      
      <input type="submit" value="Change Password"/>
     
      
    </form>
    </div>
    </>
  );
};

export default ChangePassword;