module.exports = function (parsed, dist) {
    var dists = [250, 400, 600]; //Все перелеты вне ЕС > 3500 км

    var distID = 0;
    if(dist > 1500 && dist < 3500)
        distID = 1;
    if(dist > 3500)
        distID = 2;

    return dists[distID];
}