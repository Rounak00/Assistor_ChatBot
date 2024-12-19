// text-gray-400
import { IoSend } from "react-icons/io5";
import { TbMessageChatbot } from "react-icons/tb";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./App.css";
import { useState, useRef, useEffect } from "react";
import { PuffLoader } from "react-spinners";

const App = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [responseScreen, setResponseScreen] = useState(false);
  const [loader,setLoader]=useState(false);

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
    
   
    setMessage(""); // Clear the input field after sending the message
    setLoader(true);
    if (!msg) return;

    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(msg);

    const newMessages = [
      ...messages,
      { type: "userMsg", text: msg },
      { type: "responseMsg", text: result.response.text() },
    ];
    
    setLoader(false);
    setMessages(newMessages);
    setResponseScreen(true);
    
  };

  const newChat = () => {
    setResponseScreen(false);
    setMessages([]); // Clear the messages array
  };

  return (
    <>
      <div className=" w-[100vw] min-h-screen overflow-x-hidden bg-[#0E0E0E] text-white flex flex-col">
        {responseScreen ? (
          <div className="h-[80vh] flex flex-col w-[100vw]">
            <div className="header flex pt-[25px] items-center justify-between w-[100vw] px-[10px] md:px-[200px]">
              <h2 className="text-2xl">Assistor</h2>
              <button
                className="bg-[#181818] p-[10px] rounded-[30px] cursor-pointer text-[14px] px-[20px] mb-2 "
                id="newChatButton"
                onClick={newChat}
              >
                New Chat
              </button>
            </div>

            {/* Message scrolling container */}
            <div className="messages flex-grow overflow-y-auto max-h-[70%] max-sm:max-h-[90%] max-sm:px-[30px] px-[200px] py-[20px]">
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
          <div className="middle h-[80vh] flex flex-col justify-center items-center w-[100vw]">
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
          <div className="inputBox w-[65%]  max-sm:w-[90%] text-[15px] py-[7px] flex items-center bg-[#181818] rounded-[30px]">
            <input
              value={message}
              type="text"
              className="p-[10px] pl-[15px] bg-transparent flex-1 outline-none border-none max-sm:text-[13px]"
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
            {loader === true ? (
              <i  className="text-gray-400 text-[10px] mr-5 cursor-pointer ">
                <PuffLoader color="white" size="30"/>
              </i>
            ):("")}
          </div>
          <p className="text-[gray] text-[14px] my-4 px-4 max-sm:text-[10px] text-center">
            Assistor is developed by Rounak. This chatbot uses Google Gemini API
            for giving responses.
          </p>
        </div>
      </div>
    </>
    
    // <>
    // {loader === true? <PuffLoader className="text-gray-400" />: <h1>Hello</h1> }
    
    
    // </>
    
  );
};

export default App;
