require('dotenv').config()
const express = require('express')
const {Connect} = require("./connection")
const authRouter = require('./Router/Auth.Route')
const profileRouter = require('./Router/Profile.Route')
const cors = require('cors')
const cookieParser = require('cookie-parser') 

const app = express()
const PORT = process.env.PORT 
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
Connect(process.env.MONGODB_URL).then(()=> console.log("Database Connected Successfull!!")).catch((err)=>console.log(err))

app.use('/api',authRouter)
app.use('/api',profileRouter)

app.listen(PORT,()=>{console.log("Server is Successfully Running!!");


})
