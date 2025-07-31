import { useSocket } from '../context/SocketProvider'
import { useEffect, useState, useCallback, useRef } from 'react'
import ReactPlayer from 'react-player'
import { useNavigate } from 'react-router-dom'
function Room() {
    const navigate = useNavigate()
    const socket = useSocket()
    const [remoteSocketId, setRemoteSocketId] = useState(null)
    const [remoteSocketName, setRemoteSocketName] = useState(null)
   
    const handleUserJoined = useCallback(({ name, id }) => {
        console.log("New User Joined", name);
        setRemoteSocketId(id)
        setRemoteSocketName(name)
    }, [])

    useEffect(() => {
        socket.on("User:Joined", handleUserJoined)
        return () => {
            socket.off("User:Joined", handleUserJoined)
        }

    }, [socket, handleUserJoined])


    const [myStream, setMyStream] = useState()

    const videoRef = useRef(null)

    useEffect(() => {
        if (videoRef.current && myStream) {
            videoRef.current.srcObject = myStream;
        }
    }, [myStream]);

    const handleCallBtn = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        })
        setMyStream(stream)

    }, [])

    const handleEndCallBtn = useCallback(()=>{
        setMyStream(null)
    },[])

    const handleBackBtn = ()=>{
        navigate("/")
    }
    return (
        <div>
            <button onClick={handleBackBtn}>{'<--'}</button>
            <h1>Welcome to Room</h1>
            <h2>{remoteSocketId ? "Conneted" : "No In Room"}</h2>
            <h2>{remoteSocketName ? `User : ${remoteSocketName}` : null}</h2>
            {remoteSocketId && <button onClick={handleCallBtn}>CALL</button>}<br />
            {myStream && (
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    style={{ width: '500px', height: '300px' }}
                />
            )}
            {myStream && <button onClick={handleEndCallBtn} >END CALL</button>}
        </div>
    )
}

export default Room