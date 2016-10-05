var express = require('express'),
    router = express.Router(),
    getQueryLanguage = require('../helpers/get_query_language');

var searchFields = {ru: ['name_ru', 'iata_code'], en: ['name_en', 'iata_code']};

router
    .get('/:q', function (req, res, next) {
        var searchString = req.params.q;
        var lang = getQueryLanguage(searchString)
        var finalQuery = [];
        var finalFilter = {};
        searchFields[lang].forEach(function(field) {
            finalFilter[field] = 1;
            var pp = {};
            pp[field] = { $regex : new RegExp('^' + searchString, "i")};
            finalQuery.push(pp);
        });

        db.Airport.find({$or:finalQuery}, finalFilter, function (err, airports) {
            if (err)
                return console.error(err);
            res.send(airports);
        });
    });

module.exports = router;


