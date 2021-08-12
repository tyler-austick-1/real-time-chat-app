const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    user_id: String,
    username: String,
    room: String,
    message: String,
    timestamp: Date
});

module.exports = mongoose.model('message', messageSchema);