import React from 'react'
import { useEffect } from 'react';
import axios from 'axios'
import { useState } from 'react';
import './Left.css'
function Left() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const path = location.pathname.toString().split('/')[2]
      console.log("Path:", path);

      const response = await axios.get(`http://localhost:8000/api/profile/${path}`, {
        withCredentials: true
      });
      const data = response.data.allData
      console.log(data);
      if (path == response.data.onlyLogin[0]._id.toString()) {        
        const name = data.map((v) => {
          return ([v.userName, v.role]);
        })
        setUsers(name)
      }

    }
    getData()
  }, [])
  return (
    <div className="left-container">
      <h2 className="left-title">MEMBERS</h2>
      <ul className="left-list">
        {users.map((value, index) => (
          <li key={index} className="left-item">
            <span className="avatar">{value[0].charAt(0).toUpperCase()}</span>
            <span className="username">
              {value[0].toUpperCase()}<br />
              <span className="userrole"> {value[1]}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Left