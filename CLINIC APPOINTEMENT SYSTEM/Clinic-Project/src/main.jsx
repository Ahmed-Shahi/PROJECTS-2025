import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes , Route } from 'react-router-dom'
import SignUp from './Pages/SignUp.jsx'
import Login from './Pages/Login.jsx'
import PatientDashboard from './Pages/PatientDashboard.jsx'
import { CookiesProvider } from 'react-cookie'; 

createRoot(document.getElementById('root')).render(
    <CookiesProvider>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<App/>}/>
    <Route path='/SignUp' element={<SignUp/>}/>
    <Route path='/Login' element={<Login/>}/>
    <Route path='/Dashboard/:id' element={<PatientDashboard/>}/>
    </Routes>  
    </BrowserRouter>
    </CookiesProvider>
)
