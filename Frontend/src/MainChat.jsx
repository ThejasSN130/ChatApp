import React from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import "./MainChat.css";

function MainChat() {
  return (
    <div className="main-chat">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <ChatWindow />
    </div>
  );
}

export default MainChat;
