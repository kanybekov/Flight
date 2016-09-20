var express = require('express'),
    router = express.Router(),
    getQueryLanguage = require('../helpers/get_query_language'),
    response = require('../helpers/response');

//TODO добавить поля по которым ищем
var searchFields = {ru: ['name_ru', 'iata'], en: []};

router
    .get('/:q', function (req, res, next) {
        var searchString = req.params.q;
        var filter = {name_eng: new RegExp('(' + req.params.q + ')', "i")};
        var fields = {'name_eng': 1};
        //TODO сделать разводку по языкам и искать в нужных полях
        db.Airport.find(filter, fields, function (err, airports) {
            if (err) return console.error(err);
            res.send(airports);
        });
    });

module.exports = router;
