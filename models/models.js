var mongoose = require('mongoose');

var db = {
    Airport: mongoose.model('airport', mongoose.Schema({
        IATA: String,
        RussianName: String,
        Name: String,
        Russian: String,
        City: String,
        country_ru: String,
        country_en: String,
        latitude: String,
        longitude: String,
        is_europe: String
    })),
    Airline: mongoose.model('airline', mongoose.Schema({
        Callsign: String,
        Name: String,
        country_en: String,
        country_ru: String,
        is_europe: String
    }))
};

module.exports = db;