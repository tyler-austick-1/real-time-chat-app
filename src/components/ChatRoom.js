import React, { useState, useEffect } from "react";
import "../css/ChatRoom.css";
import UsersList from './UsersList';
import ChatWindow from './ChatWindow';
import TaskBar from './TaskBar';
import QueryString from "qs";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:5000";

export default function ChatRoom() {
  const {username, room} = QueryString.parse(window.location.search, {
    ignoreQueryPrefix: true
  });

  const [messages, setMessages] = useState([]);
  const [currentUsers, setCurrentUsers] = useState([]);

  // let socket;
  
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    console.log('connected to socket');

    socket.emit('joinRoom', {username, room});

    socket.on('message', message => {
      let temp = messages;
      temp.push(message);
      setMessages([...temp]);
    });

    socket.on('roomUsers', ({room, users}) => {
      const usernameList = users.map(user => user.username);
      setCurrentUsers([...usernameList]);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div id="main-app">
      <div id="main-task-bar">
        <TaskBar room={room} />
      </div>
      <div id="main-content">
        <UsersList users={currentUsers} />
        <ChatWindow messages={messages}/>
      </div>
    </div>
  );
}
