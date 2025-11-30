import React from 'react'
import { useState } from 'react';
import './Login.css'
import eyeOpen from '../assets/EyeOpen.png'
import eyeClosed from '../assets/EyeClosed.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


function Login() {


    const [showPassword, setShowPassword] = useState(false);

    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!userEmail || !userPassword) {
            alert('Email and Password cannot be empty');
            return;
        }

        const response = await axios.get('http://localhost:8000/api/login');
        const data = response.data
        const userData = data.find((u) => u.email === userEmail);
        console.log(userData);

        if (!userData) {
            alert("Invalid Email!!")
        } else {
            const response = await axios.post("http://localhost:8000/api/login", {
                userEmail,
                userPassword
            }, { withCredentials: true });
            if (response.data.Message == 'Password Incorrect!!') {
                alert("Invalid Password")
            } else {
                console.log(response.data);
                navigate(`/dashboard/${userData._id}`)
            }
        }
    }



    return (
        <div className="signup-page">
            <div className="signup-container">
                <h2>Login</h2>
                <p className="subtitle">
                    Don't have an account <a href="/SignUp">Sign Up</a>
                </p>


                <label>Email Address</label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={userEmail}
                    onChange={(e) => { setUserEmail(e.target.value) }} />


                <label>Password</label>
                <div className="password-field">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        required
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)} />

                    <span
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ?
                            <img src={eyeOpen} alt="" className='eye' /> :
                            <img src={eyeClosed} alt="" className='eye' />}
                    </span>
                </div>


                <button
                    className="signup-btn"
                    onClick={handleLogin}
                >
                    Log In
                </button>

                <div>
                    <br />
                </div>
            </div>
        </div>
    );
}
export default Login