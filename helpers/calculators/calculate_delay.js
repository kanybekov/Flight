var calculateDistance = require('calculate_distance');

//TODO Расставить где надо нестрогие неравенства
module.exports = function (parsedQuery, airportFrom, airportTo) {
    var dist = calculateDistance(airportTo, airportFrom);
    var t = parsedQuery.FlightDelayTime;

    if(t < 3)
        return "0";
    if(t > 3){
        if(dist  < 1500)
            return "250";
        if(dist < 3500)
            return "400";
        if(dist > 1500 && (airportFrom.is_europe && airportTo.is_europe))
            return "400";
    }
    if(t > 3 && t < 4)
        if(dist > 3500 && (airportTo || airportFrom))
            return "300";
    if(t > 4)
        if(dist > 3500 && (airportTo || airportFrom))
            return "600";
}