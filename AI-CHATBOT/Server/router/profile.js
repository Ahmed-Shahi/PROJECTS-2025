const express = require('express')
const {handlecreateChat,handleGetChat} = require('../controller/profile')
const router = express.Router()


router.route('/Profile').post(handlecreateChat)
router.route('/Profile').post(handleGetChat)

module.exports = router