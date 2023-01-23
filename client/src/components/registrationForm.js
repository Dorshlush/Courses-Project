import React, { useState } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import "./loginForm.css"

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [response,setResponse]=useState("")
  const navigator=useNavigate()///moving the user the another page

  const handleSubmit =  async (event) => {
    event.preventDefault();
    const user = {
      name: name,
      email: email,
      password: password
    };
    //registartion form sending a post request to the server and responding based on the response
    try {
      const response = await axios.post('http://localhost:5000/api/users/adduser', user);
      setResponse("User created Successfuly!")
      localStorage.setItem("token",response.headers['x-auth-token'])//saving the token in the local storage
      navigator ('/Home')
    } catch (error) {
      console.log(error.message)
      alert("User alredy exist!")
      
    }
  };
   
 
  return (
    <>
    <div id="login">
    <form name='form-login' onSubmit={handleSubmit}>
    <span className="fontawesome-name"></span>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          id="user" placeholder="Name"
        />
      
      
      <span className="fontawesome-user"></span>
        <input
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          id="user" placeholder="Email"
        />
      
      
      <span className="fontawesome-lock"></span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          id="pass" placeholder="Password"/>
      
      <input type="submit" value="Register"/>
     
      
    </form>
    </div>
    </>
  );
};

export default Register;