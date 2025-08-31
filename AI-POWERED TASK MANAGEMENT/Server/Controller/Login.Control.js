const SignUp = require('../Model/Users.Model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');


const handleLoginBtn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await SignUp.findOne({ email: email })

        if (!user) {
            return res.status(400).json({ Message: "User Not Found!!!" });
        }
        console.log(user);

        bcrypt.compare(password, user.password, async function (err, result) {
            result == true
            if (!result) {
                return res.status(400).json({ Message: err });
            }

            const token = jwt.sign(
                {
                    email: email,
                    password: user.password
                },
                process.env.JWT_TOKEN,
                { expiresIn: "3h" })


            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax"
            });

            res.status(200).json({ user, token })

        });
    } catch (error) {
        return res.json({ Message: "Server Error" })

    }
}
module.exports = { handleLoginBtn }