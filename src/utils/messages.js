const luxon = require('luxon');

function formatMessage(username, text) {
    return {
        username,
        text,
        time: luxon.DateTime.now().toLocaleString(luxon.DateTime.DATETIME_MED)
    }
}

module.exports = formatMessage;