import { useEffect, useState } from "react";
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
        url: process.env.REACT_APP_GEMINI_API_KEY,
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
    const Ans = mergedObject.ans.map((d) => {
      return d
    })
    const Msg = mergedObject.msg.map((d) => {
      return d
    })

    const getUser = await axios.get("http://localhost:5000/api/Profile");
    if (!getUser.data[0].userId) {

    }
    //Storing the Chats in Server
    const response = await axios.post("http://localhost:5000/api/Profile", {
      userId: localStorage.getItem("userId"),
      question: Msg,
      answer: Ans,
    });



  }

  const listChat = async () => {
    console.log(talk);

    const response = await axios.get("http://localhost:5000/api/Profile");
    if (response.data[0].chats[0].question[0] && response.data[0].userId === localStorage.getItem('userId')) {
      const firstQuestion = await response.data[0].chats[0].question[0];
      setChatList(firstQuestion);
      console.log(chatList);
    } else {
      console.log("No chats found");
    }
  }

  const [previousChat, setPreviousChat] = useState({answer:[],question:[]})
  
  async function preChat() {
    // Is array mein un users ki id ho gi jinhony charts ko save kia ho ga
    const existingUserId = []

    const userId = localStorage.getItem('userId')
    const response = await axios.get("http://localhost:5000/api/Profile");
    

    // Us array mein database mein jo users hy un ko push kia hy
    response.data.map((data)=>{
      existingUserId.push(data.userId)
    })    

    // Jo user abhi login hy us ki id ko fetch kia hy
    const index = existingUserId.indexOf(userId)
    console.log(existingUserId[index]);
    
    // Check the User has the history or not 
    if (await existingUserId[index] === userId) {
      
      // Collecting Data from history
      const detail = response.data.find((d)=>d.userId === userId)

      const allQuestions = await detail.chats.flatMap(chat => chat.question)
      const allAnswer = await detail.chats.flatMap(chat => chat.answer)
      
      setPreviousChat({
        answer: [allAnswer],
        question: [allQuestions]
      })
      
      try {
        
        const Ans = previousChat.answer.map( (d)  => {
          return d;
        })
        const Msg = previousChat.question.map((d) => {
          return d;
        })
        
        
        // Make simple array 
        let newTalk =  [];
        for (let i = 0; i < allAnswer.length; i++) { 
          newTalk.push({
            msg: Msg[0][i],
            ans: Ans[0][i]
          });
        }
        // Set the talk state, Now the history data is show on the Chats  
        setTalk([...talk, ...newTalk]);
        
        
      } catch (error) {
        
        console.log("ERORR "+error);
        
      }
    }
  }
   
  return (
    <div className="chatbot-container">
      <div className="button-container">
      <div className="slidebtn" >
        {/* Button to Open Drawer */}
        {/* <button onClick={() => setIsOpen(true)} className="open-btn">
          CHAT'S
        </button> */}

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
      <div >
        <button onClick={() => saveChat()} className="save-btn">
          SAVE CHAT
        </button>
      </div>
      {/* <div>
        <button onClick={() => listChat()} className="list-btn" >
          LIST CHAT
        </button>
      </div> */}
      <div>
        <button 
        onClick={() => preChat()}

         className="pre-btn">
          CHAT HISTORY        
        </button>
      </div>

      </div>

      <div className="chatbot-container">
        <div className="chatbox">
          <div className="messages">

            {talk.map((data, index) => (
              <div key={`${index}`}>
                <div>
                  <p className="tag">YOU</p>
                </div>
                <div className="message-user">
                  <pre>{data.msg}</pre>
                </div>
                <div>
                  <p className="tag">AI</p>
                </div>
                <div className="message-user">
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
            <button className="voice-main-btn" onClick={sendVoice}>
              <FaMicrophone />
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Body
