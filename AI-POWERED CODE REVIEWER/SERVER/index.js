const express = require('express')
const router = require('./src/router/ai.route')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use('/api',router)

app.listen(8000, () => {
    console.log("Server is Running on Port 8000");
})