import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { app } from '../FIREBASE-Config/Config'
import { getAuth, signInWithEmailAndPassword,GoogleAuthProvider ,signInWithPopup } from "firebase/auth";
import './Signin.css'; 


const provider = new GoogleAuthProvider();

export default function SignIn() {
  const auth = getAuth(app);             

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert('Email and Password cannot be empty');
      return;
    }
    
    signInWithEmailAndPassword(auth , `${username}`, `${password}`)
      .then((userCredential) => {

        const user = userCredential.user;
        console.log(user);
        alert('Successfully Login')
        setUsername('');
        setPassword('');
        localStorage.setItem('Email', username)
        navigate('/Profile')

      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        alert(errorCode)
        // setUsername('');
        // setPassword('');

      });
    }
      const handleGoogle = ()=>{
        signInWithPopup(auth, provider)
    .then((result) => {
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      alert('Successfully Login')
      navigate('/Profile')


      // const user = result.user;
    }).catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // const email = error.customData.email;
      // const credential = GoogleAuthProvider.credentialFromError(error);
    });
    }
  
  return (
    <div className="signin-page">
    <div className='form-container'>
    <div>
      <h2>SIGN IN</h2>
    </div>
    <br />
    <div>
      <input
        className='form-control rounded-pill'
        type="email"
        placeholder="Enter Email Here..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>
    <div>
      <input
        className='form-control rounded-pill'
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <br />
    <div>
      <button
        className='rounded-pill'
        onClick={handleLogin}
      >
        SIGN IN
      </button>
    </div>
    <div>
      <button
        className='rounded-pill'
        onClick={handleGoogle}
      >
        SIGN IN With Google
      </button>
    </div>
    
    <div>
      <h1>Do not have an Account??
        <span>
          <Link to={'/'}> Sign UP</Link>
        </span>
      </h1>
    </div>
  </div>
</div>  
  )
}
