var mongoose = require('mongoose');

module.exports = function (parsed, callback) {
    db.Airport.find({"_id": mongoose.Types.ObjectId(parsed.cityFrom)},
        function (err, result) {
            var airportFrom = result[0];
            db.Airport.find({
                "_id": mongoose.Types.ObjectId(parsed.cityTo)
            }, function (err, result) {
                var airportTo = result[0];
                db.Airline.find({
                        "_id": mongoose.Types.ObjectId(parsed.airline)
                    },
                    function (err, result) {
                        var airline = result[0];
                        callback(airportFrom.is_europe == 1 || (airportTo.is_europe == 1 && airline.is_europe == 1))
                    })
            });
        })
};