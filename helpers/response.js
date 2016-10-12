var moment = require('moment');

var formattedSuccessResponse = function (res, refund, distance, airportFrom, airportTo, airline) {
    res.contentType('application/json');
    var result = {
        error: false,
        'serverTime': moment.utc().format(),
        requestTime: Date.now(),
        'refund' : refund,
        'distance' : distance,
        'airportFrom_name_en' : airportFrom.name_en,
        'airportFrom_name_ru' : airportFrom.name_ru,
        'airportFrom_is_europe' : airportFrom.is_europe,
        'airportFrom_IATA' : airportFrom.iata_code,
        'airportTo_name_en' : airportTo.name_en,
        'airportTo_name_ru' : airportTo.name_ru,
        'airportTo_is_europe' : airportTo.is_europe,
        'airportTo_IATA' : airportTo.iata_code,
        'airline_name_en' : airline.name_en,
        'airline_name_ru' : airline.name_ru,
        'airline_IATA' : airline.iata_code
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