import React from 'react'
import './LandingPage.css'
import doctorImg from '../assets/Doctor.png'
import logoImg from '../assets/Logo.png'
import {useNavigate} from 'react-router-dom'

function LandingPage() {
  const navigate = useNavigate()
  
  
  const bookBtn = ()=>{
    navigate('/SignUp')
  }
  
  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="logo">
          <span className="icon">
            <img src={logoImg} alt="Logo" className='logoImg' />
          </span> Clinic
        </div>
        {/* <ul className="nav-links">
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul> */}
        <button className="doctor-btn">DOCTOR</button>
      </nav>

      <section className="hero">
        <div className="hero-text">
          <h1>
            Book Your Doctor <br />
            Appointment Online <br />— Anytime,Anywhere!
          </h1>
          <p>
            Book appointments with your preferred doctor
            <br /> at your convenience
          </p>
          <button className="book-btn" onClick={bookBtn}>Book Now</button>
        </div>
        <div className="hero-image">
          <img src={doctorImg} alt="Doctor" />
        </div>
      </section>

      <section className="features">
        <h2>FEATURES</h2>
        <div className="feature-cards">
          <div className="card">
            <div className="icon">📅</div>
            <h3>Book Appointment Easily</h3>
            <p>View doctor availability and book appointments online</p>
          </div>
          <div className="card">
            <div className="icon">👨‍⚕️</div>
            <h3>Manage Doctor Availability</h3>
            <p>Update your available time slots directly through the website</p>
          </div>
          <div className="card">
            <div className="icon">🔔</div>
            <h3>Get Appointment Reminders</h3>
            <p>Receive reminders via email or SMS before your appointments</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage;