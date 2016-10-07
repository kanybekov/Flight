module.exports = function (parsed, airportFromObject, airportToObject, distance) {
    var delayTime = parsed.flightDelayTime;

    if(delayTime < 3)
        return "0";
    if(delayTime >= 3){
        if(distance  < 1500)
            return "250";
        if(distance < 3500)
            return "400";
        if(distance > 1500 && (airportFromObject.is_europe == 1 && airportToObject.is_europe == 1))
            return "400";
    }
    if(delayTime >= 3 && delayTime < 4)
        if(distance > 3500 && ((airportToObject.is_europe == 1) || (airportFromObject.is_europe == 1)))
            return "300";
    if(delayTime >= 4)
        if(distance > 3500 && ((airportToObject.is_europe == 1) || (airportFromObject.is_europe == 1)))
            return "600";
}