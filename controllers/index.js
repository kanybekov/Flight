var app = require('express'),
    router = app.Router();

//TODO: Переименовать контроллеры в имена сущностей(в единственном числе)
router.use('/airport', require('./airport'));
// router.use('/company/:query', require('./autofill_companies'));
// router.use('/calculate', require('./calculate.js'));

module.exports = router;
