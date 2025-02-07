import React, { useState } from 'react';
import { app } from '../FIREBASE-Config/Config'
import { getAuth, createUserWithEmailAndPassword,GoogleAuthProvider ,signInWithPopup  } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { Link, useNavigate } from 'react-router-dom';

import './SignUp.css'    

const db = getDatabase(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


function SignUp() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
// 
const handleLogin = () => {
    createUserWithEmailAndPassword(auth, email , password ,username)
    .then((userCredential) => {
        
        
                const user = userCredential.user;
                set(ref(db,'Account/' + username ),
                    {
                        displayName:`${username}`,
                        AccountID: `${user.uid}`,
                        Email: `${email}`,
                        Password: `${password}`,
                    })
                alert('Successfully Sign UP')
                setUsername('');
                setPassword('');
                navigate('/SignIn')
            })
            .catch((error) => {
                // const error Code = error.code;
                // const errorMessage = error.message;
                alert(error);
                // setUsername('');
                // setPassword('');
            });
        }
        const handleGoogle = ()=>{
            signInWithPopup(auth, provider)
        .then((result) => {
        //   const credential = GoogleAuthProvider.credentialFromResult(result);
        //   const token = credential.accessToken;
          alert('Successfully Login')
          navigate('/Profile')
          provider.setCustomParameters({
            
          });
    
        //   const user = result.user;
        }).catch((error) => {
        //   const errorCode = error.code;
        //   const errorMessage = error.message;
        //   const email = error.customData.email;
        //   const credential = GoogleAuthProvider.credentialFromError(error);
        });
     }
         
        // console.log('Logging in with:', username, password);


    return (
        <div class="signin-page">
    <div class="form-container">
        <div class="title-container">
            <h2>SIGN UP</h2>
        </div>
        <br />
        <input
            class="form-control rounded-pill"
            type="text"
            placeholder="Enter Full Name Here..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        <input
            class="form-control rounded-pill"
            type="email"
            placeholder="Enter Email Here..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <input
            class="form-control rounded-pill"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button class="rounded-pill signup-button" onClick={handleLogin}>
            SIGN UP
        </button>
        <button class="rounded-pill google-button" onClick={handleGoogle}>
            SIGN IN WITH GOOGLE
        </button>
        <h1>Have an Account?? <span><Link to="/SignIn">Login</Link></span></h1>
    </div>
</div>

    )};
    
export default SignUp