import React, { useState } from "react";
import "../css/JoinPage.css";

export default function JoinPage() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("alpha");

  function handleNameChange(event) {
    setUsername(event.target.value);
  }

  function handleRoomChange(event) {
    setRoom(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    window.location.href = `/chat?username=${username}&room=${room}`;
  }

  return (
    <div id="join-room-content">
      <h1>Real Time Chat App</h1>
      <br></br>
      <form id="join-form" onSubmit={handleFormSubmit}>
        <label htmlFor="username-field">Username</label>
        <input
          id="username-field"
          className="text-field"
          type="text"
          value={username}
          onChange={handleNameChange}
          autoComplete="off"
          required
        ></input>
        <label htmlFor="room-select">Room</label>
        <select id="room-select" value={room} onChange={handleRoomChange}>
          <option value="alpha">Alpha</option>
          <option value="beta">Beta</option>
          <option value="gamma">Gamma</option>
          <option value="delta">Delta</option>
        </select>
        <br></br>
        <input id="join-button" type="submit" value="Join"></input>
      </form>
    </div>
  );
}
