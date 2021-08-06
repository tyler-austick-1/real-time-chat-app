import React, { useState, useEffect } from "react";
import "../css/UsersList.css";
import { v4 as uuidv4 } from "uuid";

export default function UsersList({ socket }) {
  const [currentUsers, setCurrentUsers] = useState([]);

  useEffect(() => {
    socket.on("roomUsers", ({ room, users }) => {
      const usernameList = users.map((user) => user.username);
      setCurrentUsers([...usernameList]);
    });

    return () => socket.disconnect();
  }, [socket]);

  const listItems = currentUsers.map((user) => (
    <div key={uuidv4()}>
      <p>{user}</p>
      <br></br>
    </div>
  ));

  return (
    <div id="users-list">
      <br></br>
      <h3>Users</h3>
      <br></br>
      {listItems}
    </div>
  );
}
