var express = require('express'),
    router = express.Router(),
    geolib = require('geolib'),
    parseCalculateRequest = require('../helpers/calculate_request_parser'),
    calculateCancellation = require('../helpers/calculators/calculate_cancellation');

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
    //отказ - occasion, cityFromTo, date, airline, altFlightDelayTime

router
    .post('/',function (req, res, next) {
        req.on('data', function (data) {
            var bodyStr = JSON.parse(data.toString());
            var parsed = parseCalculateRequest(bodyStr);

            db.Airport.find({"_id" : parsed.cityTo}, function (err, airportFromObject) {
                if (err)
                    return console.error(err);
                db.Airport.find({"_id" : parsed.cityFrom}, function (err, airportToObject) {
                    if (err)
                        return console.error(err);

                    var coordFrom = {};
                    coordFrom["latitude"] = airportToObject[0].toObject().latitude;
                    coordFrom["longitude"] = airportToObject[0].toObject().longitude;
                    var coordTo= {};
                    coordTo["latitude"] = airportFromObject[0].toObject().latitude;
                    coordTo["longitude"] = airportFromObject[0].toObject().longitude;

                    var dist = geolib.getDistance(coordFrom,coordTo);

                    res.send((calculateCancellation(parsed, dist/1000)).toString());

                });
            });
        })
    });


module.exports = router;