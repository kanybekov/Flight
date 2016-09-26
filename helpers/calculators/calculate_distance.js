var geolib = require('geolib');

module.exports = function (airportTo, airportFrom) {
    var coordFrom = {};
    coordFrom["latitude"] = airportTo.toObject().latitude;
    coordFrom["longitude"] = airportTo.toObject().longitude;
    var coordTo = {};
    coordTo["latitude"] = airportFrom.toObject().latitude;
    coordTo["longitude"] = airportFrom.toObject().longitude;

    return geolib.getDistance(coordFrom,coordTo);
}
