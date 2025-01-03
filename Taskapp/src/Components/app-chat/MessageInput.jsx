import React, { useState } from "react";

function MessageInput({ onSendMessage, onTypingStart, onTypingStop }) {
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const newMessage = e.target.value;
    setMessage(newMessage);

    if (newMessage.trim()) {
      onTypingStart();
    } else {
      onTypingStop();
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage({
        text: message,
        author: "Malek",
      });
      setMessage("");
      onTypingStop();
    }
  };

  return (
    <div className="message-input">
      <input
        type="text"
        value={message}
        onChange={handleChange}
        placeholder="Type a message..."
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default MessageInput;
