var calculateDistance = require('calculate_distance');

module.exports = function (parsed, airportFrom, airportTo) {
    var dist = calculateDistance(airportFrom, airportTo);
    var t = parsed.altFlightDelayTime;

    if(dist < 1500) {
        if (t < 2)
            return "125";
        else
            return "250";
    }

    if(dist > 1500 && dist < 3500) {
        if (t < 3)
            return "200";
        else
            return "400";
    }

    if(dist > 3500){
        if (t < 4)
            return "300";
        else
            return "600";
    }
}