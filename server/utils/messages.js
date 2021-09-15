const luxon = require('luxon');

// Formats the messages for sending to the frontend
function formatMessage(userId, username, text, date) {
    return {
        userId,
        username,
        text,
        time: luxon.DateTime.fromJSDate(date).toLocaleString(luxon.DateTime.DATETIME_MED)
    }
}

// Formats the messages for sending to the db
function formatMessageForDb(user_id, username, room, message) {
    return {
        user_id,
        username,
        room,
        message,
        timestamp: Date.now()
    }
}

module.exports = {formatMessage, formatMessageForDb};