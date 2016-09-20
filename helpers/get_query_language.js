module.exports = function(searchString){
    var letter = searchString.charCodeAt(0);
    var lang = 'en';

    if(((letter >= 'а'.charCodeAt(0)) && (letter <= 'я'.charCodeAt(0))) || ((letter >= 'А'.charCodeAt(0)) && (letter <= 'Я'.charCodeAt(0)))){
        lang =  "ru";
    }
    return lang;
}