const luxon = require('luxon');

// MIGHT NEED TO ADD ROOM
function formatMessage(userId, username, text, date) {
    return {
        userId,
        username,
        text,
        time: luxon.DateTime.fromJSDate(date).toLocaleString(luxon.DateTime.DATETIME_MED)
    }
}

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