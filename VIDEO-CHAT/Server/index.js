// const express = require('express')
const { Server } = require('socket.io')
// const http = require('http')

// const app = express()
// const server = new http.createServer(app)
const io = new Server(8000, { cors: true })

io.on("connection", (socket) => {
// exports {SocketProvider,useSocket}
    // const nameToSocketIdMap = new Map()
    // const socketIdToNameMap = new Map()

    console.log("User", socket.id);
    socket.on("Join:Room", (data) => {
        const{name,room}= data
        // nameToSocketIdMap.set(name, socket.id)
        // socketIdToNameMap.set(socket.id, name)
        // console.log(nameToSocketIdMap);
        // console.log(socketIdToNameMap);
        io.to(room).emit("User:Joined",{name ,id: socket.id})
        socket.join(room)
        io.to(socket.id).emit("Join:Room",data)
        console.log(data);

    })
})


// server.listen(8000,() => console.log('Server is running on port 8000'))