module.exports = function(word, queryLanguage,jsonObj) {
    return jsonObj.filter(function (item) {
        return item[queryLanguage].toLowerCase().indexOf(word.toLowerCase()) == 0;
    });
}