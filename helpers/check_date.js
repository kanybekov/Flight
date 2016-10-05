var moment = require('moment');

module.exports = function (date, res) {
    var currentTime = moment(new Date());
    var flightTime = moment(date, 'DD/MM/YYYY', true);
    if(!flightTime.isValid())
        return -1;
    if(flightTime.add(6, 'year').isBefore(currentTime))
        return 0;
    return 1;
}