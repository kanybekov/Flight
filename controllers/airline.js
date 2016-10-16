var express = require('express'),
    router = express.Router(),
    response = require('../helpers/response');

router
    .post('/', function (req, res, next) {
        var query = req.body;
        db.Airline.find(query, function (err, airlines) {
            console.log(airlines);
            res.send(airlines);
        })
    })

module.exports = router;


