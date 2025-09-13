const express = require("express")
const ensureJwt = require('../Middleware/Jwt.Middleware')
const {handleGetTask,handleGetData,handleLogoutBtn} = require('../Controller/Profile.Control')
const router = express.Router()


router.route('/profile/:id').get(ensureJwt ,handleGetData)
router.route('/task').get(ensureJwt,handleGetTask)
router.route("/profile/:id/logout").post(ensureJwt,handleLogoutBtn)


module.exports = router 
