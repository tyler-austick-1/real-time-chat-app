const luxon = require('luxon');

// MIGHT NEED TO ADD ROOM
function formatMessage(userId, username, text) {
    return {
        userId,
        username,
        text,
        time: luxon.DateTime.now().toLocaleString(luxon.DateTime.DATETIME_MED)
    }
}

module.exports = formatMessage;