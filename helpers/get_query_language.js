module.exports = function(req){
    var letter = req.params.query.charCodeAt(0);
    var lang = 'name_eng';

    if(((letter >= "а") && (letter <= "я")) || ((letter >= "А") && (letter <= "Я"))){
        lang =  "name_rus";
    }

    return lang;
}