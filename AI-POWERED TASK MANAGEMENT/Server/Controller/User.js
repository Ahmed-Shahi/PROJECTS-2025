const SignUp = require("../Model/users")
const bcrypt = require('bcrypt');

const handleSignUpBtn = async (req, res) => {
    const { userName, email, password } = req.body

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, function (err, hash) {
        console.log(hash);
        SignUp.create({
            userName: userName,
            email: email,
            password: hash
        })
        res.send({mes:"User Save"})
    });

    console.log({ userName, email, password });
}

module.exports = { handleSignUpBtn }