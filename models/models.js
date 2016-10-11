var mongoose = require('mongoose');

var db = {
    Airport: mongoose.model('newairport', mongoose.Schema({
        iata_code: String,
        name_ru: String,
        name_en: String,
        city_ru: String,
        city_en: String,
        country_ru: String,
        country_en: String,
        latitude: String,
        longitude: String,
        is_europe: String
    })),
    Airline: mongoose.model('airline', mongoose.Schema({
        iata_code: String,
        name_en: String,
        country_en: String,
        country_ru: String,
        is_europe: String
    }))
};

module.exports = db;