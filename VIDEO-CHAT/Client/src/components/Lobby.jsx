import { useState } from 'react'
import { useCallback } from 'react'
import { useSocket } from '../context/SocketProvider'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Lobby() {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const navigate = useNavigate()
    const socket = useSocket();
    // console.log(socket);
     
    const handleJoinRoom = (data)=>{
        const {name,room} = data
        console.log(name,room);
        navigate(`/room/${room}`)
        }
    useEffect(()=>{
        socket.on("Join:Room",handleJoinRoom)
    },[socket,handleJoinRoom])
    
    const handleJoinBtn = useCallback((e) => {
        e.preventDefault();
        // console.log({ name, room });
        socket.emit("Join:Room",{name,room})

    }, [name, room, socket])
    
    
    return (
        <>
            <form onSubmit={handleJoinBtn}>
                <input type="text" placeholder='ENTER FULL NAME' onChange={(e) => setName(e.target.value)} value={name} />
                <input type="number" placeholder='ENTER ROOM NO' onChange={(e) => setRoom(e.target.value)} value={room} />
                <button >JOIN</button>
            </form>
        </>
    )
}

export default Lobby
