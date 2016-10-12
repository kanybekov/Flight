var mongoose = require('mongoose');

module.exports = function (airportTo, airportFrom, airline, callback) {
    db.Airline.find({
            "_id": mongoose.Types.ObjectId(airline)
        },
        function (err, result) {
            var airline = result[0];
            callback(airportFrom.is_europe == 1 || (airportTo.is_europe == 1 && airline.is_europe == 1), airline);
        })
};