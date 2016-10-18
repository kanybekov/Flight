var express = require('express'),
    router = express.Router(),
    response = require('../helpers/response');

router
    .post('/', function (req, res, next) {
        var fullRequest = req.body;
        var limitAmount = fullRequest.limit;
        var query = fullRequest.where;
        var finalQuery = {};

        var arr = [];

        var q1 = {}, q2 = {}, q3  = {}, q4 = {};

        q1.Name = query["$or"][0].Name;
        q2.alias = query["$or"][1].alias;
        q3.Callsign = query["$or"][2].Callsign;
        q4.IATA = query["$or"][3].IATA;

        arr.push(q1);
        arr.push(q2);
        arr.push(q3);
        arr.push(q4);

        finalQuery["$or"] = arr;

        db.Airline.find(finalQuery, function (err, airlines) {
            res.send(airlines);
        }).limit(limitAmount);
    })

module.exports = router;


