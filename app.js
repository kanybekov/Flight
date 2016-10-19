var serviceConfig = require('./config/service.json'),
    dbConfig = require('./config/db.json'),
    express = require('express'),
    mongoose = require('mongoose'),
    extend = require('extend'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    compress = require('compression');

// Подсоединение класса с описанием всех моделей
db = require('./models/models');

var app = express();
app.use(compress());
app.use(bodyParser.json({type:'*/*'}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(allowCrossDomain);
app.use(require('./controllers'));

function allowCrossDomain(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    }
    else {
        next();
    }
}

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


mongoose.connect(dbConfig.host);

mongoose.connection.on('connected', function () {
    var port = serviceConfig.port || 3000;
    var host = serviceConfig.host || 'localhost';
    app.listen(port, host);
    console.log('service started at ' + host + ':' + port);
});

mongoose.connection.on('error', function (err) {
    console.error(err);
});

