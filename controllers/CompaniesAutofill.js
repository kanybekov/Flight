var fs = require('fs')
var coolObj = require('../Resource/Airlines.json')['airlines'];


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
}

function getQueryLanguage(req){
    var letter = req.params.query.charCodeAt(0);

    if(((letter >= 1072) && (letter <= 1103)) || ((letter >= 1040) && (letter <= 1071))){
        return "name_rus";
    }
    if(((letter >= 97) && (letter <= 122)) || ((letter >= 65) && (letter <= 90))){
        return "name_eng";
    }
}

function search(word, queryLanguage) {
    return coolObj.filter(function (item) {
        return item[queryLanguage].toLowerCase().indexOf(word.toLowerCase()) == 0;
    });
}