import { useState } from "react";
import { MyContext } from "./MyContext.jsx";
import { v1 as uuidv1 } from "uuid";
import "./App.css";

function App({ children }) {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currthread, setCurrThread] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);

  const providerValue = {
    prompt,
    setPrompt,
    reply,
    setReply,
    currthread,
    setCurrThread,
    prevChats,
    setPrevChats,
    newChat,
    setNewChat,
    allThreads,
    setAllThreads,
  };

  return (
    <MyContext.Provider value={providerValue}>
      <div className="app-container">{children}</div>
    </MyContext.Provider>
  );
}

export default App;
