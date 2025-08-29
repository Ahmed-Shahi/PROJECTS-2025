import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx';

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/profile' element={<Profile/>} />
      

    </Routes>
  </BrowserRouter>
)
