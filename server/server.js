const path = require('path');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const {formatMessage, formatMessageForDb} = require('./utils/messages');
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./utils/users');
const mongoose = require('mongoose');
const messageModel = require('./utils/messageModel');

const app = express();

// Middlewares
app.use(express.json());
// app.use(express.static(path.join(__dirname, '..', 'build')));
// app.use(express.static('public'));

const httpServer = http.createServer(app);
const options = {cors: {origin: "*"}};  // allows any url to connect to the server
const io = socketIo(httpServer, options);

const botName = 'Server Bot';
const botId = '';

// Database stuff
const connectionURL = 'mongodb+srv://admin:iluEzLM0RpwtcvhC@cluster0.mzxqx.mongodb.net/chatAppDatabase?retryWrites=true&w=majority';
const databaseOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

// Connects to the database
mongoose.connect(connectionURL, databaseOptions);

const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to database!');

    const messagesCollection = db.collection('messages');
    const changeStream = messagesCollection.watch();

    changeStream.on('change', (change) => {
        if (change.operationType === 'insert') {
            const messageContents = change.fullDocument;
            const user = getCurrentUser(messageContents.user_id);
            
            if (user !== undefined) {
                io.to(user.room).emit('message', formatMessage(messageContents.user_id, messageContents.username, messageContents.message, messageContents.timestamp));
            } else {
                console.log('Error emitting message :(');
            }
        } 
    });
});

// Socket.io stuff
io.on('connection', socket => {
    
    socket.on('joinRoom', ({username, room}) => {
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);
        
        socket.emit('message', formatMessage(botId, botName, 'Welcome to the chat room!', new Date()));
        socket.broadcast.to(user.room).emit('message', formatMessage(botId, botName, `${user.username} has joined the chat`, new Date()));
        
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        }); 
    });

    socket.on('message', message => {
        const user = getCurrentUser(socket.id);
        const formattedMessage = formatMessageForDb(user.id, user.username, user.room, message);

        messageModel.create(formattedMessage, (err, data) => {
            if (err) return console.log(`An error has occured...${err}`);

            console.log(`Message saved successfully`);
        });
    });

    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if (user) {
            io.to(user.room).emit('message', formatMessage(botId, botName, `${user.username} has left the chat`, new Date()));
            
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

// If no api route is found, then pass the request to the react app
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

const port = process.env.PORT || 5000;
httpServer.listen(port, () => console.log(`Listening on http://localhost:${port}`));