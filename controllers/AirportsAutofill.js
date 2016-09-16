var fs = require('fs')
var coolobj = require('../Resource/Airports.json')['airports'];
//var rawData = fs.readFileSync('./Resource/Airports.json');

//var data = JSON.parse(rawData);

var qq = coolobj[0].name_rus;
console.log(qq);

module.exports = function (req, res) {
    if(req.method == 'GET'){
        var queryLanguage = getQueryLanguage(req);
        var toRespond = search(req.params.query, queryLanguage);
        res.send(toRespond);
    }
}

function getQueryLanguage(req){
    var letter = req.params.query.charCodeAt(0);
    console.log(letter);
    console.log(req.params.query);

    if(((letter >= 1072) && (letter <= 1103)) || ((letter >= 1040) && (letter <= 1071))){
        return "rus";
    }
    if(((letter >= 97) && (letter <= 122)) || ((letter >= 65) && (letter <= 90))){
        return "eng";
    }
}

function search(word, queryLanguage) {
    if(queryLanguage == "rus"){
        return coolobj.filter(function (item) {
            return item.name_rus.toLowerCase().indexOf(word.toLowerCase()) == 0;
        });
    }
    if(queryLanguage == "eng"){
        return coolobj.filter(function (item) {
            return item.name_eng.toLowerCase().indexOf(word.toLowerCase()) == 0;
        }
    )};
}