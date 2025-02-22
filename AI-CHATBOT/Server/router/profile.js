const express = require('express')
const {handlecreateChat,handleGetChat} = require('../controller/profile')
const router = express.Router()


router.route('/Profile').get(handleGetChat)
.post(handlecreateChat)


module.exports = router