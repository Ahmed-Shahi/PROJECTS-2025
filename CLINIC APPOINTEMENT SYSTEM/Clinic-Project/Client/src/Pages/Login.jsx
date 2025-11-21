import React from 'react'
import { useState } from 'react';
import './Login.css'
import eyeOpen from '../assets/EyeOpen.png'
import eyeClosed from '../assets/EyeClosed.png'
import googleIcon from '../assets/GoolgeIcon.png'
import { useNavigate } from 'react-router-dom';
import app from '../Config/Firebase'
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios from 'axios'


function Login() {

    const auth = getAuth(app);

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

    const provider = new GoogleAuthProvider();

    const handleGoogleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                console.log(token);

                // The signed-in user info.

                const userId = result.user.uid;
                console.log(userId);
                setCookie(`Token_${userId}`, userId, { path: '/' });
                alert('Successfully Login')
                setUserEmail('');
                setUserPassword('');
                navigate(`/Dashboard/${userId}`)
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
                // The email of the user's account used.
                // const email = error.customData.email;
                // alert(email)
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
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
                        onClick={handleGoogleLogin}
                    >
                        <img src={googleIcon} alt="logo" className='googleIcon' /><span className='google-btn-text'> Log in With Google</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Login