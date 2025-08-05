import { useSocket } from '../context/SocketProvider'
import { useEffect, useState, useCallback, useRef, use } from 'react'
import { useNavigate } from 'react-router-dom'
import peer from '../service/peer'
import ReactPlayer from "react-player";

function Room() {
    const navigate = useNavigate()
    const socket = useSocket()
    const [remoteSocketId, setRemoteSocketId] = useState(null)
    const [remoteSocketName, setRemoteSocketName] = useState(null)
    const [myStream, setMyStream] = useState()
    const [remoteStream, setRemoteStream] = useState()
    
    const handleUserJoined = useCallback(({ name, id }) => {
        console.log("New User Joined", name);
        setRemoteSocketId(id)
        setRemoteSocketName(name)
    }, [])
    

    // const videoRef = useRef(null)
    // useEffect(() => {
    //     if (videoRef.current && myStream) {
    //         videoRef.current.srcObject = myStream;
    //     }
    // }, [myStream]);
    
    
    const handleCallBtn = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        })
        const offer = await peer.getOffer()
        socket.emit("User:Call", { to: remoteSocketId, offer })
        setMyStream(stream)
    
    }, [socket, remoteSocketId])
    
    const handleIncomingCall = useCallback(async ({ from, offer }) => {
        setRemoteSocketId(from)
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        })
        setMyStream(stream)
        console.log(from, offer);
        const ans = await peer.getAnswer(offer)
        socket.emit("Accepted:Call", { to: from, ans })

    }, [socket])

   
    const handleSendStream = useCallback(() => {
        for (const track of myStream.getTracks()) {
                peer.peer.addTrack(track, myStream);
            }
        }
    , [myStream, peer])

    const handleAcceptedCall = useCallback(({ from, ans }) => {
        peer.setLocalDescription(ans)
        console.log("Call Accepted!!");
        handleSendStream()
    }, [handleSendStream])

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
        await peer.setLocalDescription(ans)
    }, [])

    useEffect(() => {
        peer.peer.addEventListener("track", async (ev) => {
            const remoteStream = ev.streams;
            console.log("GOT TRACKS!!");
            setRemoteStream(remoteStream[0])
        })
    }, [setRemoteStream])

    useEffect(() => {
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


    // const remoteRef = useRef(null)
    // useEffect(() => {
    //     if (remoteRef.current && remoteStream) {
    //         remoteRef.current.srcObject = remoteStream;
    //     }
    // }, [remoteStream]);


    const handleEndCallBtn = useCallback(() => {
        setMyStream(null)
    }, [])

    const handleBackBtn = () => {
        navigate("/")
    }
    return (
        <div>
            <button onClick={handleBackBtn}>{'<--'}</button>
            <h1>Welcome to Room</h1>
            <h2>{remoteSocketId ? "Conneted" : "No In Room"}</h2>
            <h2>{remoteSocketName ? `User : ${remoteSocketName}` : null}</h2>
            {remoteSocketId && <button onClick={handleCallBtn}>CALL</button>}<br /><br />
          {myStream && (
        <>
          <h1>My Stream</h1>
          <ReactPlayer
            playing
            muted
            height="100px"
            width="200px"
            url={myStream}
          />
        </>
      )}
      {remoteStream && (
        <>
          <h1>Remote Stream</h1>
          <ReactPlayer
            playing
            muted
            height="100px"
            width="200px"
            url={remoteStream}
          />
        </>
      )}
            {/* {myStream && (
                <>
                    <h3>MY STREAM</h3>
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                        style={{ width: '500px', height: '300px' }}
                    />
                </>
            )}
            {remoteStream && (
                <>
                    <h1>Remote Stream</h1>
                    <video
                        ref={remoteRef}
                        autoPlay
                        muted
                        playsInline
                        style={{ width: '500px', height: '300px' }}
                    />
                </>
            )} */}
            <br /><br />
            {myStream && <button onClick={handleEndCallBtn} >END CALL</button>}
            {myStream && <button onClick={handleSendStream} >SEND STREAM</button>}
        </div>
    )
}

export default Room