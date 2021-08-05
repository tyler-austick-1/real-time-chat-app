const path = require('path');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const formatMessage = require('../utils/messages');
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require('../utils/users');

const app = express();
// app.use(express.static(path.join(__dirname, '..', 'client')));

const httpServer = http.createServer(app);
const options = {cors: {origin: "*"}};  // allows any url to connect to the server
const options = {};
const io = socketIo(httpServer, options);

const botName = 'Server Bot';

io.on('connection', socket => {
    socket.on('joinRoom', ({username, room}) => {
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);

        socket.emit('message', formatMessage(botName, 'Welcome to the chat room!'));
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`));

        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        }); 
    });

    socket.on('message', message => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.username, message));
    });

    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if (user) {
            io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));
            
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            }); 
        }
    });
});

const port = process.env.PORT || 5000;
httpServer.listen(port, () => console.log(`Listening on http://localhost:${port}`));