const Tasks = require('../Model/Tasks.Model')
const SignUp = require("../Model/Users.Model")

const handleGetTask = async (req, res) => {
    try {
        const query = await Tasks.find({})
        console.log("Get Task", query);
        
        return res.json(query) 
    } catch (error) {
        res.send(error.Message)
    }
}

const handleCreateTask = async (req, res) => {
    const {finalData} =  req.body
    console.log("Task Data: ", finalData);
    const repsonse = await Tasks.create({
        title: finalData.title,
        description: finalData.description,
        deadline: finalData.deadline,
        priority: finalData.priority,
        status: finalData.status,
        assignee: finalData.assignee,
        createdBy: finalData.createdBy
    })
    console.log(repsonse);
    
}

const handleGetData = async (req, res) => {
    const path = req.path
    const userId = path.split('/')[2]
    console.log("ID:", userId);


    try {
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
    // const userData = await SignUp.find({_id:userId})
    // const userId = userData[0]._id


    res.clearCookie(`Token_${userId}`, {
        httpOnly: true,
        secure: false,   // true in production (HTTPS)
        sameSite: "lax"  // or "none" if cross-site
    });
    res.json({ message: "Logged out successfully" });
}


module.exports = {
    handleGetTask,
    handleCreateTask,
    handleGetData,
    handleLogoutBtn
}