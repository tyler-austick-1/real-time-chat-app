import React, { useEffect } from "react";
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
  
  // UNCOMMENT THIS TOMORROW
  // useEffect(() => {
  //   const socket = socketIOClient(ENDPOINT);

  //   // code goes here

  //   return () => socket.disconnect();
  // }, []);

  return (
    <div id="main-app">
      <div id="main-task-bar">
        <TaskBar room={room} />
      </div>
      <div id="main-content">
        <UsersList users={["Tyler", "Mike", "Sam"]} />
        <ChatWindow />
      </div>
    </div>
  );
}
