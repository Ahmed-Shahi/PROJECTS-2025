import React from 'react'
import { useState } from 'react';
import './SignUp.css'
import eyeOpen from '../assets/EyeOpen.png'
import eyeClosed from '../assets/EyeClosed.png'
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from '../Config/Firebase'
import axios from 'axios'

function SignUp() {
    const auth = getAuth(app);

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate()

    const [userEmail, setUserEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [userPassword, setUserPassword] = useState('')



    const handleSignUp = async () => {

        await axios.post('http://localhost:8000/api/users', { userName, userEmail, userPassword });
        alert('Successfully Sign UP')
        setUserEmail('');
        setUserName('');
        setUserPassword('');
        navigate('/Login')

    }

    return (
        <div className="signup-page" >
            <div className="signup-container">
                <h2>Sign up</h2>
                <p className="subtitle">
                    Create an account or <a href="/Login">Sign in</a>
                </p>


                <label>Email Address</label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={userEmail}
                    onChange={(e) => { setUserEmail(e.target.value) }} />

                <label>Username</label>
                <input
                    type="text"
                    placeholder="Enter your username"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)} />

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
                    onClick={handleSignUp}>
                    Sign up
                </button>

                <p className="terms">
                    By signing up to create an account you are accepting our{" "}
                    <a>terms of services</a> and{" "}
                    <a>privacy policy</a>.
                </p>
            </div>
        </div>
    );
}
export default SignUp