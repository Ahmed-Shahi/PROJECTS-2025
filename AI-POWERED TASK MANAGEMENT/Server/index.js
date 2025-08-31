require('dotenv').config()
const express = require('express')
const {Connect} = require("./connection")
const authRouter = require('./Router/Auth.Route')
const profileRouter = require('./Router/Profile.Route')
const cors = require('cors')
const cookieParser = require('cookie-parser') 

const app = express()
const PORT = process.env.PORT 
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173", // Vite default port
  "http://127.0.0.1:5173"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
Connect(process.env.MONGODB_URL).then(()=> console.log("Database Connected Successfull!!")).catch((err)=>console.log(err))

app.use('/api',authRouter)
app.use('/api',profileRouter)

app.listen(PORT,()=>{console.log("Server is Successfully Running!!");


})
