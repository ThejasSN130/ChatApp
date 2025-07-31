import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function ChatWindow() {
  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    currthread,
    setCurrThread,
    prevChats,
    setPrevChats,
  } = useContext(MyContext);

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const verifyCookie = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:8080/userAuth",
          {},
          { withCredentials: true }
        );
        const { status, user } = data;
        setUsername(user);
        if (status) {
          toast(`Hello ${user}`, {
            position: "top-right",
          });
        } else {
          removeCookie("token");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        removeCookie("token");
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const getreply = async () => {
    setLoading(true);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currthread,
      }),
    };
    try {
      const response = await fetch("http://localhost:8080/api/chat", options);
      let data = await response.json();
      console.log("Reply from Backend:", data.reply);
      setReply(data.reply);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reply from Frontend:", error);
      setLoading(false);
    }
  };
  //logout
  const Logout = () => {
    removeCookie("token");
    navigate("/");
  };
  //  Add new chats to history
  useEffect(() => {
    if (prompt && reply) {
      setPrevChats((prevChats) => [
        ...prevChats,
        { role: "user", content: prompt },
        { role: "assistant", content: reply },
      ]);
    }
    setPrompt("");
  }, [reply]);

  // Voice input handler
  const handleMicClick = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    setPrompt("Listening...");

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      console.log("Your speech:", spokenText);
      setPrompt(spokenText);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setPrompt("Try Again");
    };
  };

  const handleProfileClic = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>
          ChatAI <i className="fa-solid fa-angle-down"></i>
        </span>

        <div className="userIconDiv">
          <span className="userIcon">
            <i className="fa-solid fa-user" onClick={handleProfileClic}></i>
          </span>
        </div>
      </div>
      {isOpen && (
        <div className="dropDown">
          <div className="dropDownItem">
            <i className="fa-solid fa-gear"></i> Settings
          </div>
          <div className="dropDownItem">
            <i className="fa-solid fa-cloud-arrow-up"></i> Upgrade plan
          </div>
          <div className="dropDownItem" onClick={Logout}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Log out
          </div>
        </div>
      )}
      <Chat />
      <ScaleLoader color="#fff" loading={loading} />
      <div className="chatInput">
        <div className="inputBox">
          <input
            type="text"
            placeholder="Ask Anything"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && getreply()}
          />
          <div id="mic" onClick={handleMicClick}>
            <i className="fa-solid fa-microphone"></i>
          </div>
          <div id="submit" onClick={getreply}>
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </div>

        <p className="info">
          ChatAI can make mistakes, so please verify the information before
          using it.
        </p>
      </div>
    </div>
  );
}

export default ChatWindow;
