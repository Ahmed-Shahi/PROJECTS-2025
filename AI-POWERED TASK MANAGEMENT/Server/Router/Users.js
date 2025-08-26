const express = require("express")
const {handleSignUpBtn} = require('../Controller/User')
const app= express()

const router = express.Router()

router.route("/users").post(handleSignUpBtn)

module.exports = router