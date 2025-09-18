import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLoginBtn = async () => {


        const response = await axios.get('http://localhost:8000/api/login');
        const data = response.data
        const userData = data.find((u) => u.email === email);
        console.log(userData);

        if (!userData) {
            alert("Invalid Email!!")
        } else {
            const response = await axios.post("http://localhost:8000/api/login", {
                email,
                password
            }, { withCredentials: true });
            if (!response.data) {
                alert("Invalid Password")
            } else {
                console.log(response.data);
                if (response.data.user.role == "Team-Lead") {
                    navigate(`/profile/admin/${userData._id}`)
                }
                else {
                    navigate(`/profile/${userData._id}`)
                }

            }
        }
    }
    return (
        <div>
            <input
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
                type="email"
                placeholder='ENTER EMAIL....'
            />
            <input
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
                type="password"
                placeholder='ENTER PASSWORD....'
            />
            <button
                onClick={handleLoginBtn}
            >LOGIN
            </button>
        </div>
    )
}

export default Login