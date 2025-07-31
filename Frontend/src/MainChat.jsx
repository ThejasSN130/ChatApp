import React from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import "./MainChat.css"; // Optional: layout styles

function MainChat() {
  return (
    <div className="main-chat">
      <Sidebar />
      <ChatWindow />
    </div>
  );
}

export default MainChat;
