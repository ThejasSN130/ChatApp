import "./Chat.css";
import { MyContext } from "./MyContext.jsx";
import { useContext, useEffect, useState } from "react";
import ReactMarkDown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function Chat() {
  const { newChat, prevChats, reply } = useContext(MyContext); // Accessing the newChat state from MyContext
  const [latestReply, setLatestReply] = useState(null); // Assuming latestReply is defined in MyContext

  useEffect(() => {
    if (reply === null) {
      setLatestReply(null); // loading previous chats
      return;
    }
    if (!prevChats.length) return;

    let content = reply.split(" ");
    let idx = 0;
    const interval = setInterval(() => {
      setLatestReply(content.slice(0, idx + 1).join(" "));
      idx++;
      if (idx >= content.length) clearInterval(interval);
    }, 40);
  }, [prevChats, reply]);
  return (
    <>
      {newChat && <h2> Start a New Chat</h2>}
      <div className="chats">
        {prevChats?.slice(0, -1).map((chat, idx) => (
          <div
            className={chat.role === "user" ? "userDiv" : "gptDiv"}
            key={idx}
          >
            {chat.role === "user" ? (
              <p className="userMessage">{chat.content}</p>
            ) : (
              <ReactMarkDown rehypePlugins={rehypeHighlight}>
                {chat.content}
              </ReactMarkDown>
            )}
          </div>
        ))}

        {prevChats.length > 0 && (
          <>
            {latestReply === null ? (
              <div className="gptDiv" key={"non-typing"}>
                <ReactMarkDown rehypePlugins={rehypeHighlight}>
                  {prevChats[prevChats.length - 1].content}
                </ReactMarkDown>
              </div>
            ) : (
              <div className="gptDiv" key={"typing"}>
                <ReactMarkDown rehypePlugins={rehypeHighlight}>
                  {latestReply}
                </ReactMarkDown>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Chat;
