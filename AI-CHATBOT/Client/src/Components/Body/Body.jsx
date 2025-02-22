import { useState } from "react";
import axios from 'axios';
import './Body.css'
import { FaPaperPlane, FaMicrophone } from "react-icons/fa";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Body = () => {

  // Giving request to Api and taking response 
  const [message, setMessage] = useState("");
  const [talk, setTalk] = useState([])
  const sendMessage = async () => {
    console.log("Loading...")
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBgyVfrkvJv-Jnqm7iSzkxStZImn20awq8",
        method: "post",
        mode: "cors",
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
      // console.log(answer);
      console.log(talk);

    } catch (error) {
      console.error("Request timed out or failed:", error);
    }
  };

  // Toggle Voice button to fill the input field with the Voice
  const [isFirstFunction, setIsFirstFunction] = useState(true);
  const startListening = () => SpeechRecognition.startListening({ continuous: true })
  const stopListening = () => SpeechRecognition.stopListening()
  const { transcript, resetTranscript } = useSpeechRecognition()
  const sendVoice = async () => {
    if (isFirstFunction) {
      console.log('start');
      resetTranscript()
      startListening()
    } else {
      console.log('stop');
      stopListening()
      setMessage(transcript)
    }
    setIsFirstFunction(!isFirstFunction);
  }

  // Reading the response 
  const speakText = (msg) => {
    const utterance = new SpeechSynthesisUtterance(msg);
    speechSynthesis.speak(utterance);
  };

  // to open the slider 
  const [isOpen, setIsOpen] = useState(false);


  const [chatList, setChatList] = useState('')
  // To save the Chat 
  const saveChat = async () => {

    //Converting the Talk data in form of array
    const mergedObject = talk.reduce((acc, data) => {
      acc.msg.push(data.msg);
      acc.ans.push(data.ans);
      return acc;
    }, { msg: [], ans: [] });

    console.log(mergedObject);

    // Getting Values from Converted data to Store in the body of Server
    const Ans = mergedObject.ans.map((d, i) => {
      return d
    })
    const Msg = mergedObject.msg.map((d, i) => {
      return d
    })

    //Storing the Chats in Server
    const response = await axios.post("http://localhost:5000/api/Profile", {
      userId: localStorage.getItem("userId"),
      question: Msg,
      answer: Ans,
    });

    if (!response.ok) {
      throw new Error(`Failed to store chat. Status: ${response.status}`);
    }
    
    console.log('Done!!');
    
  }
  
  const listChat = async () => {
    console.log(talk);
    
    const response = await axios.get("http://localhost:5000/api/Profile");
    if (response.data[0].chats[0].question[0] && response.data[0].userId === localStorage.getItem('userId')) {
      const firstQuestion = await response.data[0].chats[0].question[0];
      setChatList(firstQuestion);
      console.log(chatList);
    } else {
      console.log("No chats found");}
    }
    
    const preChat = async () => {
    const userId = localStorage.getItem('userId')
    const response = await axios.get("http://localhost:5000/api/Profile");
       if(response.data[0].userId === userId){
        
        const allQuestions = response.data[0].chats.flatMap(chat => chat.question);
        const allAnswer = response.data[0].chats.flatMap(chat => chat.answer);
        console.log(allQuestions);
        console.log(allAnswer);
        
        
       }
        
  }
  return (
    <div className="chatbot-container">
      <div className="slidebtn" >
        {/* Button to Open Drawer */}
        <button onClick={() => setIsOpen(true)} className="open-btn">
          CHAT'S
        </button>

        {/* Drawer */}
        <div className={`drawer ${isOpen ? "open" : ""}`}>
          {/* Close Button */}
          <button onClick={() => setIsOpen(false)} className="close-btn">
            ✖
          </button>

          {/* Drawer Content */}

          <ul>
            <li>{`${chatList}`}</li>
            <li><button>New Chat</button></li>
          </ul>

        </div>

      </div>
      <div>
        <button onClick={() => saveChat()} >
          SAVE CHAT
        </button>
      </div>
      <div>
        <button onClick={() => listChat()} >
          List CHAT
        </button>
      </div>
      <div>
        <button onClick={() => preChat()} >
          Previous CHAT
        </button>
      </div>

      <div className="chatbot-container">
        <div className="chatbox">
          <div className="messages">
            {talk.map((data, index) => (
              <div key={`${index}`}>
                <div className="message user"><pre>{data.msg}</pre></div>
                <div className="message user">
                  <pre>{data.ans}</pre>
                  <button className="voice-btn" onClick={() => speakText(data.ans)} >
                    <FaMicrophone />
                  </button>
                </div>
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
    </div>

  );
};

export default Body
