var app = require('express');
var router = app.Router();

router.use('/airport/:query', require('./AirportsAutofill'));
router.use('/company/:query', require('./CompaniesAutofill'));
router.use('/calculate', require('./Calculate.js'))

module.exports = router;
