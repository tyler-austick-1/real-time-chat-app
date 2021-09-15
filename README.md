# Real Time Chat Web App

## Contents

- [Techonologies Used](#technologies-used)
    - [Front End](#front-end)
    - [Back End](#front-end)
- [Description](#description)
- [Implementation Details](#implementation-details)
- [The User Interface](#the-user-interface)
    - [The Join Page](#the-join-page)
    - [The Chat Room Page](#the-chat-room-page)

## Technologies Used

### Front End:
- [React](https://reactjs.org/)
### Back End:
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Socket.io](https://socket.io/)
- [MongoDB](https://www.mongodb.com/)/[Mongoose](https://mongoosejs.com/docs/)

## Description

A full stack web application for real time chatting between multiple clients in different chat rooms. Users can quickly join chat rooms by just entering a username and connecting. Messages are preserved between rooms so different rooms will not receive messages from other rooms.

## Implementation Details
- The back end of the application is running on a [Node.js](https://nodejs.org/en/) server.

- The server uses [Socket.io](https://socket.io/) for the real time bidirectional communication between the clients.

- Messages are stored in a [MongoDB](https://www.mongodb.com/) database once sent. The server interacts with the database through the [Mongoose](https://mongoosejs.com/docs/) library.

- Whenever a user joins a room, the previous messages sent in that room are loaded into the chat window.

## The User Interface

### The Join Page

<img src="https://github.com/tyler-austick-1/real-time-chat-app/blob/main/images/join_page.png" alt="Join Page">

<img src="https://github.com/tyler-austick-1/real-time-chat-app/blob/main/images/join_page_selection.png" alt="Join Page Selection">

This is the landing page of the site. Users enter a username and select a room they want to join using the drop down menu.

### The Chat Room Page

<img src="https://github.com/tyler-austick-1/real-time-chat-app/blob/main/images/chat_room_page.png" alt="Chat Page">

This is the chat room page displayed once the user has connected through The Join Page. 

- The top left displays which room the user is currently connected to. 
- The icon in the top right allows users to leave the room. 
- The left column shows the users currently connected to the chat room. 
- The rest of the window is where chats appear. 
- Chats sent by the current user appear on the right hand side in a green chat bubble. 
- Messages sent by other users appear on the left hand side in a blue chat bubble. 
- The user sends messages by using the chat bar located at the bottom of the page.
