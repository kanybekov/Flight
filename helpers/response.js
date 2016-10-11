var moment = require('moment');

var formattedSuccessResponse = function (res, refund, distance, airportFrom, airportTo, airline) {
    res.contentType('application/json');
    var result = {
        error: false,
        'serverTime': moment.utc().format(),
        requestTime: Date.now(),
        'refund' : refund,
        'distance' : distance,
        'airportFrom' : airportFrom.name_en,
        'airportFrom.is_europe' : airportFrom.is_europe,
        'airportFrom IATA' : airportFrom.iata_code,
        'airportTo' : airportTo.name_en,
        'airportTo.is_europe' : airportTo.is_europe,
        'airportTo IATA' : airportTo.iata_code
    };
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