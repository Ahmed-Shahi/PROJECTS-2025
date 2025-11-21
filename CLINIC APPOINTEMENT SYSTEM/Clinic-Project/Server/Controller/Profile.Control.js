const Doctor = require("../Model/Doctor.Model");
const SignUp = require("../Model/Users.Model")


const handleGetData = async (req, res) => {
    try {
        const path = req.path
        const userId = path.split('/')[2]
        console.log("ID:", userId);


        const allData = await SignUp.find({})
        const onlyLogin = await SignUp.find({ _id: userId })
        console.log(onlyLogin);

        return res.json({
            onlyLogin,
            allData,
        })
    } catch (error) {
        res.send(error.Message)
    }
}

const handleLogoutBtn = async (req, res) => {
    const path = req.path
    console.log('logout path', path);
    const userId = path.split('/')[2]
    console.log(userId);
    const userData = await SignUp.find({ _id: userId })
    console.log(userData);


    res.clearCookie(`Token_${userId}`, {
        httpOnly: true,
        secure: false,   // true in production (HTTPS)
        sameSite: "lax"  // or "none" if cross-site
    });
    res.json({ message: "Logged out successfully" });
}

const handleGetAllDoctor = async (req, res) => {
    try {
        const allDoctors = await Doctor.find({})
        console.log(allDoctors);
        return res.json({ allDoctors })
    } catch (error) {
        console.log(error);
    }
}
const handleGetDoctor = async (req, res) => {
    try {
        const docId = req.path.split('/')[3]
        console.log(docId);
        const docData = await Doctor.findById(docId)
        console.log(docData);
        return res.json({ docData })
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    handleGetData,
    handleLogoutBtn,
    handleGetAllDoctor,
    handleGetDoctor
}