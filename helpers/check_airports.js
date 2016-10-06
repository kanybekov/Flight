var mongoose = require('mongoose'),
    lodash = require('lodash');

module.exports = function (parsed, callback) {
    db.Airport.find({
        "_id": {
            $in: [
                mongoose.Types.ObjectId(parsed.cityTo),
                mongoose.Types.ObjectId(parsed.cityFrom)
            ]
        }
    }
    , function (err, result) {
            var arr = lodash.keyBy(result, '_id');
            var airportTo = arr[parsed.cityTo];
            var airportFrom = arr[parsed.cityFrom];
            db.Airline.find({
                    "_id": mongoose.Types.ObjectId(parsed.airline)
                },
                function (err, result) {
                    var airline = result[0];
                    callback(airportFrom.is_europe == 1 || (airportTo.is_europe == 1 && airline.is_europe == 1))
                })
        })
};