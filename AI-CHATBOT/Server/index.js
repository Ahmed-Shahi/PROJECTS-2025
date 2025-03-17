require("dotenv").config();
const express = require('express')
const profileRouter = require('./router/profile')
const {Connect} = require('./Connection')
const cors = require("cors");


const app = express()
app.use(express.urlencoded({extended:false}))
app.use(express.json());

Connect(process.env.NODE_MONGODB_CONNECT).then(()=>console.log("Connected Successful")).catch((err)=>console.log(err))

app.use(cors())
app.use('/api',profileRouter)

app.listen(5000)