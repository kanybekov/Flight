module.exports = function(req){
    var letter = req.params.query.charCodeAt(0);
    var lang = 'name_eng';

    if(((letter >= 'а'.charCodeAt(0)) && (letter <= 'я'.charCodeAt(0))) || ((letter >= 'А'.charCodeAt(0)) && (letter <= 'Я'.charCodeAt(0)))){
        lang =  "name_rus";
    }
    return lang;
}