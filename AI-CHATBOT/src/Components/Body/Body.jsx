import { useState } from "react";
import axios from 'axios';
import './Body.css'
import { FaPaperPlane, FaMicrophone } from "react-icons/fa";

const Body = () => {

  const [message, setMessage] = useState("");
  const [talk, setTalk] = useState([])

  const sendMessage = async () => {
    console.log("Loading...")
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBgyVfrkvJv-Jnqm7iSzkxStZImn20awq8",
        method: "post",
        timeout: 10000,
        data: {
          "contents": [{
            "parts": [{ "text": message }]
          }]
        },
      })
      const data = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received";
      if (message.trim() && data.trim()) {
        setMessage("");
        setTalk([...talk, {
          msg: `${message}`,
          ans: `${data}`,
        }])

      }
      console.log(talk)
    } catch (error) {
      console.error("Request timed out or failed:", error);
    }
  };
  
  async function sendVoice() {
    

  }
  return (
    <div className="chatbot-container">
      <div className="chatbox">
        <div className="messages">
          {talk.map((data, index) => (
            <div key={`${index}`}>
              <div className="message user">{data.msg}</div>
              <div className="message user">{data.ans}</div>
            </div>
          ))}
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
          <button className="voice-btn" onClick={sendVoice}>
            <FaMicrophone />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Body
