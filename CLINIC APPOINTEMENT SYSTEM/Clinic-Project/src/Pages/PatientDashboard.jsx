import React, { useEffect } from "react";
import "./PatientDashboard.css";
import LogoutIcon from '../assets/Logout.png'
import { useCookies } from "react-cookie";
import { getAuth, signOut } from "firebase/auth";
import app from "../Config/Firebase";
import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {
    const navigate = useNavigate()    
    const doctors = [
        { name: "Dr. John Doe", status: "Available", available: true },
        { name: "Dr. Jane Smith", status: "Not Available", available: false },
        { name: "Dr. Michael Watson", status: "Not Available", available: false },
        { name: "Dr. Emily Johnson", status: "Available", available: true },
        { name: "Dr. Emily Johnson", status: "Available", available: true },
        { name: "Dr. Emily Johnson", status: "Available", available: true },
        { name: "Dr. Emily Johnson", status: "Available", available: true },
        { name: "Dr. Emily Johnson", status: "Available", available: true },
        { name: "Dr. Emily Johnson", status: "Available", available: true },
    ];

    const [cookies ,setCookie, removeCookie] = useCookies([]);
    const userId = location.pathname.toString().split('/')[2]
    useEffect(() => {

        const userCookies = cookies[`Token_${userId}`]
        console.log('Save cookies: ' + cookies[`Token_${userId}`]);
        console.log(userId);
        if (userId == userCookies) {
            // yaha par jo database sy data ay ga 
            // us ko state mein store karna ho ga
            // phir html mein render karna ho ga
        }
    }, [])


    const auth = getAuth(app);
    
    const handleLogoutBtn = () => {
        signOut(auth).then(() => {
            alert('logout Successfull')
            removeCookie(`Token_${userId}`, { path: "/" });
            navigate('/')
        }).catch((error) => {
            // An error happened.
            alert(error.message)
        });
    }


    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div className="header-main">
                    <h1>Patient Dashboard</h1>
                    <button
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
                <section className="doctors-section">
                    {doctors.map((doc, index) => (
                        <div className="doctor-card" key={index}>
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
                                alt="Doctor"
                            />
                            <div className="doctor-info">
                                <h3>{doc.name}</h3>
                                <span
                                    className={`status ${doc.available ? "available" : "not-available"
                                        }`}
                                >
                                    {doc.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </section>

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
            <button className="appointment-btn">Get Appointment</button>
        </div>
    );
};

export default PatientDashboard;
