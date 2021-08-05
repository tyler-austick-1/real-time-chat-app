import React from 'react';
import './css/App.css';
import UsersList from './components/UsersList';
import ChatWindow from './components/ChatWindow';
import TaskBar from './components/TaskBar';

function App() {
  return (
    <div id="main-app">
      <div id="main-task-bar">
        <TaskBar />
      </div>
      <div id="main-content">
        <UsersList />
        <ChatWindow />
      </div>
    </div>
  );
}

export default App;
