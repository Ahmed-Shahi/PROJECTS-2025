import React from 'react'
import './Appointment.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import LogoutIcon from '../assets/Logout.png'
import userImg from '../assets/user.png'
import { useNavigate } from 'react-router-dom'
import Booking from '../../Components/Patient-Form/Booking'

function Appointment() {
    const navigate = useNavigate()

    const userId = location.pathname.toString().split('/')[2]
    const [userName, setUserName] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [doctorData, setDoctorData] = useState()
    
    useEffect(() => {
        const getdocTime = async () => {
            const docId = location.pathname.toString().split('/')[3]
            const userId = location.pathname.toString().split('/')[2]
            const docData = await axios.get(`http://localhost:8000/api/profile/${userId}/${docId}`, { withCredentials: true })
            console.log(docData.data.docData);
            setDoctorData(docData.data.docData)
        }
        const getUserData = async () => {
            const userData = await axios.get(`http://localhost:8000/api/profile/${userId}`, { withCredentials: true })
            console.log(userData);
            if (!userData.data.onlyLogin) {
                setErrorMessage(userData.data.mes)
            } else {
                setUserName(userData.data.onlyLogin[0].userName)
            }
        }
        getUserData()
        getdocTime()
        
    }, [])

    const handleLogoutBtn = async () => {
        await axios.post(`http://localhost:8000/api/profile/${userId}/logout`, {}, {
            withCredentials: true
        });
        alert("Logout Successful !!")
        navigate('/login')
    }
    return (
        <div className="dashboard">
            {userName ?
                <>
                    <header className="dashboard-header">
                        <div className="header-main" style={{ marginTop: '-40px' }}>
                            <span>
                                <h1 style={{ textTransform: 'uppercase', fontSize: "30px" }}>
                                    <img src={userImg} style={{ width: '25px', height: '25px', margin: '0px' }} alt="" />  {userName}</h1>
                            </span>
                            <button
                                className="logoutBtn"
                                onClick={handleLogoutBtn}>
                                <img src={LogoutIcon} alt="" className="logoutIcon" />
                            </button>
                        </div>
                    </header>
                    <div className="doctor-detail-container">

                        {/* LEFT SIDE DOCTOR IMAGE */}
                        <div className="doctor-image-box">
                            <img
                                src='https://cdn-icons-png.flaticon.com/512/3774/3774299.png'
                                alt="Doctor"
                                className="doctor-image"
                            />
                        </div>

                        {/* RIGHT SIDE DETAIL SECTION */}
                        <div className="doctor-info-section">

                            <h1 className="doctor-name">
                                Prof. {doctorData.name} 
                            </h1>

                            <p className="doctor-qual">{doctorData.specialty} |  {doctorData.designation} </p>

                            {/* CLINIC BOX */}
                            <div className="clinic-box">
                                <div className="clinic-header">
                                    <span className="collapse-icon">−</span>
                                    <span>BOOK YOUR APPOINTMENT</span>
                                </div><br />
                                    <Booking/>
                            </div>
                        </div>
                    </div>

                </>
                :
                <div>
                    <h1 style={{ color: 'black' }}>{errorMessage}</h1>
                    <br />
                    <h4 style={{ color: 'black' }}>{'<<<'}Back to Login Again{">>>"} <button style={{ backgroundColor: 'red' }} onClick={() => navigate('/login')}>{'<- '}BACK </button></h4>
                </div>
            }
        </div >
    )
}

export default Appointment