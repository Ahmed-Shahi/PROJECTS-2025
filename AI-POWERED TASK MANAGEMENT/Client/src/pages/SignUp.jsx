import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function SignUp() {

    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const navigate = useNavigate()
    
    const allRoles =  ["Content-Writer","Frontend-Developer","Backend-Developer","SEO","Quality-Assure","Project-Manager","Team-Lead"]
    
    const handleSignUpBtn = async () => {
        await axios.post('http://localhost:8000/api/users', { userName, email, password, role });
        console.log("User Register");
        navigate('/login')
    }
    return (
        <div>
            <input
                value={userName}
                onChange={(e) => { setUserName(e.target.value) }}
                type="text"
                placeholder='ENTER FULL NAME....'
            />
            <input
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
                type="email"
                placeholder='ENTER EMAIL....'
            />
            <input
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
                type="password"
                placeholder='ENTER PASSWORD....'
            />
            <select
                value={role}
                onChange={(e) => { setRole(e.target.value) }}
            >
                 <option value="" >-- Please choose an option --</option>
                {allRoles.map((v,i)=>(
                    <option key={i} value={v}>{v}</option>
                ))}
            </select>
            <button
                onClick={handleSignUpBtn}
            >SIGN UP</button>
        </div>
    )
}

export default SignUp