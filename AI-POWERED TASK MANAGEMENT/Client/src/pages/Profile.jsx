import React from 'react'
import Header from '../Components/Header'
import Body from '../Components/Body'
import Left from '../Components/Left'
import './Profile.css'
function Profile() {
  return (
     <div className="layout">
      {/* Fixed Header */}
      <Header />

      <div className="content">
        {/* Sidebar */}
        <Left />

        {/* Main Body */}
        <Body />
      </div>
    </div>
  )
}

export default Profile