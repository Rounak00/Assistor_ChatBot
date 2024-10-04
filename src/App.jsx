
import { IoSend } from "react-icons/io5";
import { TbMessageChatbot } from "react-icons/tb";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./App.css";
import { useState, useRef, useEffect } from "react";

const App = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [responseScreen, setResponseScreen] = useState(false);

  const scroller = useRef(null);

  // Scroll to the bottom when a new message is added
  useEffect(() => {
    scroller.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [messages]);

  const onKeyPressHandler=(e)=>{
    
    if(e.key==="Enter"){
      if(message){
        generateResponse(message);
      }else{
        alert("You must write something...");
      }
      
    }
  }
  const hitRequest = () => {
    if (message) {
      generateResponse(message);
    } else {
      alert("You must write something...");
    }
  };

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

    setMessages(newMessages);
    setResponseScreen(true);
    setMessage(""); // Clear the input field after sending the message
  };

  const newChat = () => {
    setResponseScreen(false);
    setMessages([]); // Clear the messages array
  };

  return (
    <>
      <div className="container w-full min-h-screen overflow-x-hidden bg-[#0E0E0E] text-white flex flex-col">
        {responseScreen ? (
          <div className="h-[80vh] flex flex-col">
            <div className="header flex pt-[25px] items-center justify-between w-[100vw] px-[300px]">
              <h2 className="text-2xl">Assistor</h2>
              <button
                className="bg-[#181818] p-[10px] rounded-[30px] cursor-pointer text-[14px] px-[20px]"
                id="newChatButton"
                onClick={newChat}
              >
                New Chat
              </button>
            </div>

            {/* Message scrolling container */}
            <div className="messages flex-grow overflow-y-auto max-h-[calc(80vh-80px)] px-[300px] py-[20px]">
              {messages?.map((msg, index) => (
                <div className={msg.type} key={index}>
                  {msg.text}
                </div>
              ))}
              {/* Invisible div to scroll into view */}
              <div ref={scroller} />
            </div>
          </div>
        ) : (
          <div className="middle h-[80vh] flex flex-col justify-center items-center">
            <h1 className="text-4xl font-medium">Assistor</h1>
            <div className="boxes mt-[30px] flex items-center gap-2">
              <div className="bg-[#2b2929] max-h-[200px] max-w-[300px] rounded-sm flex flex-col justify-center items-center">
                <p className=" text-white break-words p-3 py-4 text-xl">
                    Welcome User, <br/>Write your question and I will answer.
                </p>
                <i className="text-2xl pb-6"><TbMessageChatbot/></i>
              </div>
            </div>
          </div>
        )}

        {/* Input Box */}
        <div className="bottom w-full flex flex-col items-center">
          <div className="inputBox w-[60%] max-sm:w-[90%] text-[15px] py-[7px] flex items-center bg-[#181818] rounded-[30px]">
            <input
              value={message}
              type="text"
              className="p-[10px] pl-[15px] bg-transparent flex-1 outline-none border-none "
              placeholder="Write your message here ..."
              id="messageBox"
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e)=>onKeyPressHandler(e)}
            />
            {message === "" ? (
              ""
            ) : (
              <i
                className="text-gray-400 text-[20px] mr-5 cursor-pointer "
                onClick={hitRequest}
              >
                <IoSend />
              </i>
            )}
          </div>
          <p className="text-[gray] text-[14px] my-4">
            Assistor is developed by Rounak. This chatbot uses Google Gemini API
            for giving responses.
          </p>
        </div>
      </div>
    </>
  );
};

export default App;