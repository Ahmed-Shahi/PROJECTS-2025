const {generateContent} = require('../model/ai.model')

const handleGetReview = async (req, res) => {
    const  code  = req.body.code
    
    if (!code) {
        res.status(400).send('Prompt is Required')
    } else {
        console.log("Code Comes", Date());
        const response = await generateContent(code)
        res.send(response)
    }

}

module.exports = {handleGetReview}