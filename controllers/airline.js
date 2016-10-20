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

        if(query["$or"][0].Name != undefined) {
                var q0 = {}, q1 = {}, q2  = {}, q3 = {}, q4 = {}, q5 = {};
                q0.Name = query["$or"][0].Name;
                q1.alias = query["$or"][1].alias;
                q2.Callsign = query["$or"][2].Callsign;
                arr.push(q0);
                arr.push(q1);
                arr.push(q2);

                if(query["$or"][3].IATA != undefined){
                        q3.IATA = query["$or"][3].IATA;
                        arr.push(q3);
                }
                else{
                        q3.Name = query["$or"][3].Name;
                        q4.alias = query["$or"][4].alias;
                        q5.Callsign = query["$or"][5].Callsign;
                        arr.push(q3);
                        arr.push(q4);
                        arr.push(q5);
                }
        }
        else{
                var q0 = {}, q1 = {};
                q0.Russian = query["$or"][0].Russian;
                q1.Russian = query["$or"][1].Russian;
                arr.push(q0);
                arr.push(q1);
        }
            finalQuery["$or"] = arr;
            db.Airline.find(finalQuery, function (err, airlines) {
                response.formattedAirlineSuccessResponse(res, airlines);
            }).limit(limitAmount);
    })

module.exports = router;


