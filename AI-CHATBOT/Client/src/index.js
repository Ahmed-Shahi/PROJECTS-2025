import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import SignUp from './PAGES/SignUp';
import SignIn from './PAGES/SignIn';
import Profile from './PAGES/Profile';
import Store from './PAGES/Store';
import App from './App';
import Protected from './Components/Protected/Protected';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>} />
      <Route path='/SignIn' element={<SignIn/>} />
      <Route path='/Profile' element={<Profile/>} />
      <Route path='/Store' element={<Protected Component={Store}/>} />

    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
