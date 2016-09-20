var app = require('express'),
    router = app.Router();

router.use('/airport', require('./airport'));
router.use('/airline', require('./airline'));

module.exports = router;
