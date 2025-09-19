const express = require("express")
const ensureJwt = require('../Middleware/Jwt.Middleware')
const {handleGetTask,handleGetData,handleLogoutBtn,handleCreateTask} = require('../Controller/Profile.Control')
const router = express.Router()


router.route('/profile/:id').get(ensureJwt ,handleGetData)
router.route("/profile/:id/logout").post(ensureJwt,handleLogoutBtn)
router.route('/task/:id').get(ensureJwt,handleGetTask)
router.route('/task/:id').post(ensureJwt,handleCreateTask)

module.exports = router 
