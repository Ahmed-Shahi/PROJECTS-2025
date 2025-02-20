const Chats = require('../model/profile')

async function handlecreateChat(req,res) {
    
    const {question,answer,userId}  = req.body;
    
    const existingChat = await Chats.findOne({ userId });

    if (existingChat) {
      // If user already exists, update chats array
      existingChat.chats.push({ question, answer });
      await existingChat.save();
    } else {
      // If user does not exist, create new document
      const newChat = new Chats({
        userId,
        chats: [{ question, answer }]
      });
      await newChat.save();
    }

}

module.exports = {
    handlecreateChat
}