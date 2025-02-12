import { useState } from "react";
import axios from 'axios';
import './Body.css'
import { FaPaperPlane, FaMicrophone } from "react-icons/fa";
import result from "../../../index";
const Body = () => {

 const [message, setMessage] = useState("");
  const [talk, setTalk] = useState({})

  const sendMessage = async () => {

    setMessage("");
    // const msg = message
    console.log("Loading...")
    try {
    //   const response = await axios({
    //     url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBgyVfrkvJv-Jnqm7iSzkxStZImn20awq8",
    //     method: "post",
    //     // timeout: 10000,
    //     data: {
    //       "contents": [{
    //         "parts": [{ "text": msg }]
    //       }]
    //     },
    //   })      
    //   const data = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received";
      console.log(result);
      
      setTalk({
        msg: `${message}`,
        // ans: `${data}`,
      })
      console.log(talk)
    } catch (error) {
      console.error("Request timed out or failed:", error);
         }

  };

  return (
    <div className="chatbot-container">
      <div className="chatbox">
        {/* Chat Messages (Scrollable) */}
        <div className="messages">
          {/* {allMessage.map((msg, index) => (
            <div key={`msg-${index+1}`}>
              <div className="message user">{msg}</div>
              {allAns[index+1] && <div className="message bot">{allAns[index+1]}</div>}
            </div>
          ))} */}
        </div>



        {/* Input & Buttons */}
        <div className="input-box">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="send-btn" onClick={sendMessage}>
            <FaPaperPlane />
          </button>
          <button className="voice-btn">
            <FaMicrophone />
          </button>
        </div>
      </div>
    </div>
  );
};

module.exports = {
Body,
}
