# Real Time Chat Web App

## Technologies used

### Front end:
- [React](https://reactjs.org/)
### Back end:
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- Socket.io
- [MongoDB](https://www.mongodb.com/)/[Mongoose](https://mongoosejs.com/docs/)

## Description

A full stack web application for real time chatting between multiple clients in different chat rooms. Users can quickly join chat rooms by just entering a username and connecting. Messages are preserved between rooms so different rooms will not receive messages from other rooms.

## Implementation details
- The back end of the application is running on a Node.js server.

- The server uses Socket.io for the real time bidirectional communication between the clients.

- Messages are stored in a MongoDB database once sent. The server interacts with the database through the Mongoose library.

- Whenever a user joins a room, the previous messages sent in that room are loaded into the chat window.

## The User Interface

### The join page