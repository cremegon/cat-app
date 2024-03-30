import { createUserWithEmailAndPassword } from 'firebase/auth';
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {auth} from "../firebase"

const Signup = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const navigate = useNavigate();

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCredentials)
      const user = userCredentials.user;
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch(error){
      console.error(error)
    }
  }
  return (
    <div>
        <h1>SignUp Page</h1>
        <form onSubmit={handleSubmit}>
            <input type='email'
            placeholder='Enter email here'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)} />

            <input type='password'
            placeholder='Enter password here'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)} />

            <button type='Submit'> SignUp</button>
            <p>Need to Login?<Link to="/login">Login</Link></p>
        </form>
    </div>
  )
}

export default Signup