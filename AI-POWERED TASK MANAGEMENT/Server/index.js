require('dotenv').config()
const express = require('express')
const {Connect} = require("./connection")
const router = require('./Router/Users')
const cors = require('cors')


const app = express()
const PORT = process.env.PORT 
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
Connect("mongodb://127.0.0.1:27017/AI_Task_Management").then(()=> console.log("Connected Successfull!!")).catch((err)=>console.log(err))

app.use('/api',router)

app.listen(PORT,()=>{console.log("Server is Successfully Running!!");


})
