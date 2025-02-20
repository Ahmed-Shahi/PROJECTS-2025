import React,{useState,useEffect} from 'react'
import './Header.css'
import { onAuthStateChanged ,getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { getDatabase  } from "firebase/database";
import { app } from '../../FIREBASE-Config/Config';
// import Logo from '../../Assests/Logo.png'
import logout1 from "../../Assests/logout.png"
// import Cards from "../Components/Cards/Cards"
const auth = getAuth();
const db = getDatabase(app);

function Header() {

    const navigate = useNavigate()
 // id ka name render karny ky liy// 
  const [userEmail, setUserEmail] = useState(null);
   useEffect( ()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem("userId",user.uid)
        if(!user.displayName){
          setUserEmail(user.email);
          console.log("User email:", user.email);
        }else{
          setUserEmail(user.displayName)
          console.log("User Name:", user.displayName);
        }
      } else {
        // No user is signed in, redirect to login
        navigate('/SignIn');
      }
      return () => unsubscribe();
    });

  },[navigate])

  // logout karny kt liy
  const Logout = ()=>{
    signOut(auth).then(() => {
      alert('logout Successfull')
      navigate('/SignIn')
      localStorage.clear();
    }).catch((error) => {
      // An error happened.
    });
  }
    return (
        <div>

            <div className="header-container">
                <div className="logo-container">
                    {/* <img src={Logo} alt="Logo" className="logo" /> */}
                </div>
                <div className="profile-info">
                    {userEmail}
                </div>
                <button
                    className="logout-button"
                    onClick={Logout}
                >
                    <img src={logout1} alt="Logout" className="logout-icon" />

                </button>
            </div>
        </div>
    )
}

export default Header