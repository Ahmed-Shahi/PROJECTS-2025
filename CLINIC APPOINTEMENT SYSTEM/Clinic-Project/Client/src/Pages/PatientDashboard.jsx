import React, { useEffect, useState } from "react";
import "./PatientDashboard.css";
import LogoutIcon from '../assets/Logout.png'
import { useNavigate } from "react-router-dom";
import axios from 'axios'


const PatientDashboard = () => {
    const navigate = useNavigate()
    const userId = location.pathname.toString().split('/')[2]
    const [userName, setUserName] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [doctorData, setDoctorData] = useState()

    useEffect(() => {

        console.log(userId);
        const getUserData = async () => {
            const userData = await axios.get(`http://localhost:8000/api/profile/${userId}`, { withCredentials: true })
            console.log(userData);
            if (!userData.data.onlyLogin) {
                setErrorMessage(userData.data.mes)
            } else {
                setUserName(userData.data.onlyLogin[0].userName)
            }
        }
        const getDoctorData = async () => {
            const doctorData = await axios.get(`http://localhost:8000/api/profile/${userId}/doctors`, { withCredentials: true })
            console.log(doctorData.data.allDoctors);
            if (!doctorData) {
                alert("Doctors Not Found!!")
            }
            else {
                setDoctorData(doctorData.data.allDoctors)
            }
        }
        getDoctorData()
        getUserData()
    }, [setUserName])



    const handleLogoutBtn = async () => {

        const url = location.pathname.toString().split('/')
        const index = url.length - 1

        const path = location.pathname.toString().split('/')[index]
        console.log("Logout Path:", path);
        await axios.post(`http://localhost:8000/api/profile/${path}/logout`, {}, {
            withCredentials: true
        });
        alert("Logout Successful !!")
        navigate('/login')
    }

    const handleDetailsBtn = async (doctorId) => {
        const userId = location.pathname.toString().split('/')[2]
        console.log(userId);
        navigate(`/dashboard/${userId}/${doctorId}`)
    }
    return (
        <div className="dashboard">
            {userName ?
                <>
                    <header className="dashboard-header">
                        <div className="header-main">
                            <h1 style={{ textTransform: 'uppercase' }}>WELCOME {userName} !</h1><button
                                className="logoutBtn"
                                onClick={handleLogoutBtn}>
                                <img src={LogoutIcon} alt="" className="logoutIcon" />
                            </button>
                        </div>
                        <p>
                            Welcome to your Dashboard! Here you can Book Appointments with your <br />
                            preferred Doctor.
                        </p>
                    </header>

                    <main className="dashboard-main">
                        {/* Left Section - Doctors */}
                        <div className="doctors-container">
                            {doctorData.map((doc, index) => (
                                <div key={index} className="doctor-card">
                                    <img src={doc.image} alt={doc.name} className="doctor-img" style={{ width: "150px", height: '250px' }} />

                                    <div className="doctor-info">
                                        <h3 className="doctor-name" style={{ color: '#0f87ff' }}>{doc.name}</h3>
                                        <p className="doctor-designation">{doc.designation}</p>
                                        <p className="doctor-specialty">{doc.specialty}</p>
                                        <button className="details-btn" onClick={() => handleDetailsBtn(doc._id)}>View Details</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Right Section - Chatbot */}
                        <aside className="chatbot-section">
                            <h2>FAQ CHAT BOT</h2>
                            <div className="chat-box"></div>
                            <div className="chat-input">
                                <input type="text" placeholder="Ask Question Here..." />
                                <button>➤</button>
                            </div>
                        </aside>
                    </main>
                    {/* <button className="appointment-btn">Get Appointment</button> */}
                </>
                : 
                <div>
                    <h1 style={{ color: 'black' }}>{errorMessage}</h1>
                    <br />
                    <h4 style={{ color: 'black' }}>{'<<<'}Back to Login Again{">>>"} <button style={{backgroundColor:'red'}} onClick={()=>navigate('/login')}>{'<- '}BACK </button></h4>
                </div>
            }
        </div >
    );
};

export default PatientDashboard;
