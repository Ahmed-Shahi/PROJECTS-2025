import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx'
import Admin_Profile from './pages/Admin.Profile.jsx';
import User_Profile from './pages/User.Profile.jsx';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile/:id' element={<User_Profile />} />
        <Route path='/profile/admin/:id' element={<Admin_Profile />} />
      </Routes>
    </BrowserRouter>
)
