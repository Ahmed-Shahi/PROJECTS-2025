import React,{useEffect, useState} from 'react'
import './Profile.css'
import Header from '../Components/Header/Header'; 
import Body from '../Components/Body/Body'; 
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const auth = getAuth();

export default function Profile() {
   
   
  return (
    (
      <div className='Main'>
        <div>
          <Header/>
          <Body/>
        </div>
       
      </div>
    ));

}
