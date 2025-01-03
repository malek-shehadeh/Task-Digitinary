import { useState, useEffect, useCallback } from "react";

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);

  const handleTypingStart = useCallback((username) => {
    setTypingUsers((prevUsers) => {
      if (!prevUsers.includes(username)) {
        return [...prevUsers, username];
      }
      return prevUsers;
    });
  }, []);

  const handleTypingStop = useCallback((username) => {
    setTypingUsers((prevUsers) =>
      prevUsers.filter((user) => user !== username)
    );
  }, []);

  const addMessage = useCallback((message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: Date.now(),
        text: message.text,
        author: message.author,
        timestamp: new Date(),
      },
    ]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        handleTypingStart("Husam");
        setTimeout(() => {
          handleTypingStop("Husam");
          addMessage({
            text: `Hi Malek ${Math.floor(Math.random() * 1000)}`,
            author: "Husam",
          });
        }, 2000);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [handleTypingStart, handleTypingStop, addMessage]);

  return {
    messages,
    typingUsers,
    handleTypingStart,
    handleTypingStop,
    addMessage,
  };
};
