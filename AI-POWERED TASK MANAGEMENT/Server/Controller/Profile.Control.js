const Tasks = require('../Model/Tasks.Model')
const SignUp = require("../Model/Users.Model")

const handleGetTask = async (req, res) => {
    try {
        const query = await Tasks.find({})
        return res.json(query)
    } catch (error) {
        res.send(error.Message)
    }
}

const handleGetData = async (req, res) => {
    const path = req.path
    const userId = path.split('/')[2]
    console.log("ID:",userId);
    
    // const email = req.user.email
    // console.log(email);
    try {
        // const loginData = await SignUp.find({ email })
        const allData = await SignUp.find({})
        const onlyLogin = await SignUp.find({_id:userId})
        console.log(onlyLogin);

        return res.json({ 
            onlyLogin,
            // loginData, 
            allData,
         })
    } catch (error) {
        res.send(error.Message)
    }
}

const handleLogoutBtn = async (req, res) => {
    const path = req.path
    console.log('logout path',path);
    const userId = path.split('/')[2]
    // const userData = await SignUp.find({_id:userId})
    // const userId = userData[0]._id
    
    
    res.clearCookie(`Token_${userId}`, {
        httpOnly: true,
        secure: false,   // true in production (HTTPS)
        sameSite: "lax"  // or "none" if cross-site
    });
    res.json({ message: "Logged out successfully" });
}


module.exports = { handleGetTask, handleGetData,handleLogoutBtn }