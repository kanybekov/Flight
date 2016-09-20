var serviceConfig = require('./сonfig/service.json'),
    dbConfig = require('./сonfig/db.json'),
    mongoose = require('mongoose');

// Подсоединение класса с описанием всех моделей
db = require('./models/models');

var express = require('express');
var app = express();

app.use(require('./controllers'));

app.get('*', function (req, res, next) {
    var err = new Error();
    err.status = 404;
    next(err);
});
app.use(function (err, req, res, next) {
    if (err.status !== 404) {
        return next();
    }
    res.send(err.message || '404');
});



//TODO: Cтартовать сервис в коллбеке удачного соединения
mongoose.connect(dbConfig.host);

mongoose.connection.on('connected', function () {
    var port = serviceConfig.port || 3000;
    var host = serviceConfig.host || 'localhost';
    app.listen(port, host);
    console.log('service started at ' + host + ':' + port);
});

mongoose.connection.on('error',function (err) {
    console.error(err);
});

