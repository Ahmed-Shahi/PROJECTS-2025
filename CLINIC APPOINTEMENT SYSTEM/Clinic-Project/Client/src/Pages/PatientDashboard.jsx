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
    const [allAppointments, setAllAppointments] = useState()
    const [message, setMessage] = useState('')
    const [reply, setReply] = useState('')
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
        const getAppointmentData = async () => {
            const appointmentsData = await axios.get(`http://localhost:8000/api/profile/${userId}/appointments`, { withCredentials: true })
            const temp = [];
            appointmentsData.data.allAppointments.forEach(element => {
                if(element.userId === userId){
                    temp.push(element)                    
                    setAllAppointments(temp)
                } 
            })
            console.log("Appointment:", allAppointments)
        }
        getDoctorData()
        getUserData()
        getAppointmentData()
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

    const handleBackBtn = async () => {
        const userId = location.pathname.toString().split('/')[2]
        console.log("Logout Path:", userId);
        await axios.post(`http://localhost:8000/api/profile/${userId}/logout`, {}, {
            withCredentials: true
        });
        navigate('/login')
    }

    const chat = [];

    const handleSendMessage = async () => {
        console.log("Message Sent:", message);
        const response = await axios.post(`http://localhost:8000/api/bot`, {message: message}, {
            withCredentials: true
        });
        console.log("Response from bot:", response.data);
        setReply(response.data)
        chat.push({message: message,reply: reply})
        console.log(chat);
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
                                        <button className="details-btn" onClick={() => handleDetailsBtn(doc._id)}>Book Appointment</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* RIGHT SIDE - User Previous Appointments */}
                        <div className="appointments-section">
                            <h2>Your Appointments</h2>

                            {allAppointments && allAppointments.length > 0 ? (
                                <div className="appointments-list">
                                    {allAppointments.map((apt, index) => (
                                        <div key={index} className="appointment-card">
                                            <p><strong>Patient:</strong> {apt.patientName}</p>
                                            <p><strong>Doctor:</strong> {apt.doctor}</p>
                                            <p><strong>Date:</strong> {apt.date}</p>
                                            <p><strong>Time:</strong> {apt.time}</p>
                                            <p><strong>Disease:</strong> {apt.disease}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p style={{ marginTop: "20px" }}>No appointments booked yet.</p>
                            )}
                        </div>

                        {/* Right Section - Chatbot */}
                        <aside className="chatbot-section">
                            <h2>AI HEALTH CARE</h2>
                            <div className="chat-box"></div>
                            <div className="chat-input">
                                <input 
                                type="text"
                                placeholder="Describe symptoms here..."
                                value={message}
                                onChange={(e)=>setMessage(e.target.value)} />
                                <button onClick={handleSendMessage}>➤</button>
                            </div>
                        </aside>
                    </main>
                </>
                :
                <div>
                    <h1 style={{ color: 'black' }}>{errorMessage}</h1>
                    <br />
                    <h4 style={{ color: 'black' }}>{'<<<'}Back to Login Again{">>>"} <button style={{ backgroundColor: 'red' }} onClick={handleBackBtn}>{'<- '}BACK </button></h4>
                </div>
            }
        </div >
    );
};

export default PatientDashboard;
