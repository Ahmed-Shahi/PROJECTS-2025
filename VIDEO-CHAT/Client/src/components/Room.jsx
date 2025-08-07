import { useSocket } from '../context/SocketProvider'
import { useEffect, useState, useCallback, useRef, use } from 'react'
import { useNavigate } from 'react-router-dom'
import peer from '../service/peer'

function Room() {
    const navigate = useNavigate()
    const socket = useSocket()
    const [remoteSocketId, setRemoteSocketId] = useState()
    const [remoteSocketName, setRemoteSocketName] = useState(null)
    const [myStream, setMyStream] = useState()
    const [remoteStream, setRemoteStream] = useState()

    const handleUserJoined = useCallback(async ({ name, id }) => {
        console.log("New User Joined", name, id);
        setRemoteSocketId(id)
        setRemoteSocketName(name)
    }, [])


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
        stream.getTracks().forEach(track => {
            peer.peer.addTrack(track, stream);
        });
        const offer = await peer.getOffer()
        socket.emit("User:Call", { to: remoteSocketId, offer })

    }, [socket, remoteSocketId])


    const handleIncomingCall = useCallback(async ({ from, offer }) => {
        setRemoteSocketId(from);
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        });
        setMyStream(stream);

        stream.getTracks().forEach(track => {
            peer.peer.addTrack(track, stream);
        });

        const ans = await peer.getAnswer(offer);
        socket.emit("Accepted:Call", { to: from, ans });
    }, [socket]);


    const handleAcceptedCall = useCallback(async ({ from, ans }) => {
        await peer.setLocalDescriptions(ans)
        console.log("Call Accepted!!");
        // sendStreamsBtn()
    }, [])

    const handleNegoNeeded = useCallback(async () => {
        const offer = await peer.getOffer()
        socket.emit("Peer:Nego:Needed", { to: remoteSocketId, offer })
    }, [remoteSocketId, socket])

    useEffect(() => {
        peer.peer.addEventListener("negoNeeded", handleNegoNeeded)
        return () => {
            peer.peer.removeEventListener("negoNeeded", handleNegoNeeded)
        }
    }, [handleNegoNeeded])

    const handlePeerNegoIncoming = useCallback(async ({ from, offer }) => {
        const ans = await peer.getAnswer(offer)
        socket.emit("Peer:Nego:Done", { to: from, ans })
    }, [socket])

    const handlePeerNegoFinal = useCallback(async ({ from, ans }) => {
        await peer.setLocalDescriptions(ans)
    }, [])

    const remoteRef = useRef(null)

    useEffect(() => {
        if (remoteStream) {
            console.log("Setting remote stream with tracks:", remoteStream.getTracks());
        }
        if (remoteRef.current && remoteStream) {
            remoteRef.current.srcObject = remoteStream;
        }
    }, [remoteStream]);

    useEffect(() => {
        peer.peer.addEventListener("track", async (ev) => {
            const remoteStream = ev.streams;
            console.log("GOT TRACKS!!");
            setRemoteStream(remoteStream[0]);
        });
    }, []);



    useEffect(() => {
        handleCallBtn()
        socket.on("User:Joined", handleUserJoined)
        socket.on("Incoming:Call", handleIncomingCall)
        socket.on("Accepted:Call", handleAcceptedCall)
        socket.on("Peer:Nego:Needed", handlePeerNegoIncoming)
        socket.on("Peer:Nego:Final", handlePeerNegoFinal)
        return () => {
            socket.off("User:Joined", handleUserJoined)
            socket.off("Incoming:Call", handleIncomingCall)
            socket.off("Accepted:Call", handleAcceptedCall)
            socket.off("Peer:Nego:Needed", handlePeerNegoIncoming)
            socket.off("Peer:Nego:Final", handlePeerNegoFinal)
        }

    }, [socket, handleUserJoined, handleIncomingCall, handleAcceptedCall, handlePeerNegoIncoming, handlePeerNegoFinal])




    const handleEndCallBtn = useCallback(() => {
        if (peer.peer) {
            peer.peer.close();
        }
    }, [])

    const handleBackBtn = () => {
        navigate("/")
    }
    return (
        <div>
            <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1000 }}>
                <button
                    onClick={handleBackBtn}
                    style={{
                        padding: '10px 20px',
                        borderRadius: '8px',
                        border: 'none',
                        background: 'linear-gradient(45deg,  #ff6ec4, #7873f5)',
                        color: 'Black',
                        fontSize: '16px',
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease',
                        fontWeight: 'bolder'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                >
                    {"<<BACK"}
                </button>
            </div>
            <h1>WELCOME TO ROOM '{localStorage.getItem("data")}'</h1>
            <h2>{remoteSocketId ? `✅'${remoteSocketName}' CONNECTED` : "NO ONE IN ROOM"}</h2>
            {remoteSocketId && <button onClick={handleCallBtn}
                style={{
                    padding: '10px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'linear-gradient(45deg, #83e92fff, #2f7f44ff)',
                    color: 'white',
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}>CALL</button>}<br />
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
                {myStream && (
                    <div style={{
                        border: '5px solid',
                        borderImage: 'linear-gradient(45deg, #ff6ec4, #7873f5) 1',
                        borderRadius: '10px',
                        padding: '5px'
                    }}>
                        <h3 style={{ textAlign: 'center', margin: '5px 0' }}>(YOU)</h3>
                        <video
                            ref={videoRef}
                            autoPlay
                            muted
                            playsInline
                            style={{ width: '400px', height: '250px', borderRadius: '8px' }}
                        />
                    </div>
                )}

                {remoteStream && (
                    <div style={{
                        border: '5px solid',
                        borderImage: 'linear-gradient(45deg, #00c6ff, #0072ff) 1',
                        borderRadius: '10px',
                        padding: '5px'
                    }}>
                        <h3 style={{ textAlign: 'center', margin: '5px 0' }}>({remoteSocketName}) </h3>
                        <video
                            ref={remoteRef}
                            autoPlay
                            playsInline
                            style={{ width: '400px', height: '250px', borderRadius: '8px' }}
                        />
                    </div>
                )}
            </div>
            <br /><br />
            {remoteStream && <button onClick={handleEndCallBtn} disabled={!remoteStream} style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(45deg, #da1414ff, #e76464ff)',
                color: 'white',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
            }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}>END CALL</button>}
            {/* <button onClick={handleEndCallBtn} >END CALL</button> */}
        </div>
    )
}

export default Room