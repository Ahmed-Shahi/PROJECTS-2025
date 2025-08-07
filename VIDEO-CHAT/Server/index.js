// const express = require('express')
const { Server } = require('socket.io')
// const http = require('http')

// const app = express()
// const server = new http.createServer(app)
const io = new Server(8000, { cors: true })

io.on("connection", (socket) => {
    // exports {SocketProvider,useSocket}

    console.log("User", socket.id);
    socket.on("Join:Room", (data) => {
        const { name, room } = data
        io.to(room).emit("User:Joined", { name, id : socket.id })
        socket.join(room)
        io.to(socket.id).emit("Join:Room", data)
    })

    socket.on('User:Call', ({ to, offer }) => {
        io.to(to).emit("Incoming:Call", { from: socket.id, offer })
    })
    socket.on("Accepted:Call",({to,ans})=>{
        io.to(to).emit("Accepted:Call", { from: socket.id, ans })
    })
    socket.on("Peer:Nego:Needed",({to,offer})=>{
        io.to(to).emit("Peer:Nego:Needed", { from: socket.id, offer })
    })
    socket.on("Peer:Nego:Done",({to,ans})=>{
           io.to(to).emit("Peer:Nego:Final", { from: socket.id, ans })
    })
})


// server.listen(8000,() => console.log('Server is running on port 8000'))