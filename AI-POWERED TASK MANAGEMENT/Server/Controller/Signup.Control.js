const SignUp = require("../Model/Users.Model")
const bcrypt = require('bcrypt');

const handleGetData = async (req, res) => {
    try {
        const query = await SignUp.find({})
        return res.json(query)
    } catch (error) {
        res.send(error.Message)
    }
}

const handleSignUpBtn = async (req, res) => {
    const { userName, email, password } = await req.body
    try {
        const saltRounds = 10;

        const hash = bcrypt.hashSync(password, saltRounds);
        await SignUp.create({
            userName: userName,
            email: email,
            password: hash,
        });

        res.send({ mes: "User Save" })

    } catch (err) {
        return res.json({ Message: "Server Error" })
    }
}




module.exports = { handleSignUpBtn, handleGetData }