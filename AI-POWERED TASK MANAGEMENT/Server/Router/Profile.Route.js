const express = require("express")
const ensureJwt = require('../Middleware/Jwt.Middleware')
const router = express.Router()


router.route('/profile').get(ensureJwt , (req, res) => {
  res.json({ message: "Welcome!", user: req.user });
})

module.exports = router 
