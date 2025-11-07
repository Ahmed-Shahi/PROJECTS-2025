import React from 'react'
import { useState } from 'react';
import './Login.css'
import eyeOpen from '../assets/EyeOpen.png'
import eyeClosed from '../assets/EyeClosed.png'
import googleIcon from '../assets/GoolgeIcon.png'
import { useNavigate } from 'react-router-dom';
import app from '../Config/Firebase'
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useCookies } from 'react-cookie'

function Login() {

    const auth = getAuth(app);

    const [showPassword, setShowPassword] = useState(false);

    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    // const [allCookiesName, setAllCookiesName] = useState([])

    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies([]);

    const handleLogin = (e) => {
        // setAllCookiesName((prev) => [...prev, userEmail])
        e.preventDefault();
        if (!userEmail || !userPassword) {
            alert('Email and Password cannot be empty');
            return;
        }


        signInWithEmailAndPassword(auth, `${userEmail}`, `${userPassword}`)
            .then((userCredential) => {

                const user = userCredential.user.uid;
                console.log(user);

                setCookie(`Token_${user}` , user, { path: '/' });
                alert('Successfully Login')
                setUserEmail('');
                setUserPassword('');
                navigate(`/Dashboard/${user}`)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
                setUserEmail('');
                setUserPassword('');
            });

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
                    <hr />
                    <button
                        className="google-btn"
                    // onClick={handleGoogleLogin}
                    >
                        <img src={googleIcon} alt="logo" className='googleIcon' /><span className='google-btn-text'> Log in With Google</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Login