const express = require("express")
const ensureJwt = require('../Middleware/Jwt.Middleware')
const { handleGetData,
    handleLogoutBtn,
    handleGetAllDoctor,
    handleGetDoctor,
    handleBookBtn } = require('../Controller/Profile.Control')
const router = express.Router()


router.route('/profile/:id').get(ensureJwt, handleGetData)
router.route("/profile/:id/logout").post(handleLogoutBtn)
router.route("/profile/:id/doctors").get(ensureJwt, handleGetAllDoctor)
router.route("/profile/:id/:docId").get(ensureJwt, handleGetDoctor)
router.route("/profile/:id/appointments").post(ensureJwt, handleBookBtn)

module.exports = router 
