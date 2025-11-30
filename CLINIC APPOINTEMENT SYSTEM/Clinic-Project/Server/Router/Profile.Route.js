const express = require("express")
const ensureJwt = require('../Middleware/Jwt.Middleware')
const { handleGetData,
    handleLogoutBtn,
    handleGetAllDoctor,
    handleGetDoctor} = require('../Controller/Profile.Control')
const router = express.Router()


router.route('/profile/:id').get(ensureJwt, handleGetData)
router.route("/profile/:id/logout").post(handleLogoutBtn)
router.route("/profile/:id/doctors").get(ensureJwt, handleGetAllDoctor)
router.route("/profile/:id/:docId").get(ensureJwt, handleGetDoctor)

module.exports = router 
