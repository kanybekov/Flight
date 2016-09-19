var serviceConfig = require('./сonfig/service.json');

var express = require('express');
var app =  express();

app.use(require('./controllers'));

app.get('*', function(req, res, next) {
    var err = new Error();
    err.status = 404;
    next(err);
});
app.use(function(err, req, res, next) {
    if(err.status !== 404) {
        return next();
    }
    res.send(err.message || '404');
});



var port = serviceConfig.port || 3000;
var host = serviceConfig.host || 'localhost';
app.listen(port, host);
console.log('service started at ' + host + ':' + port);
