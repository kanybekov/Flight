var fs = require('fs')
var coolObj = require('../Resource/Airports.json')['airports'];

module.exports = function (req, res) {
    if(req.method == 'GET'){
        var queryLanguage = getQueryLanguage(req);
        var toRespond = search(req.params.query, queryLanguage);
        var q = [];
         toRespond.forEach(function (element) {
             q.push(element[queryLanguage]);
         });
        res.send(q);
    }
};

function getQueryLanguage(req){
    var letter = req.params.query.charCodeAt(0);
    var lang = 'name_eng';

    if(((letter >= 1072) && (letter <= 1103)) || ((letter >= 1040) && (letter <= 1071))){
        lang =  "name_rus";
    }

    return lang;
}

function search(word, queryLanguage) {
   return coolObj.filter(function (item) {
       return item[queryLanguage].toLowerCase().indexOf(word.toLowerCase()) == 0;
   });
}