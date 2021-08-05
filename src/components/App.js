import React, { useState, useEffect } from "react";
import "../css/App.css";
import ChatRoom from "./ChatRoom";
import JoinPage from "./JoinPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <JoinPage />
        </Route>
        <Route exact path="/chat">
          <ChatRoom />
        </Route>
      </Switch>
    </Router>
  );
}
