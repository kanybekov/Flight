var calculateDistance = require('../calculators/calculate_distance');

module.exports = function (parsed, airportFrom, airportTo) {
    var distance = calculateDistance(airportFrom, airportTo) / 1000;
    var delayTime = parsed.altFlightDelayTime;

    if(distance < 1500) {
        if (delayTime < 2)
            return "125";
        else
            return "250";
    }

    if(distance > 1500 && distance < 3500) {
        if (delayTime < 3)
            return "200";
        else
            return "400";
    }

    if(distance > 3500){
        if (delayTime < 4)
            return "300";
        else
            return "600";
    }
}