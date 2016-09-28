var calculateDistance = require('../calculators/calculate_distance');

//TODO Расставить где надо нестрогие неравенства
module.exports = function (parsedQuery, airportFrom, airportTo) {
    var distance = calculateDistance(airportTo, airportFrom) / 1000;
    var delayTime = parsedQuery.FlightDelayTime;

    if(delayTime < 3)
        return "0";
    if(delayTime > 3){
        if(distance  < 1500)
            return "250";
        if(distance < 3500)
            return "400";
        if(distance > 1500 && (airportFrom.is_europe && airportTo.is_europe))
            return "400";
    }
    if(delayTime > 3 && delayTime < 4)
        if(distance > 3500 && (airportTo || airportFrom))
            return "300";
    if(delayTime > 4)
        if(distance > 3500 && (airportTo || airportFrom))
            return "600";
}