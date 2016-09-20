var mongoose = require('mongoose');

//TODO переименовать поля с упоминанием языка так, чтобы использовать en/ru

//TODO здесь добавить описание модели companies
var db = {
    Airport: mongoose.model('airport', mongoose.Schema({
        iata_code: String,
        name_ru: String,
        name_en: String,
        city_ru: String,
        city_en: String,
        country_ru: String,
        latitude: String,
        longitude: String,
        is_europe: String
    })),
    Airline: mongoose.model('airline', mongoose.Schema({
        iata_code: String,
        name_en: String,
        country_en: String,
        country_ru: String
    }))
};

module.exports = db;