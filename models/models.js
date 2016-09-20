var mongoose = require('mongoose');

//TODO переименовать поля с упоминанием языка так, чтобы использовать en/ru

//TODO здесь добавить описание модели companies
var db = {
    Airport: mongoose.model('airport', mongoose.Schema({
        iata_code: String,
        name_rus: String,
        name_eng: String,
        city_rus: String,
        city_eng: String,
        country_rus: String,
        latitude: String,
        longitude: String,
        is_europe: String
    }))
};

module.exports = db;