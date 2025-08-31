const express = require("express")
const {handleSignUpBtn,handleGetData} = require('../Controller/Signup.Control')
const {handleLoginBtn} = require('../Controller/Login.Control')
const {handleLogoutBtn} = require("../Controller/Logout.Control")

const router = express.Router()

router.route("/users").get(handleGetData)
router.route("/users").post(handleSignUpBtn)
router.route("/login").get(handleGetData)
router.route("/login").post(handleLoginBtn)
router.route("/logout").post(handleLogoutBtn)

module.exports = router 