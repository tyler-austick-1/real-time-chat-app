import React, { useEffect } from "react";
import "../css/ChatRoom.css";
import UsersList from './UsersList';
import ChatWindow from './ChatWindow';
import TaskBar from './TaskBar';
import QueryString from "qs";
import io from "socket.io-client";

const socket = io.connect();

export default function ChatRoom() {
  const {username, room} = QueryString.parse(window.location.search, {
    ignoreQueryPrefix: true
  });
  
  useEffect(() => {
    socket.emit('joinRoom', {username, room});

    return () => socket.disconnect();
  }, []);

  return (
    <div id="main-app">
      <div id="main-task-bar">
        <TaskBar room={room} />
      </div>
      <div id="main-content">
        <UsersList socket={socket} />
        <ChatWindow socket={socket} />
      </div>
    </div>
  );
}
