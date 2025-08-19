const express = require('express')
const {handleGetReview} = require('../controller/ai.control')

const router = express.Router()


router.route('/review').post(handleGetReview)

module.exports = router