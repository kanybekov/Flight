var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    calculateDelay = require('../helpers/calculators/calculate_delay'),
    calculateBumping = require('../helpers/calculators/calculate_bumping_off'),
    calculateCancellation = require('../helpers/calculators/calculate_cancellation'),
    checkDate = require('../helpers/check_date');

    /*
     occasion - что произошло [отмена - задержка - отказ = 012]
     cityFrom/ cityTo -города
     flightDate - дата
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
            var parsed = JSON.parse(data.toString());

            if(!checkDate(parsed.flightDate)) {
                res.send("Out of date. No refund");
                return;
            }

            db.Airport.find({
                "_id" : {$in : [
                    mongoose.Types.ObjectId(parsed.cityTo),
                    mongoose.Types.ObjectId(parsed.cityFrom)
                ]}
            }, function (err, result) {
                    var airportToObject = result[0];
                    var airportFromObject = result[1];
                    if (parsed.occasion == "0")
                        res.send(calculateCancellation(parsed, airportToObject, airportFromObject));
                    if (parsed.occasion == "1")
                        res.send(calculateDelay(parsed, airportToObject, airportFromObject));
                    if (parsed.occasion == "2")
                        res.send(calculateBumping(parsed, airportToObject, airportFromObject));
                });
             });
    });


module.exports = router;