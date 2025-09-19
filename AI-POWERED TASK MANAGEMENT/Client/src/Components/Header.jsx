import React, { useState, useEffect } from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom';
import logout1 from "../Assests/logout.png"
import axios from 'axios'
import { useLocation } from "react-router-dom";
function Header() {

    const location = useLocation();
    const navigate = useNavigate()

    // id ka name render karny ky liy// 
    const [userRole, setUserRole] = useState(null);
    const [userName, setUserName] = useState(null);
    useEffect(() => {
        const getData = async () => {
            const url = location.pathname.toString().split('/')
            const index = url.length - 1

            const path = location.pathname.toString().split('/')[index]
            console.log("Path:", path);

            const getEmail = await axios.get(`http://localhost:8000/api/profile/${path}`, {
                withCredentials: true
            })
            console.log(getEmail);

            if (path == getEmail.data.onlyLogin[0]._id.toString()) {
                console.log(getEmail.data);
                setUserName(getEmail.data.onlyLogin[0].userName)
                setUserRole(getEmail.data.onlyLogin[0].role)
            }
        }
        getData()

    }, [setUserName])

    // logout karny kt liy
    const Logout = async () => {
        const url = location.pathname.toString().split('/')
        const index = url.length - 1

        const path = location.pathname.toString().split('/')[index]
        console.log("Logout Path:", path);
        await axios.post(`http://localhost:8000/api/profile/${path}/logout`, {}, {
            withCredentials: true
        });
        setUserName("")
        navigate('/login')
    }
    return (
        <div>

            <div className="header-container">
                <div className="logo-container">

                </div>
                <div className="profile-info">

                    <strong>{userName}</strong>
                    <span style={{ fontSize: '10px' }}> {userRole}</span>

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