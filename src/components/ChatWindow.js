import React, { useState, useEffect, useRef } from "react";
import "../css/ChatWindow.css";
import ChatBar from "./ChatBar";
import ChatBubble from "./ChatBubble";
import { v4 as uuidv4 } from "uuid";

export default function ChatWindow({ socket }) {
  const [messages, setMessages] = useState([]);
  const chatWindowEndRef = useRef(null);

  const scrollToBottom = () => {
    chatWindowEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // ADD MESSAGES AS A DEPENDENCY AND YOU SHOULD BE ABLE TO CHANGE TO NEW ARRAY DEFINITION
  useEffect(() => {
    socket.on('loadedMessages', loadedMessages => {
      console.log('Messages loaded.');

      setMessages(loadedMessages);
    });

    socket.on('error', error => {
      // REPLACE WITH AN ERROR COMPONENT INSIDE THE CHAT WINDOW
      console.error(error);
    });

    return () => socket.disconnect();
  }, [socket]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [socket, messages]);

  useEffect(scrollToBottom, [messages]);

  const mappedMessages = messages.map((message) => (
    <ChatBubble
      key={uuidv4()}
      isUserMessage={socket.id === message.userId}
      username={message.username}
      message={message.text}
      dateTime={message.time}
    />
  ));

  return (
    <div id="chat-window">
      <div id="message-window">
        {mappedMessages}
        <div ref={chatWindowEndRef}></div>
      </div>
      <ChatBar socket={socket}/>
    </div>
  );
}
