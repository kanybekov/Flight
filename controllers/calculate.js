//noinspection JSUnresolvedFunction
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    validate = require('validate.js'),
    calculateDelay = require('../helpers/calculators/calculate_delay'),
    calculateBumping = require('../helpers/calculators/calculate_bumping_off'),
    calculateCancellation = require('../helpers/calculators/calculate_cancellation'),
    checkDate = require('../helpers/check_date'),
    checkAirports = require('../helpers/check_airports.js'),
    response = require('../helpers/response'),
    lodash = require('lodash');

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
    .post('/', function (req, res, next) {
        var parsed = req.body;

        var valid = validate(parsed, globalConstraints);
        if (valid != undefined) return response.formattedErrorResponse(res, valid, 406);

        valid = validate(parsed, constraints[parsed.occasion]);
        if (valid != undefined) return response.formattedErrorResponse(res, valid, 406);

        var validDate = checkDate(parsed.flightDate, res);
        if(validDate == -1) return response.formattedErrorResponse(res, 'Date isn\'t valid', 406);
        if (validDate == 0) return response.formattedErrorResponse(res, 'Out of date. No refund', 406);

        checkAirports(parsed, function (result) {
            if (result == false) {
                var message = "An EU flight is where the flight departed from an EU airport, regardless of the airline OR where an EU airline landed at an EU airport";
                return response.formattedErrorResponse(res, message, 406);
            } else {
                db.Airport.find({
                    "_id": {
                        $in: [
                            mongoose.Types.ObjectId(parsed.cityTo),
                            mongoose.Types.ObjectId(parsed.cityFrom)
                        ]
                    }
                }, function (err, result) {
                    var arr = lodash.keyBy(result, '_id');
                    var airportToObject = arr[parsed.cityTo];
                    var airportFromObject = arr[parsed.cityFrom];

                    if (parsed.occasion == "0") {
                        if (parsed.altFlight) {
                            valid = validate(parsed, {altFlightDelayTime: {presence: true}});
                            if(valid != undefined) return response.formattedErrorResponse(res, valid, 406);
                        }
                        response.formattedSuccessResponse(res, calculateCancellation(parsed, airportToObject, airportFromObject));
                    }
                    if (parsed.occasion == "1") {
                        response.formattedSuccessResponse(res, calculateDelay(parsed, airportToObject, airportFromObject));
                    }

                    if (parsed.occasion == "2") {
                        if (parsed.altFlight) {
                            valid = validate(parsed, {altFlightDelayTime: {presence: true}});
                            if (valid != undefined) return response.formattedErrorResponse(res,valid, 406);
                        }
                        response.formattedSuccessResponse(res, calculateBumping(parsed, airportToObject, airportFromObject));
                    }
                });
            }
        });
    });


var globalConstraints = {
    occasion: {
        presence: true,
        inclusion: {
            within: {"0": "Cancel", "1": "Delay", "2": "Bumping"},
            message: "Must be 0 or 1 or 2"
        }
    },
    cityFrom: {
        presence: true
    },
    cityTo: {
        presence: true
    },
    flightDate: {
        presence: true
    },
    airline: {
        presence: true
    }
}

var constraintsForCancel = {
    delayTime: {
        presence: true,
        message: "No delay time"
    },
    warnTime: {
        presence: true
    },
    altFlight: {
        presence: true
    }
}

var constraintsForDelay = {
    delayTime: {
        presence: true
    }
};

var constraintsForBumping = {
    altFlight: {
        presence: true
    }
};

var constraints = [constraintsForCancel, constraintsForDelay, constraintsForBumping];

module.exports = router;