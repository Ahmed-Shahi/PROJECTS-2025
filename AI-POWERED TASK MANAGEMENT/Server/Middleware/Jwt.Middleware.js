require("dotenv").config
const jwt = require('jsonwebtoken')

const ensureJwt = async (req, res, next) => {
    const cookiesToken = await req.cookies.token
    if (!cookiesToken) {
        return res.json({ mes: "Login is Required" })
    }
    try {
        const decoded = jwt.verify(cookiesToken, process.env.JWT_TOKEN)
        console.log(decoded);
        req.user = decoded
        next();

    } catch (error) {
        return res.json({ mes: "Wrong or Expire Token :( " })
    }
}

module.exports = ensureJwt