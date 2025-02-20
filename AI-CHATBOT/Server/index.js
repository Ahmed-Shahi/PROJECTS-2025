const express = require('express')
const profileRouter = require('./router/profile')
const {Connect} = require('./Connection')
const cors = require("cors");
const bodyParser = require("body-parser");


const app = express()
app.use(bodyParser.json());

Connect("mongodb://127.0.0.1:27017/AI_Chat_Bot").then(()=>console.log("Connected Successful")).catch((err)=>console.log(err))

app.use(cors())
app.use('/api',profileRouter)

app.listen(5000)