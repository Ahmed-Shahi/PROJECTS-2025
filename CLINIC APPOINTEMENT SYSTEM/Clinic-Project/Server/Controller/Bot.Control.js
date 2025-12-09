const {generateContent} = require('../Model/Bot.Model')

const handleGetReview = async (req, res) => {
    const  message  = req.body.message
    
    if (!message) {
        res.status(400).send('Prompt is Required')
    } else {
        console.log("message Comes", Date());
        const response = await generateContent(message)
        res.send(response)
    }

}

module.exports = {handleGetReview}