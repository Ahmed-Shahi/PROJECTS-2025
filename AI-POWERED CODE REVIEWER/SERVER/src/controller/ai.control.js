const {generateContent} = require('../model/ai.model')

const handleGetReview = async (req, res) => {
    const  prompt  = req.body.prompt
    if (!prompt) {
        res.status(400).send('Prompt is Required')
    } else {
        const response = await generateContent(prompt)
        res.send(response)
    }

}

module.exports = {handleGetReview}