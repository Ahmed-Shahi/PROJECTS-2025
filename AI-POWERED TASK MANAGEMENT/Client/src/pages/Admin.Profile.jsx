import {useState} from 'react'
import Header from '../Components/Header'
import Admin_Body from '../Components/Admin.Body'
import Left from '../Components/Left'
import './Admin.Profile.css'
function Admin_Profile() {
      const [action , setAction] = useState()
  
  return (
     <div className="layout">
      {/* Fixed Header */}
      <Header />

      <div className="content">
        {/* Sidebar */}
        <Left setAction={setAction} />

        {/* Main Body */}
        <Admin_Body action={action} />
      </div>
    </div>
  )
}

export default Admin_Profile