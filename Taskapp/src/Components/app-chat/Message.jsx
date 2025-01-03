import React from "react";

function Message({ message }) {
  return (
    <div className="message">
      <div className="message-header">
        <span className="author">{message.author}</span>
        <span className="timestamp">
          {message.timestamp.toLocaleTimeString()}
        </span>
      </div>
      <div className="message-body">{message.text}</div>
    </div>
  );
}

export default Message;
