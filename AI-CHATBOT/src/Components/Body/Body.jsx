import { useState } from "react";
import axios from 'axios';
import './Body.css' 
import { FaPaperPlane, FaMicrophone } from "react-icons/fa";

const Body = () => {

    const [message, setMessage] = useState("");
    const [allMessage, setAllMessage] = useState([]);
    const [ans,setAns] = useState('')
    const [allans,setAllAns] = useState([])

    const sendMessage = async () => {
    
        setAllMessage([...allMessage, message])
        // if (message.trim() === "") return;
        // setMessages([...messages, message]);
        // setMessage(""); // Clear input after sending
        setAllAns([...allans,ans])
        
        console.log("Loading...")
        const response = await axios({
          url:"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCjtGY_y0i3djTxzO--9319a2tTLl9lUf0",
          method: "post",
          data : {
            "contents": [{
              "parts":[{"text": message}]
              }]
             },
        })
        const data = response['data']['candidates'][0]['content']['parts'][0]['text']
        
        setAns(data)
        console.log( message);
        console.log(ans)
        
    };
    
  return (
         <div className="chatbot-container">
      <div className="chatbox">
        {/* Chat Messages (Scrollable) */}
        <div className="messages">
          { allMessage.map((msg, index) => (
            <div key={index} className="message">{msg}</div>
          )) }
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

export default  Body;
