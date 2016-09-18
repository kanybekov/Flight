var app = require('express');
var router = app.Router();

router.use('/airport/:query', require('./autofill_airports'));
router.use('/company/:query', require('./autofill_companies'));
router.use('/calculate', require('./calculate.js'))

module.exports = router;
