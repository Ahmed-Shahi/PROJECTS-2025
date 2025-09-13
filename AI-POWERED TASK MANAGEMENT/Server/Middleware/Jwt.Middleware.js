const SignUp = require("../Model/Users.Model")
require("dotenv").config
const jwt = require('jsonwebtoken')

const ensureJwt = async (req, res, next) => {
    const path = req.path
    const userId = path.split('/')[2]
    console.log("ensure", userId);

    // const userData = await SignUp.find({ _id: userId })
    // const userName = userData[0].userName
    // console.log("ensure",userData[0].userName);

    const cookiesToken = await req.cookies[`Token_${userId}`]
    if (!cookiesToken) {
        return res.json({ mes: "Login is Required" })
    }
    try {
        const decoded = jwt.verify(cookiesToken, process.env.JWT_TOKEN)
        console.log("Decode :", decoded);
        req.user = decoded
        next();

    } catch (error) {
        return res.json({ mes: "Wrong or Expire Token :( " })
    }
}

module.exports = ensureJwt