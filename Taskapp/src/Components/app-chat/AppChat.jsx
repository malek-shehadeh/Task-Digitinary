import React from "react";
import ChatWindow from "./ChatWindow";
import MessageInput from "./MessageInput";
import UserList from "./UserList";
import { useChat } from "../../hooks/useChatState";
import "../../App.css";

const AppChat = () => {
  const {
    messages,
    typingUsers,
    handleTypingStart,
    handleTypingStop,
    addMessage,
  } = useChat();

  return (
    <div className="chat-app">
      <div className="chat-container">
        <h1>Chat</h1>
        <div className="chat-content">
          <ChatWindow messages={messages} />
          <UserList typingUsers={typingUsers} />
        </div>
        <MessageInput
          onSendMessage={addMessage}
          onTypingStart={() => handleTypingStart("Malek")}
          onTypingStop={() => handleTypingStop("Malek")}
        />
      </div>
    </div>
  );
};

export default AppChat;
