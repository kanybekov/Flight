var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    validate = require('validate.js'),
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

     flightDelayTime - время задержки
     altFlightDelayTime - время задержки альтрейса
  */

    //отмена - occasion, cityFromTo, date, airline, warnTime, altFlight, altFlightDelayTime
    //задержка - occasion, cityFromTo, date, airline, delayTime
    //отказ - occasion, cityFromTo, date, airline, altFlight, altFlightDelayTime

router
    .post('/',function (req, res, next) {
        req.on('data', function (data) {
            var parsed = JSON.parse(data.toString());

            // if(!checkDate(parsed.flightDate)) {
            //     res.send("Out of date. No refund");
            //     return;
            // }

            db.Airport.find({
                "_id" : {$in : [
                    mongoose.Types.ObjectId(parsed.cityTo),
                    mongoose.Types.ObjectId(parsed.cityFrom)
                ]}
            }, function (err, result) {
                    var airportToObject = result[0];
                    var airportFromObject = result[1];
                    validate(parsed, globalConstraints);
                    if (parsed.occasion == "0") {
                        validate(parsed, constraintsForCancel);
                        if(parsed.altFlight)
                            validate(parsed, {altFlightDelayTime : {presence : true}});
                        res.send(calculateCancellation(parsed, airportToObject, airportFromObject));
                    }
                    if (parsed.occasion == "1") {
                        validate(parsed,constraintsForDelay);
                        res.send(calculateDelay(parsed, airportToObject, airportFromObject));
                    }
                    if (parsed.occasion == "2") {
                        validate(parsed, constraintsForBumping);
                        if(parsed.altFlight)
                            validate(parsed, {altFlightDelayTime : {presence : true}});
                        res.send(calculateBumping(parsed, airportToObject, airportFromObject));
                    }
                });
             });
    });


var globalConstraints  = {
    "parsed.occasion" :{
        presence: true,
        inclusion : {
            within : {"0": "Cancel", "1" : "Delay", "2" : "Bumping"},
            message: "Must be 012"
        }
    },
    cityFrom :{
        presence: true
    },
    cityTo : {
        presence: true
    },
    flightDate: {
        presence: true
    },
    airline :{
        presence: true
    }
}

var constraintsForCancel = {
    delayTime: {
        presence: true,
        message : "No delay time"
    },
    warnTime: {
        presence: true
    },
    altFlight: {
        presence: true,
        isBoolean: true
    }
}

var constraintsForDelay = {
    delayTime: {
        presence: true
    }
}

var constraintsForBumping = {
    altFlight: {
        presence: true,
        isBoolean: true
    }
}

module.exports = router;