var moment = require('moment');

var formattedSuccessResponse = function (res, data) {
    res.contentType('application/json');
    var result = {error: false, 'serverTime': moment.utc().format(), requestTime: Date.now(), data: data};
    res.send(JSON.stringify(result));
};

var formattedErrorResponse = function (res, message, status) {
    res.contentType('application/json');
    res.status(status || 500);
    var result = {error: true, 'serverTime': moment.utc().format(), requestTime: Date.now(), message: message};
    res.send(JSON.stringify(result));
};

module.exports = {
    'formattedSuccessResponse': formattedSuccessResponse,
    'formattedErrorResponse': formattedErrorResponse
};