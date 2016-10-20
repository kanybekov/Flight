var express = require('express'),
    router = express.Router(),
    response = require('../helpers/response');

router
    .post('/', function (req, res, next) {
        // var searchString = req.params.q;
        // var lang = getQueryLanguage(searchString)
        // var finalQuery = [];
        // var finalFilter = {};
        // searchFields[lang].forEach(function(field) {
        //     finalFilter[field] = 1;
        //     var pp = {};
        //     pp[field] = { $regex : new RegExp('^' + searchString, "i")};
        //     finalQuery.push(pp);
        // });
        var fullRequest = req.body;
        var limitAmount = fullRequest.limit;
        var query = fullRequest.where;
        var finalQuery = {};

        var arr = [];

        if(query["$or"][0].City  != undefined) {
            var q0 = {}, q1 = {}, q2  = {}, q3 = {}, q4 = {}, q5 = {};
            q0.City = query["$or"][0].City;
            q1.Name = query["$or"][1].Name;
            q2.alternative = query["$or"][2].alternative;
            arr.push(q0);
            arr.push(q1);
            arr.push(q2);

            if(query["$or"][3].IATA != undefined){
                q3.IATA = query["$or"][3].IATA;
                arr.push(q3);
            }
            else{
                q3.City = query["$or"][3].City;
                q4.Name = query["$or"][4].Name;
                q5.alternative = query["$or"][5].alternative;
                arr.push(q3);
                arr.push(q4);
                arr.push(q5);
            }
        }
        else{
            var q0 = {}, q1 = {}, q2 = {}, q3 = {};
            q0.Russian = query["$or"][0].Russian;
            q1.Russian = query["$or"][1].Russian;
            q2.RussianName = query["$or"][0].RussianName;
            q3.RussianName = query["$or"][1].RussianName;
            arr.push(q0);
            arr.push(q1);
            arr.push(q2);
            arr.push(q3);
        }
        finalQuery["$or"] = arr;
        db.Airport.find(finalQuery, function (err, airports) {
            response.formattedAirportSuccessResponse(res, airports);
        }).limit(limitAmount);
    });

module.exports = router;


