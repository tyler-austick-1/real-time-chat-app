const luxon = require('luxon');

function formatMessage(id, username, text) {
    return {
        id,
        username,
        text,
        time: luxon.DateTime.now().toLocaleString(luxon.DateTime.DATETIME_MED)
    }
}

module.exports = formatMessage;