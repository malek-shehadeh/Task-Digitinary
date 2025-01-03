import React, { useRef, useEffect } from "react";
import Message from "./Message";

function ChatWindow({ messages }) {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-window">
      {messages.map((msg) => (
        <Message key={msg.id} message={msg} />
      ))}
      <div ref={chatEndRef} />
    </div>
  );
}

export default ChatWindow;
