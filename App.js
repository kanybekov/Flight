var config = require('./Config/basic/config.json');

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

var port = config.port || 3000;
var host = config.host || 'localhost';
app.listen(port, host);
console.log('service started at ' + host + ':' + port);
