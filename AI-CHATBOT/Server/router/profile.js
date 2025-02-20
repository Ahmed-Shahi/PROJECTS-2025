const express = require('express')
const {handlecreateChat} = require('../controller/profile')
const router = express.Router()


router.route('/Profile').post(handlecreateChat)

module.exports = router