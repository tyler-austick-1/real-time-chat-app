const path = require('path');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./utils/users');
const mongoose = require('mongoose');
const messageModel = require('./utils/messageModel');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.static('public'));

const httpServer = http.createServer(app);
const options = {cors: {origin: "*"}};  // allows any url to connect to the server
const io = socketIo(httpServer, options);

const botName = 'Server Bot';
const botId = '';

// Database stuff
const connectionURL = 'mongodb+srv://admin:iluEzLM0RpwtcvhC@cluster0.mzxqx.mongodb.net/chatAppDatabase?retryWrites=true&w=majority';
mongoose.connect(connectionURL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Socket.io stuff
io.on('connection', socket => {
    socket.on('joinRoom', ({username, room}) => {
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);

        socket.emit('message', formatMessage(botId, botName, 'Welcome to the chat room!'));
        socket.broadcast.to(user.room).emit('message', formatMessage(botId, botName, `${user.username} has joined the chat`));

        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        }); 
    });

    socket.on('message', message => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.id, user.username, message));
    });

    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if (user) {
            io.to(user.room).emit('message', formatMessage(botId, botName, `${user.username} has left the chat`));
            
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            }); 
        }
    });
});

// api routes
app.post('/api/messages', (req, res) => {
    const messageData = req.body;

    messageModel.create(messageData, (err, data) => {
        if (err) return res.status(500).send(err);

        return res.status(201).send(data);
    });
});

app.get('/api/messages', (req, res) => {
    messageModel.find((err, data) => {
        if (err) return res.status(500).send(err);

        return res.status(200).send(data);
    });
});

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

const port = process.env.PORT || 5000;
httpServer.listen(port, () => console.log(`Listening on http://localhost:${port}`));