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

var formattedAirlineSuccessResponse = function (res, airlines) {
    res.contentType('application/json');
    var result = {};
    result["results"] = [];
    var curResult = {};

    var utc_timestamp = moment.utc();

    airlines.forEach(function (airline) {
        curResult = {
            'Active' : "y",
            "Country" :airline.country_en,
            "IATA": airline.IATA,
            "ICAO" : "ICAO",
            "ID" : "123",
            "Name" : airline.Name,
            "alias" : airline.Name,
            "createdAt" : utc_timestamp,
            "objectId" : airline._id,
            "priority" : "0",
            "updatedAt" : utc_timestamp
        }
        result["results"].push(curResult);
    });
    res.send(JSON.stringify(result));
}

var formattedAirportSuccessResponse = function (res, airports) {
    res.contentType('application/json');
    var result = {};
    result["results"] = [];
    var curResult = {};
    var utc_timestamp = moment.utc();

    airports.forEach(function (airport) {
        curResult = {
            "Altitude" : 322,
            "City" : airport.City,
            "CoCode" : "CoCode322",
            "Code" : airport.IATA,
            "Country" : airport.country_en,
            "IATA" : airport.IATA,
            "ID" : 322,
            "Latitude" : airport.latitude,
            "LongTimezone":"europe/london",
            "Longtitude" : airport.longitude,
            "Name" : airport.Name ,
            "Russian" : airport.RussianName,
            "Timezone" : 322,
            "ZoneCode" : "e",
            "createdAt" : utc_timestamp,
            "eu" : airport.is_europe ,
            "objectId" : airport._id,
            "priority" : "1",
            "updatedAt" : utc_timestamp
        }
        result["results"].push(curResult);
    });
    res.send(JSON.stringify(result));
}
module.exports = {
    'formattedSuccessResponse': formattedSuccessResponse,
    'formattedErrorResponse': formattedErrorResponse,
    'formattedAirlineSuccessResponse' : formattedAirlineSuccessResponse,
    'formattedAirportSuccessResponse' : formattedAirportSuccessResponse
};