const mongoose = require('mongoose');

// Schema for how messages should be stored in the db
const messageSchema = mongoose.Schema({
    user_id: String,
    username: String,
    room: String,
    message: String,
    timestamp: Date
});

module.exports = mongoose.model('message', messageSchema);