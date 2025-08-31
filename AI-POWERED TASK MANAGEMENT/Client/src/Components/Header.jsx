import React, { useState, useEffect } from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom';
import logout1 from "../Assests/logout.png"
import axios from 'axios'

function Header() {

    const navigate = useNavigate()
    // id ka name render karny ky liy// 
    
    const [userName, setUserName] = useState(null);
    useEffect(() => {
        const getData = async () => {
            const getEmail = await axios.get('http://localhost:8000/api/profile', {
                withCredentials: true
            })

            const email = getEmail.data.user.email
            const response = await axios.get('http://localhost:8000/api/users', {
                withCredentials: true
            })
            const data = response.data
            const userData = data.find((u) => u.email === email);
            console.log(userData);
            setUserName(userData.userName)
        }
        getData()

    }, [setUserName])

    // logout karny kt liy
    const Logout = async () => {
        await axios.post("http://localhost:8000/api/logout", {}, {
            withCredentials: true
        });
        setUserName("")
        navigate('/login')
    }
    return (
        <div>

            <div className="header-container">
                <div className="logo-container">
                    {/* <img src={Logo} alt="Logo" className="logo" /> */}
                </div>
                <div className="profile-info">
                    {userName}
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