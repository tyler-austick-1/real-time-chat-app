const path = require("path");
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const { formatMessage, formatMessageForDb } = require("./utils/messages");
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require("./utils/users");
const mongoose = require("mongoose");
const messageModel = require("./utils/messageModel");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.static('public'));

const httpServer = http.createServer(app);
const options = {};
const io = socketIo(httpServer, options);

const botName = "Server Bot";
const botId = "";

// MongoDb connection for storing messages
const connectionURL =
  "mongodb+srv://admin:iluEzLM0RpwtcvhC@cluster0.mzxqx.mongodb.net/chatAppDatabase?retryWrites=true&w=majority";
const databaseOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(connectionURL, databaseOptions);

const db = mongoose.connection;

// Adds event listeners when db connection is opened
db.once("open", () => {
  console.log("Connected to database!");

  const messagesCollection = db.collection("messages");
  const changeStream = messagesCollection.watch();

  // When a new message is stored to the database, emit message event
  // to the corresponding room.
  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      const messageContents = change.fullDocument;
      const user = getCurrentUser(messageContents.user_id);

      if (user !== undefined) {
        io.to(user.room).emit(
          "message",
          formatMessage(
            messageContents.user_id,
            messageContents.username,
            messageContents.message,
            messageContents.timestamp
          )
        );
      } else {
        console.log("Error emitting message :(");
      }
    }
  });
});

// Socket.io connection for bi-directional real time communication
io.on("connection", (socket) => {

  socket.on("joinRoom", ({ username, room }) => {
    // New user is stored (in users.js)
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);

    // Retrieve room's previous messages from database
    const roomMessagesQuery = messageModel.find({ room: user.room }).exec();

    // Emit loadedMessages event with the formatted messages
    roomMessagesQuery
      .then((data) => {
        const loadedMessages = data.map((m) =>
          formatMessage(m.user_id, m.username, m.message, m.timestamp)
        );

        socket.emit("loadedMessages", loadedMessages);
        sendBotMessages(socket, user);
      })
      .catch((error) => {
        socket.emit("error", "Previous messages could not be loaded :(");
        sendBotMessages(socket, user);
      });

    // Emit roomUsers event to show newly joined user
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  socket.on("message", (message) => {
    const user = getCurrentUser(socket.id);
    const formattedMessage = formatMessageForDb(
      user.id,
      user.username,
      user.room,
      message
    );

    // Store the new message in the database
    messageModel.create(formattedMessage, (err, data) => {
      if (err) return console.log(`An error has occured...${err}`);

      console.log(`Message saved successfully`);
    });
  });

  socket.on("disconnect", () => {
    // Remove the current user from the users list (in users.js)
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(
          botId,
          botName,
          `${user.username} has left the chat`,
          new Date()
        )
      );

      // Emit roomUsers event to show that the user has left
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

// Helper methods
function sendBotMessages(socket, user) {
  socket.emit(
    "message",
    formatMessage(botId, botName, "Welcome to the chat room!", new Date())
  );
  socket.broadcast
    .to(user.room)
    .emit(
      "message",
      formatMessage(
        botId,
        botName,
        `${user.username} has joined the chat`,
        new Date()
      )
    );
}

// If no api route is found, then pass the request to the react app
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

const port = process.env.PORT || 3000;
httpServer.listen(port, () =>
  console.log(`Listening on http://localhost:${port}`)
);
