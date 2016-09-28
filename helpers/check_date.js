module.exports = function (date) {
    console.log(new Date());

    var _MS_PER_DAY = 1000 * 60 * 60 * 24;

    var currentTime = new Date();
    var flightTime = new Date(date);

    var utc1 = Date.UTC(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate());
    var utc2 = Date.UTC(flightTime.getFullYear(), flightTime.getMonth(), flightTime.getDate());

    if (Math.floor((utc2 - utc1) / _MS_PER_DAY) > 6 * 365)
        return false;
}