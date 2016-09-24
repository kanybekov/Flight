/*
 occasion - что произошло [отмена - задержка - отказ = 012]
 cityFrom/ cityTo -города
 date - дата
 airline - авиакомпания
 warnTime - За сколько дней предупредила об отмене? 7, (7,14),14 = 012
 altFlight - альт. рейс?

 flightDelayTime - время задержки 3, (3,4) ,4 = 012
 altFlightDelayTime - время задержки альтрейса
 */

//отмена - occasion, cityFromTo, date, airline, warnTime, altFlight, altFlightDelayTime
//задержка - occasion, cityFromTo, date, airline, delayTime
//отказ - occasion, cityFromTo, date, airline, altFlight, altFlightDelayTime

module.exports = function (bodyStr) {
    var parsed = {};
    parsed['occasion'] = bodyStr.occasion;
    parsed['cityFrom'] = bodyStr.cityFrom;
    parsed['cityTo'] = bodyStr.cityTo;
    parsed['flightDate'] = bodyStr.flightDate;
    parsed['airline'] = bodyStr.airline;

    switch (bodyStr.occasion){
        case('0') : {
            parsed['warnTime'] = bodyStr.warnTime;
            parsed['altFlight'] = bodyStr.altFlight;
            parsed['altFlightDelayTime'] = bodyStr.altFlightDelayTime;
            break;
        }
        case('1'): {
            parsed['delayTime'] = bodyStr.delayTime;
            break;
        }
        case('2'): {
            parsed['altFlight'] = bodyStr.altFlight;
            parsed['altFlightDelayTime'] = bodyStr.altFlightDelayTime;
            break;
        }
        default: {
            console.error();
            break;
        }
    }
    return parsed;
}