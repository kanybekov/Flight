var fs = require('fs');
var dbconfig = require('../сonfig/db.json');

var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var getQueryLanguage = require('../helpers/get_query_language');


module.exports = function (req, res) {
    mongoClient.connect(dbconfig.host, function (err,db) {
        assert.equal(err,null);
        //raise error
        console.log("Connected successfully to db server");
        var collection = db.collection('airlines');

        var queryLanguage = getQueryLanguage(req);
        var query = {}, specifyReturnedFieldsQuery = {};
        var reg = new RegExp("^" + req.params.query +"", "i");
        query[queryLanguage]  = {$regex:reg};
        specifyReturnedFieldsQuery[queryLanguage] = 1;
        specifyReturnedFieldsQuery["_id"] = 0;

        console.log(query,specifyReturnedFieldsQuery);
        collection.find(query,specifyReturnedFieldsQuery).toArray(function (err, docs) {
            assert.equal(err,null);
            //raise error
            db.close();
            res.send(docs);
        });
    })
};