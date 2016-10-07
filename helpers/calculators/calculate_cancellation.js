module.exports = function (parsed, distance) {
    var warnTime = parsed.warnTime;
    var delayTime = parsed.altFlightDelayTime;
    if (warnTime > 7 && warnTime <= 14)
    {
        if (distance > 0 && distance < 1500){
            if(!parsed.altFlight)
                return "250";
            if (delayTime > 0 && delayTime < 2)
                return "125";
            if(delayTime >= 2)
                return "250";
        }

        if (distance > 1500 && distance < 3500){
            if(!parsed.altFlight)
                return "400";
            if (delayTime > 0 && delayTime < 3)
                return "200";
            if(delayTime >= 3)
                return "400";
        }

        if(distance > 3500){
            if(!parsed.altFlight)
                return "600";
            if (delayTime > 0 && delayTime < 4)
                return "300";
            if(delayTime >= 4)
                return "600";
        }
    }

    if (warnTime < 7)
    {
        if (distance > 0 && distance < 1500){
            if(!parsed.altFlight)
                return "250";
            if (delayTime > 0 && delayTime < 2)
                return "125";
            if(delayTime >= 2)
                return "250";
        }

        if (distance > 1500 && distance < 3500){
            if(!parsed.altFlight)
                return "400";
            if (delayTime > 0 && delayTime < 3)
                return "200";
            if(delayTime >= 3)
                return "400";
        }

        if(distance > 3500){
            if(!parsed.altFlight)
                return "600";
            if (delayTime > 0 && delayTime < 4)
                return "300";
            if(delayTime >= 4)
                return "600";
        }
    }
    if(warnTime > 14)
        return "0";
}