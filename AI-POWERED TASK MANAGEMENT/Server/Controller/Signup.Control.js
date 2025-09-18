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
    const { userName, email, password, role } = await req.body
    try {
        const saltRounds = 10;

        const hash = bcrypt.hashSync(password, saltRounds);
        await SignUp.create({
            userName: userName,
            email: email,
            password: hash,
            role: role
        });

        res.send({ mes: "User Save" })

    } catch (err) {
        return res.json({ Message: "Server Error" })
    }
}

const handleGetDataById =async (req,res)=>{
    const {userId} = req.body
     try {
        const query = await SignUp.findById(userId)
        return res.json(query)
    } catch (error) {
        res.send(error.Message)
    }
}


module.exports = { handleSignUpBtn, handleGetData ,handleGetDataById}