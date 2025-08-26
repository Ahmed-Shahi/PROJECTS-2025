import React from 'react'
import { useState } from 'react'
import axios from 'axios'
function SignUp() {
    const [userName,setUserName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
  
    const handleSignUpBtn = async ()=>{
        const response = await axios.post('http://localhost:8001/api/users', { userName,email,password });
        console.log("User Register");
        
    }
    return (
    <div>
        <input 
        value={userName} 
        onChange={(e)=>{setUserName(e.target.value)}} 
        type="text"
        placeholder='ENTER FULL NAME....'
        />
        <input 
        value={email} 
        onChange={(e)=>{setEmail(e.target.value)}} 
        type="email"
        placeholder='ENTER EMAIL....'
        />
        <input 
        value={password} 
        onChange={(e)=>{setPassword(e.target.value)}} 
        type="password"
        placeholder='ENTER PASSWORD....'
        />
        <button
        onClick={handleSignUpBtn}
        >SIGN UP</button>
    </div>
  )
}

export default SignUp