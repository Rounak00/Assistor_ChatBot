import { IoCodeSlash } from "react-icons/io5";
import { IoMdPlanet } from "react-icons/io";
import { SiPython } from "react-icons/si";
import { IoSend } from "react-icons/io5";
import { TbMessageChatbotFilled } from "react-icons/tb";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./App.css";
import { useState } from "react";
const App = () => {
  
  const [message, setMessage] = useState("");
  const [messages,setMessages]=useState([]);
  const [responseScreen, setResponseScreen] = useState(false);
  

  const hitRequest=()=>{
    if(message){
        generateResponse(message);
    }else{
      alert("You must write something...")
    }
  }
  // const generateResponse=async()=>{
    
  //   const genAI = new GoogleGenerativeAI("AIzaSyCYraMYbvS1SQ-WtmuP0liRCyQp0Az-T60");
  //   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  //   const result = await model.generateContent(message);
  //   allMessages.push(
  //     {
  //       type:"userMsg",
  //       text:message,
  //     },
  //     {
  //       type:"responseMsg",
  //       text:result.response.text(),
  //     }
  //   )
  //   setMessages(allMessages);
  //   setResponseScreen(true);
  //   setMessage("")
  // }
  const generateResponse = async (msg) => {
    if (!msg) return;
    
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(msg);
    
    const newMessages = [
      ...messages,
      { type: "userMsg", text: msg },
      { type: "responseMsg", text: result.response.text() },
    ];
    
    setMessages(newMessages); // Append new messages to the existing ones
    setResponseScreen(true);
    setMessage(""); // Clear the input field after sending the message
    
  };

  const newChat = () => {
    setResponseScreen(false);
    setMessages([]); // Clear the messages array
  }
  
  return (
    <>
      <div className="container w-screen min-h-screen overflow-x-hidden bg-[#0E0E0E] text-white">
        {responseScreen ? (
          <div className="h-[80vh] ">
            <div className="header flex pt-[25px] items-center justify-between w-[100vw] px-[300px]">
              <h2 className="text-2xl">Assistor</h2>
              <button className="bg-[#181818] p-[10px] rounded-[30px] cursor-pointer text-[14px] px-[20px]" id='newChatButton' onClick={newChat}>New Chat</button>
            </div>
            <div className="messages">
              {messages?.map((msg,index)=>{
                return (
                  <div className={msg.type} key={index} >{msg.text}</div>
                )
              })}
              {/* <div className="userMsg"> Hey rounak this side</div>
              <div className="responseMsg"> Hey rounak, this is response</div> */}
            </div>
          </div>
        ) : (
          <div className="middle h-[80vh] flex flex-col justify-center items-center ">
            <h1 className="text-4xl font-medium">Assistor</h1>
            <div className="boxes mt-[30px] flex items-center gap-2">
              <div className="card w-[15vw] rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px]  break-words ">
                <p className="text-[18px] ">
                  What is coding? How we can learn it.
                </p>
                <i className="absolute right-3 bottom-3 text-[18px]">
                  <IoCodeSlash />
                </i>
              </div>
              <div className="card w-[15vw] rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px] break-words ">
                <p className="text-[18px] ">
                  Which is the red planet of solar system?
                </p>
                <i className="absolute right-3 bottom-3 text-[18px]">
                  <IoMdPlanet />
                </i>
              </div>
              <div className="card w-[15vw] rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px] break-words ">
                <p className="text-[18px] ">
                  In which year Pyhton was developed?
                </p>
                <i className="absolute right-3 bottom-3 text-[18px]">
                  <SiPython />
                </i>
              </div>
              <div className="card w-[15vw] rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px] break-all " 
              onClick={()=>{
                setMessage("How we can use AI as a chat bot?")
                hitRequest();
              }}>
                <p className="text-[18px] ">How we can use AI as a chat bot?</p>
                <i className="absolute right-3 bottom-3 text-[18px]">
                  <TbMessageChatbotFilled />
                </i>
              </div>
            </div>
          </div>
        )}

        <div className="bottom w-full flex flex-col items-center">
          <div className="inputBox w-[60%] text-[15px] py-[7px] flex items-center bg-[#181818] rounded-[30px]">
            <input
              value={message }
              type="text"
              className="p-[10px] pl-[15px]  bg-transparent flex-1 outline-none border-none"
              placeholder="Write your message here ..."
              id="messageBox"
              onChange={(e) => setMessage(e.target.value)}
            />
            {message == "" ? (
              ""
            ) : (
              <i className="text-gray-400 text-[20px] mr-5 cursor-pointer" onClick={hitRequest}>
                <IoSend />
              </i>
            )}
          </div>
          <p className="text-[gray] text-[14px] my-4">
            Assistor is developed by Rounak. This chatbot uses Google Gemini API
            for give responses
          </p>
        </div>
      </div>
    </>
  );
};

export default App;
