module.exports = function (parsed, airportFromObject, airportToObject, distance) {
    var delayTime = parsed.altFlightDelayTime;

    if(distance < 1500) {
        if(!parsed.altFlight)
            return "250";
        if (delayTime < 2)
            return "125";
        else
            return "250";
    }

    if((distance > 1500 && distance < 3500) || (distance > 1500 && ((airportFromObject.is_europe == 1 ) && (airportToObject.is_europe == 1)))){
        if(!parsed.altFlight)
            return "400";
        if (delayTime < 3)
            return "200";
        else
            return "400";
    }

    if(distance > 3500){
        if(!parsed.altFlight)
            return "600";
        if (delayTime < 4)
            return "300";
        else
            return "600";
    }
}