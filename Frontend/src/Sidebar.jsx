import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import { v1 as uuidv1 } from "uuid";

function Sidebar() {
  const {
    allThreads,
    setAllThreads,
    currthread,
    setPrompt,
    setReply,
    setCurrThread,
    setNewChat,
    setPrevChats,
  } = useContext(MyContext);

  const getALLthreads = async () => {
    try {
      const response = await fetch(
        "https://chat-server-j101.onrender.com/api/thread"
      );
      const res = await response.json();
      const filteredData = res.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title,
      }));
      setAllThreads(filteredData);
      // console.log("Fetched Threads:", filteredData);
    } catch (error) {
      console.log("Error fetching threads:", error);
    }
  };

  useEffect(() => {
    getALLthreads();
  }, [currthread]);

  const createNewChat = () => {
    setPrompt("");
    setReply(null);
    setNewChat(true);
    setPrevChats([]);
    setCurrThread(uuidv1()); // Generate a new unique thread ID
  };

  const changeThread = async (newThreadId) => {
    setCurrThread(newThreadId);
    try {
      const response = await fetch(
        `https://chat-server-j101.onrender.com/api/thread/${newThreadId}`
      );
      const res = await response.json();
      // console.log("Thread changed to:", res);
      setPrevChats(res);
      setNewChat(false);
      setReply(null);
    } catch (error) {
      console.error("Error changing thread:", error);
    }
  };

  const DeleteThread = async (threadId) => {
    try {
      const response = await fetch(
        `https://chat-server-j101.onrender.com/api/thread/${threadId}`,
        {
          method: "DELETE",
        }
      );
      let res = await response.json();
      console.log("Thread deleted:", res);
    } catch (error) {
      console.error("Error deleting thread:", error);
    }
    if (currthread === threadId) {
      createNewChat();
    }
    getALLthreads(); // Refresh the thread list
    setPrompt(""); // Clear the prompt when changing threads
  };
  return (
    <section className="sidebar">
      <button onClick={createNewChat}>
        <img
          src="https://cdn.prod.website-files.com/5b15d605b7c459fc409872b5/6584c9d60c1bfe93ba753276_Close%20CRM%20Logo%204.png"
          alt="gpt logo"
          className="logo"
        />
        <span>
          <i className="fa-solid fa-pen-to-square"></i>
        </span>
      </button>
      <span className="title">Chats</span>

      <ul className="history">
        {allThreads.map((thread, idx) => (
          <li
            key={idx}
            onClick={(e) => changeThread(thread.threadId)}
            className={thread.threadId === currthread ? "highlighted" : ""}
          >
            {thread.title}
            <i
              class="fa-solid fa-trash"
              onClick={(e) => {
                e.stopPropagation(); // Stop Event Bubbling
                DeleteThread(thread.threadId);
              }}
            ></i>
          </li>
        ))}
      </ul>

      <div className="sign">
        <p>Product of CloseAI</p>
      </div>
    </section>
  );
}

export default Sidebar;
