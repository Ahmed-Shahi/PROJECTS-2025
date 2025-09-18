import React from 'react'
import Header from '../Components/Header'
import User_Body from '../Components/User.Body'
import Left from '../Components/Left'
import './Admin.Profile.css'
function User_Profile() {
  return (
     <div className="layout">
      {/* Fixed Header */}
      <Header />

      <div className="content">
        {/* Sidebar */}
        <Left />

        {/* Main Body */}
        <User_Body />
      </div>
    </div>
  )
}

export default User_Profile