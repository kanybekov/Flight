var fs = require('fs');
var getQueryLanguage = require('../helpers/get_query_language');
var search = require('../helpers/search');
var jsonObj = require('../resources/airlines.json')['airlines'];


module.exports = function (req, res) {
    if(req.method == 'GET'){
        var queryLanguage = getQueryLanguage(req);
        var toRespond = search(req.params.query, queryLanguage, jsonObj);
        var q = [];
        toRespond.forEach(function (element) {
            q.push(element[queryLanguage]);
        });
        res.send(q);
    }
}

